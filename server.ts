import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  // Accept JSON bodies up to 35MB for PDF and image base64 payloads
  app.use(express.json({ limit: '35mb' }));

  // Initialize server-side Gemini client
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  // Healthcheck endpoint
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
      timestamp: new Date().toISOString(),
    });
  });

  // POST /api/analyze-exam: analyzes uploaded exam PDF or image and auto-fills metadata
  app.post('/api/analyze-exam', async (req, res) => {
    try {
      const { fileBase64, mimeType, fileName } = req.body;

      if (!process.env.GEMINI_API_KEY) {
        return res.status(200).json({
          success: false,
          fallbackNeeded: true,
          message: 'Chave Gemini API não configurada no servidor. Usando motor heurístico integrado.',
        });
      }

      if (!fileBase64 && !fileName) {
        return res.status(400).json({ error: 'Nenhum arquivo enviado para análise.' });
      }

      const prompt = `Você é um médico auditor e especialista vascular do Hospital Naval Marcílio Dias (HNMD).
O paciente é: Vinícius Paes Mendes Pereira, 55 anos, Capitania Fluvial de Minas Gerais (Marinha do Brasil).
Diagnóstico: Oclusão Aortoilíaca Bilateral (Síndrome de Leriche) e Lesão Trófica no Hálux Direito.
Data de Internação programada no HNMD: 09/11/2026.

Analise este laudo médico / exame anexado (nome do arquivo: "${fileName || 'exame_anexo.pdf'}").
Extraia e classifique com precisão todas as informações médicas para indexação no Prontuário Digital e organização na Pasta Física (4 Abas):
- Aba 1: Relatórios e Histórico (Relatórios vasculares cirúrgicos, resumos de alta hospitalar, orientações multidisciplinares, encaminhamentos militares SIGAD-MB)
- Aba 2: Risco Cirúrgico e Cardiologia (Parecer cardiológico pré-operatório, eletrocardiograma/ECG, ecocardiograma, teste ergométrico, receitas e medicamentos cardiovasculares)
- Aba 3: Infectologia e Exames de Sangue (Hemograma, coagulograma/INR/TAP, função renal, ureia, creatinina, eletrólitos, carga viral HIV, CD4/CD8, função hepática, EAS/urina, sorologias)
- Aba 4: Exames de Imagem e Laudos (Eco Doppler arterial MMII, Eco Doppler de carótidas/vertebrais, Angiotomografia aorta/MMII, AngioTC de tórax, radiografias, cateterismo cardíaco CATE, laudos com filmes/CDs)

Retorne em formato JSON estruturado com os seguintes campos:
- paramName: Nome oficial claro do exame ou parâmetro (Ex: "D-Dímero Quantitativo", "Eletrocardiograma de Repouso (12 Derivações)", "Hemograma Completo", "Angiotomografia de Aorta Abdominal e MMII")
- category: Uma das seguintes categorias: "Hematologia", "Coagulação", "Renal", "Eletrólitos", "Glicemia", "Infectologia", "Hepático", "Lipídico", "Urina", "Imagem/Laudo", "Resumo Clínico", "Cardiologia/Risco"
- currentValue: Valor ou resultado encontrado no laudo (Ex: "0,32", "14,1", "Ritmo sinusal regular, FC 74 bpm, sem isquemia aguda", "Não Reagente", "Oclusão segmentar de artérias ilíacas")
- unit: Unidade de medida (Ex: "mg/L", "g/dL", "mg/dL", "%", "bpm", ou "" se qualitativo)
- referenceRange: Faixa de referência do laboratório (Ex: "< 0,50 mg/L", "12,0 a 16,0 g/dL", "Normal")
- collectionDate: Data da realização ou coleta no formato DD/MM/AAAA (se não informada, use a data encontrada no laudo ou a data atual)
- laboratory: Nome do laboratório, clínica ou hospital emissor (Ex: "Laboratório Carlos Chagas", "Santa Casa de Misericórdia de Juiz de Fora", "Ultrimagem Diagnósticos", "Hospital Geral de Juiz de Fora (HGeJF)", "HNMD")
- doctor: Nome do médico solicitante ou signatário com CRM/especialidade se houver (Ex: "Dr. Luiz Kingma Lanziotti (Cirurgia Vascular)", "Dra. Cecília Faria Wolkartt (Infectologia)", "Maj. Túlio (Cardiologia)")
- status: "normal", "warning" ou "critical"
- physicalTab: Número da aba recomendada na pasta física (1, 2, 3 ou 4)
- physicalTabName: Nome da aba (Ex: "Aba 3 · Infectologia e Exames de Sangue")
- suggestedItemNumber: Próximo número do item sugerido (19 ou sequencial)
- highlights: Array de 2 a 4 pontos clínicos essenciais extraídos do laudo
- summary: Resumo clínico de 1 linha para o cirurgião do HNMD
- explanation: Justificativa clara de por que este exame deve ser arquivado nesta aba da pasta física`;

      const contents: any[] = [];

      if (fileBase64 && mimeType) {
        const rawBase64 = fileBase64.replace(/^data:[^;]+;base64,/, '');
        contents.push({
          inlineData: {
            mimeType: mimeType === 'application/pdf' ? 'application/pdf' : mimeType,
            data: rawBase64,
          },
        });
      }

      contents.push({
        text: prompt,
      });

      const genAiPromise = ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              paramName: { type: Type.STRING },
              category: { type: Type.STRING },
              currentValue: { type: Type.STRING },
              unit: { type: Type.STRING },
              referenceRange: { type: Type.STRING },
              collectionDate: { type: Type.STRING },
              laboratory: { type: Type.STRING },
              doctor: { type: Type.STRING },
              status: { type: Type.STRING },
              physicalTab: { type: Type.INTEGER },
              physicalTabName: { type: Type.STRING },
              suggestedItemNumber: { type: Type.INTEGER },
              highlights: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              summary: { type: Type.STRING },
              explanation: { type: Type.STRING },
            },
            required: [
              'paramName',
              'category',
              'currentValue',
              'collectionDate',
              'laboratory',
              'physicalTab',
              'highlights',
            ],
          },
        },
      });

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Timeout de análise de 7s')), 7000)
      );

      const response: any = await Promise.race([genAiPromise, timeoutPromise]);

      const parsedData = JSON.parse(response.text || '{}');
      return res.json({
        success: true,
        source: 'gemini-3.8-flash',
        data: parsedData,
      });
    } catch (error: any) {
      console.error('Gemini Analysis Error:', error);
      return res.status(200).json({
        success: false,
        fallbackNeeded: true,
        error: error.message || 'Erro durante análise com Gemini',
      });
    }
  });

  // Serve static files in production or Vite middleware in development
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[HNMD Server] listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
