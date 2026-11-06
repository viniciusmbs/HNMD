import type { IncomingMessage, ServerResponse } from 'http';
import { GoogleGenAI, Type } from '@google/genai';

type Req = IncomingMessage & { body?: any; method?: string };
type Res = ServerResponse & {
  status: (code: number) => Res;
  json: (data: any) => void;
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '30mb',
    },
  },
};

export default async function handler(req: Req, res: Res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { fileBase64, mimeType, fileName } = req.body || {};

    if (!process.env.GEMINI_API_KEY) {
      return res.status(200).json({
        success: false,
        fallbackNeeded: true,
        message: 'GEMINI_API_KEY não configurada no Vercel.',
      });
    }

    if (!fileBase64 && !fileName) {
      return res.status(400).json({ error: 'Nenhum arquivo enviado.' });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const prompt = `Você é um médico auditor e cirurgião vascular do Hospital Naval Marcílio Dias (HNMD).
Paciente: Vinícius Paes Mendes Pereira, 55 anos, Capitania Fluvial de Minas Gerais (Marinha do Brasil).
Diagnóstico: Oclusão Aortoilíaca Bilateral (Síndrome de Leriche) e Lesão Trófica no Hálux Direito.
Internação no HNMD: 09/11/2026.

Analise este laudo médico / exame anexado ("${fileName || 'exame.pdf'}").
Classifique com precisão para a Pasta Física (4 Abas):
- Aba 1: Relatórios e Histórico
- Aba 2: Risco Cirúrgico e Cardiologia
- Aba 3: Infectologia e Exames de Sangue
- Aba 4: Exames de Imagem e Laudos

Retorne estritamente um JSON com:
- paramName: Nome do exame
- category: Categoria ("Hematologia", "Coagulação", "Renal", "Eletrólitos", "Glicemia", "Infectologia", "Hepático", "Lipídico", "Urina", "Imagem/Laudo", "Resumo Clínico", "Cardiologia/Risco")
- currentValue: Resultado
- unit: Unidade
- referenceRange: Referência
- collectionDate: Data DD/MM/AAAA
- laboratory: Laboratório
- doctor: Médico
- status: "normal", "warning" ou "critical"
- physicalTab: 1, 2, 3 ou 4
- physicalTabName: Nome da aba
- suggestedItemNumber: 19
- highlights: Array de 2 a 4 pontos clínicos
- summary: Resumo clínico
- explanation: Justificativa da aba`;

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

    contents.push({ text: prompt });

    const response = await ai.models.generateContent({
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

    const parsedData = JSON.parse(response.text || '{}');
    return res.status(200).json({
      success: true,
      source: 'gemini-3.8-flash',
      data: parsedData,
    });
  } catch (error: any) {
    console.error('Vercel handler error:', error);
    return res.status(200).json({
      success: false,
      fallbackNeeded: true,
      error: error.message || 'Erro no processamento',
    });
  }
}
