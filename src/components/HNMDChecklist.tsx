import React from 'react';
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  ExternalLink,
  Info,
} from 'lucide-react';
import { LabResultItem } from '../types/medical';
import { labResults } from '../data/labResults';

interface HNMDChecklistProps {
  onSelectResult: (result: LabResultItem) => void;
  onOpenFolderTab: (tab: 1 | 2 | 3 | 4) => void;
  onOpenOfficialMessage?: () => void;
  onOpenSpecificLaudo?: (title: string, pages: string[], pdfPath?: string) => void;
}

export const HNMDChecklist: React.FC<HNMDChecklistProps> = ({
  onSelectResult,
  onOpenFolderTab,
  onOpenOfficialMessage,
  onOpenSpecificLaudo,
}) => {
  const getResult = (id: string) => labResults.find((r) => r.id === id);

  const checklistCards = [
    {
      id: 'hemograma',
      title: 'Hemograma Completo',
      doctorDate: 'Data mais recente: 29/10/2026 · Dra. Cecília Faria Wolkartt',
      foundBox: 'Hb: 14,1 g/dL | Ht: 41,5% | Leuc: 6.830 | Plaq: 196.000',
      location: 'Aba 3 · Bloco 2 Página 3/9 (Carlos Chagas)',
      notes: 'Realizado também em 20/05, 20/09 e 24/09 para comparação evolutiva.',
      status: 'presente' as const,
      resultId: 'hemoglobina',
      pages: ['/assets/rendered/lab_carlos_chagas_cecilia_9p_p03.png'],
      pdfPath: '/assets/aistudio/11_Protocolo_de_Resultados_de_Exames_Laboratoriais__ceilia_f5c95ee4.pdf',
    },
    {
      id: 'coagulograma',
      title: 'Coagulograma Completo (TAP / TTPA / Plaquetas)',
      doctorDate: 'Data mais recente: 24/09/2026 · Dr. Luiz Kingma / Dr. Lucas Klier',
      foundBox: 'TAP: 11,4 seg (100%, RNI 1,00) | TTPA: 30,2 seg | Plaq: 176.000',
      location: 'Aba 3 · Bloco 4 Páginas 6-7/12 (Santa Casa)',
      notes: 'Valores 100% estáveis e dentro do alvo fisiológico.',
      status: 'presente' as const,
      resultId: 'tap-rni',
      pages: [
        '/assets/rendered/lab_santacasa_rotina_12p_p06.png',
        '/assets/rendered/lab_santacasa_rotina_12p_p07.png',
      ],
      pdfPath: '/assets/aistudio/11_Protocolo_de_Resultados_de_Exames_Laboratoriais_Previs_o_04112026_laudoHemogramadoutor_LUIZ_KINGMA_LANZIOTTI___dcadf96f.pdf',
    },
    {
      id: 'sodio',
      title: 'Sódio Sérico (Na+)',
      doctorDate: 'Data mais recente: 29/10/2026 · Dra. Cecília Faria Wolkartt',
      foundBox: '136 mEq/L (Ref: 136 a 145 mEq/L)',
      location: 'Aba 3 · Bloco 2 Página 7/9 (Carlos Chagas)',
      notes: 'Normal. Histórico prévio: 139 mmol/L (20/09) e 138 mmol/L (24/09).',
      status: 'presente' as const,
      resultId: 'sodio',
      pages: ['/assets/rendered/lab_carlos_chagas_cecilia_9p_p07.png'],
      pdfPath: '/assets/aistudio/11_Protocolo_de_Resultados_de_Exames_Laboratoriais__ceilia_f5c95ee4.pdf',
    },
    {
      id: 'potassio',
      title: 'Potássio Sérico (K+)',
      doctorDate: 'Data mais recente: 29/10/2026 · Dra. Cecília Faria Wolkartt',
      foundBox: '3,9 mEq/L (Ref: 3,5 a 5,1 mEq/L)',
      location: 'Aba 3 · Bloco 2 Página 7/9 (Carlos Chagas)',
      notes: 'Normal. Histórico prévio: 4,40 mmol/L (20/09) e 4,00 mmol/L (24/09).',
      status: 'presente' as const,
      resultId: 'potassio',
      pages: ['/assets/rendered/lab_carlos_chagas_cecilia_9p_p07.png'],
      pdfPath: '/assets/aistudio/11_Protocolo_de_Resultados_de_Exames_Laboratoriais__ceilia_f5c95ee4.pdf',
    },
    {
      id: 'ureia',
      title: 'Ureia Sérica',
      doctorDate: 'Data mais recente: 29/10/2026 · Dra. Cecília Faria Wolkartt',
      foundBox: '29,2 mg/dL (Ref: 15 a 40 mg/dL)',
      location: 'Aba 3 · Bloco 2 Página 7/9 (Carlos Chagas)',
      notes: 'Normal. Histórico: 24 mg/dL (20/05), 37 mg/dL (20/09) e 39 mg/dL (24/09).',
      status: 'presente' as const,
      resultId: 'ureia',
      pages: ['/assets/rendered/lab_carlos_chagas_cecilia_9p_p07.png'],
      pdfPath: '/assets/aistudio/11_Protocolo_de_Resultados_de_Exames_Laboratoriais__ceilia_f5c95ee4.pdf',
    },
    {
      id: 'creatinina',
      title: 'Creatinina Sérica & eGFR',
      doctorDate: 'Data mais recente: 29/10/2026 · Dra. Cecília Faria Wolkartt',
      foundBox: '1,10 mg/dL (Ref: 0,7 a 1,2) | TFG: 79,2 mL/min/1,73m²',
      location: 'Aba 3 · Bloco 2 Página 7/9 (Carlos Chagas)',
      notes: 'Função renal preservada para uso de contraste iodado cirúrgico.',
      status: 'presente' as const,
      resultId: 'creatinina',
      pages: ['/assets/rendered/lab_carlos_chagas_cecilia_9p_p07.png'],
      pdfPath: '/assets/aistudio/11_Protocolo_de_Resultados_de_Exames_Laboratoriais__ceilia_f5c95ee4.pdf',
    },
    {
      id: 'glicemia',
      title: 'Glicemia de Jejum & Hemoglobina Glicada (HbA1c)',
      doctorDate: 'Data mais recente: 29/10/2026 · Maj. Túlio / Dra. Cecília',
      foundBox: 'HbA1c: 5,3% (Glicemia média 105 mg/dL) | Glicose 24/09: 119 mg/dL',
      location: 'Aba 3 · Bloco 1 Página 5/8 (Carlos Chagas)',
      notes: 'Hemoglobina glicada dentro do limite de não diabético (< 5,7%).',
      status: 'presente' as const,
      resultId: 'hba1c',
      pages: ['/assets/rendered/lab_carlos_chagas_tulio_8p_p05.png'],
      pdfPath: '/assets/aistudio/11_Protocolo_de_Resultados_de_Exames_Laboratoriais_Tulio_a8028bee.pdf',
    },
    {
      id: 'eas',
      title: 'EAS / Urina Tipo 1 (Sedimentoscopia)',
      doctorDate: 'Data mais recente: 29/10/2026 · Dra. Cecília Faria Wolkartt',
      foundBox: 'Límpido, pH 5,5, Densidade 1.025, Proteínas Ausentes, Nitrito Negativo',
      location: 'Aba 3 · Bloco 2 Página 1/9 (Carlos Chagas)',
      notes: 'Piócitos 2/campo, Hemácias 3/campo, Flora escassa. Sem infecção urinária ativa.',
      status: 'presente' as const,
      resultId: 'eas',
      pages: ['/assets/rendered/lab_carlos_chagas_cecilia_9p_p01.png'],
      pdfPath: '/assets/aistudio/11_Protocolo_de_Resultados_de_Exames_Laboratoriais__ceilia_f5c95ee4.pdf',
    },
    {
      id: 'imagens',
      title: 'Exames de Imagem Atualizados (< 2 meses)',
      doctorDate: 'Data mais recente: Outubro/2026 · Santa Casa, CINDI e Ultrimagem',
      foundBox: 'CATE 88181 (Coronárias Livres), Doppler MMII D, Angiotomografias e 3 CDs',
      location: 'Aba 4 Itens 13 a 18 da pasta física',
      notes: 'Todos os laudos e mídias físicas organizados na Aba 4 da pasta.',
      status: 'presente' as const,
      resultId: 'laudo-cateterismo',
      pages: [
        '/assets/rendered/laudo_cateterismo_88181_p01.png',
        '/assets/rendered/cateterismo_imagem_oficial_p01.png',
      ],
      pdfPath: '/assets/aistudio/13_laudo_cateterismo_e2fb066f.pdf',
    },
    {
      id: 'risco',
      title: 'Risco Cirúrgico / Eletrocardiograma / Raio-X de Tórax',
      doctorDate: 'Data mais recente: Pendente Entrega Hospitalar · Cardiologia / Hospital',
      foundBox: 'Cateterismo Cardíaco normal entregue; laudo textual do ECG aguardado',
      location: 'Nota no Dossiê Rodapé da Capa do Dossiê',
      notes: 'O paciente possui cateterismo livre de lesões (01/10/2026). O laudo formal do risco cirúrgico/ECG não havia sido liberado até o fechamento da pasta.',
      status: 'andamento' as const,
      resultId: undefined,
      pages: ['/assets/rendered/capa_dossie_p01.png'],
      pdfPath: '/assets/aistudio/1_Capa_Dossie_Clinico_Cirurgico_Vascular_c2d903bf.pdf',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Dark Navy Hero Card Matching image_e729413c.png */}
      <div className="bg-[#0a2540] rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left Text */}
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono font-bold bg-teal-950/90 text-teal-300 border border-teal-700/60 px-2.5 py-0.5 rounded-full">
                MSG OFICIAL SIGAD-MB · P221325Z/OUT/2026
              </span>
              <span className="text-[10px] font-semibold bg-slate-800/90 text-slate-300 px-2.5 py-0.5 rounded-full">
                Capitania Fluvial de Minas Gerais
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Checklist de Exames Pré-Operatórios Obrigatórios (HNMD)
            </h2>

            <p className="text-xs text-slate-300 leading-relaxed">
              Exigências formais expedidas pela Clínica de Cirurgia Vascular para internação em <strong className="text-white">09/11/2026</strong>. Todos os exames solicitados foram conferidos, organizados em abas numeradas e digitalizados com acesso imediato abaixo.
            </p>
          </div>

          {/* Right Readiness Gauge */}
          <div className="flex items-center gap-4 bg-slate-900/60 border border-slate-700/60 rounded-xl p-4 shrink-0">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                Índice de Prontidão
              </div>
              <div className="text-xl font-bold text-white tracking-tight">
                9/10 <span className="text-xs font-normal text-slate-300">Exigências</span>
              </div>
              <div className="text-[11px] text-teal-400 font-medium">
                90% Concluído e em Pasta
              </div>
            </div>

            {/* Circular Gauge 90% */}
            <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
              <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-700"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-teal-400"
                  strokeDasharray="90, 100"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-xs font-bold text-white font-mono">
                90%
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Banner inside Hero with Visual Preview of Page 1 (SIGAD-MB) and Page 2 (Email) */}
        <div className="mt-5 pt-4 border-t border-slate-700/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div
              className="flex -space-x-3 cursor-pointer hover:opacity-90 transition-opacity"
              onClick={onOpenOfficialMessage}
              title="Clique para abrir a Mensagem Oficial SIGAD-MB na Página 1"
            >
              <img
                src="/assets/rendered/marinha_sigad_mb_p01.png"
                alt="Página 1: Mensagem Oficial SIGAD-MB"
                className="w-12 h-16 object-cover rounded border-2 border-white shadow-md bg-white"
              />
              <img
                src="/assets/rendered/marinha_email_ana_p01.png"
                alt="Página 2: Despacho Email 3º SG Ana Barbazan"
                className="w-12 h-16 object-cover rounded border-2 border-white shadow-md bg-white"
              />
            </div>
            <div>
              <div className="font-bold text-white flex items-center gap-1.5 text-xs sm:text-sm">
                <span>Pág 1: Mensagem SIGAD-MB P221325Z · Pág 2: Despacho CFMG</span>
              </div>
            </div>
          </div>

          <button
            onClick={onOpenOfficialMessage}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-colors flex items-center gap-1.5 shrink-0 shadow-xs"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Ver Mensagem Oficial da Marinha (Pág 1 e 2)</span>
            <ExternalLink className="w-3 h-3 ml-0.5" />
          </button>
        </div>
      </div>

      {/* 10 Checklist Cards (2 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {checklistCards.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-3"
          >
            <div>
              {/* Header: Title + Status Badge */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2">
                  {card.status === 'presente' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 leading-snug">
                      {card.title}
                    </h3>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {card.doctorDate}
                    </div>
                  </div>
                </div>

                {card.status === 'presente' ? (
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded tracking-wide shrink-0">
                    PRESENTE
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded tracking-wide shrink-0">
                    EM ANDAMENTO
                  </span>
                )}
              </div>

              {/* Shaded Box with latest value */}
              <div className="bg-slate-50/80 border border-slate-100 rounded-lg p-2.5 mt-2.5 text-xs text-slate-800">
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-0.5">
                  Último Laudo Encontrado:
                </span>
                <span className="font-semibold text-slate-900 font-mono">
                  {card.foundBox}
                </span>
              </div>
            </div>

            {/* Folder location & Actions */}
            <div className="space-y-2 pt-1 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs gap-2">
                <span className="text-[11px] text-slate-500 font-medium truncate">
                  {card.location}
                </span>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      if (card.resultId) {
                        const res = getResult(card.resultId);
                        if (res) onSelectResult(res);
                      } else {
                        onOpenFolderTab(1);
                      }
                    }}
                    className="text-xs text-slate-500 hover:text-slate-800 underline decoration-slate-300"
                  >
                    Filtrar
                  </button>

                  <button
                    onClick={() => {
                      if (onOpenSpecificLaudo) {
                        onOpenSpecificLaudo(card.title, card.pages, card.pdfPath);
                      } else if (card.resultId) {
                        const res = getResult(card.resultId);
                        if (res) onSelectResult(res);
                      }
                    }}
                    className="text-xs font-semibold text-cyan-800 hover:text-cyan-950 flex items-center gap-1"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Ver Laudo (PDF)</span>
                  </button>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 italic">
                {card.notes}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Yellow Alert Box at Bottom matching image_e729413c.png */}
      <div className="bg-amber-50/80 border border-amber-200/90 rounded-xl p-4 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs">
          <h4 className="font-bold text-amber-950">
            Nota Médica sobre Risco Cirúrgico / Eletrocardiograma (Constante na Capa do Dossiê):
          </h4>
          <p className="text-amber-900 leading-relaxed">
            &ldquo;O laudo do eletrocardiograma e a avaliação formal de risco cirúrgico não foram entregues pelo hospital emissor até o momento da montagem da pasta. Contudo, o paciente já realizou <strong>Cateterismo Cardíaco (CATE 88181 em 01/10/2026)</strong> que evidenciou coronárias totalmente livres de obstrução, e os exames laboratoriais e infecciosos encontram-se 100% atualizados.&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
};
