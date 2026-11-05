import React from 'react';
import { Disc, FileText, X, HardDrive, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';

interface CDsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLaudo: (title: string, pages: string[], pdfPath: string) => void;
}

export const CDsModal: React.FC<CDsModalProps> = ({
  isOpen,
  onClose,
  onOpenLaudo,
}) => {
  if (!isOpen) return null;

  const cdList = [
    {
      number: '01',
      title: 'CD 01: Angiotomografia da Aorta Abdominal e MMII',
      institution: 'Ultrimagem Centro de Diagnóstico por Imagem',
      details: 'Série tomográfica DICOM volumétrica completa de alta resolução (cortes finos axiais, coronais, sagitais e reconstruções 3D).',
      protocol: 'Ordem 471034 · Protocolo 1001 1636599',
      date: '24/09/2026 (Realização) · Laudo em 27/10/2026',
      laudoTitle: 'Laudo de Angiotomografia da Aorta Abdominal e MMII',
      laudoPages: [
        '/assets/rendered/laudo_angiotc_aorta_mmii_p01.png',
        '/assets/rendered/laudo_angiotc_aorta_mmii_p02.png',
      ],
      pdfPath:
        '/assets/aistudio/17__Angiotomografia_Computadorizada_da_Aorta_Abdominal_e_Membros_Inferiores_Ultrimagem_-_Ateromatose_Aortoil_aca_Severa_com_Falhas_de_Enchimento_laudos_8dc6c553.pdf',
    },
    {
      number: '02',
      title: 'CD 02: Angiotomografia Multislice Arterial Torácica',
      institution: 'Ultrimagem Centro de Diagnóstico por Imagem',
      details: 'Série DICOM completa da vasculatura torácica, aorta torácica, vasos da base e parênquima pulmonar.',
      protocol: 'Ordem 471034 · Protocolo 1001 1636589',
      date: '24/09/2026 (Realização) · Laudo em 27/10/2026',
      laudoTitle: 'Laudo de Angiotomografia Multislice Arterial Torácica',
      laudoPages: [
        '/assets/rendered/laudo_angiotc_torax_p01.png',
        '/assets/rendered/laudo_angiotc_torax_p2_p01.png',
      ],
      pdfPath:
        '/assets/aistudio/16__Angiotomografia_Multislice_Arterial_Tor_cica_Ultrimagem_-_Ord__471034_laudo_04bcafc5.pdf',
    },
    {
      number: '03',
      title: 'CD 03: Cateterismo Cardíaco CATE 88181 (Cinecoronariografia)',
      institution: 'Serviço de Hemodinâmica — Santa Casa de Juiz de Fora',
      details: 'Gravações dinâmicas completas em vídeo DICOM da circulação coronariana por punção radial direita (TCE, ADA, ACX e CD).',
      protocol: 'Exame CATE 88181 · Dr. Antonio José Muniz (CRM 21929)',
      date: '01/10/2026 às 13:14',
      laudoTitle: 'Cateterismo Cardíaco CATE 88181 (Livre de Obstruções)',
      laudoPages: [
        '/assets/rendered/laudo_cateterismo_88181_p01.png',
        '/assets/rendered/cateterismo_imagem_oficial_p01.png',
        '/assets/aistudio/13_imagem_cateterismo_separada_1_42458f5a.jpg',
        '/assets/aistudio/13_imagem_cateterismo_separada_2_a0163eeb.jpg',
        '/assets/aistudio/13_imagem_cateterismo_separada_3_97920774.jpg',
        '/assets/aistudio/13_imagem_cateterismo_separada_4_bc9bca79.jpg',
      ],
      pdfPath: '/assets/aistudio/13_laudo_cateterismo_e2fb066f.pdf',
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 bg-slate-50 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs">
              <Disc className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded uppercase">
                Aba 4 · Item 18
              </span>
              <h3 className="text-base font-bold text-slate-900 tracking-tight mt-0.5">
                3 CDs de Exames em DICOM + Filmes Impressos
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Instrução HNMD */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong>Orientações para Admissão no HNMD (09/11/2026):</strong> As 3 mídias físicas originais em CD-ROM e os filmes radiológicos impressos em grande formato estão guardados no <strong>envelope plástico da contracapa da pasta física</strong>. Devem ser entregues no balcão de internação ou à equipe de hemodinâmica do Marcílio Dias para importação na estação de trabalho / PACS do hospital.
            </div>
          </div>

          {/* Cards dos 3 CDs */}
          <div className="space-y-3">
            {cdList.map((cd) => (
              <div
                key={cd.number}
                className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs hover:border-slate-300 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3.5"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800 font-mono font-bold text-xs shrink-0 mt-0.5">
                    {cd.number}
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-bold text-slate-900 tracking-tight">
                      {cd.title}
                    </h4>
                    <div className="text-xs text-slate-500 font-medium">
                      {cd.institution} · {cd.date}
                    </div>
                    <div className="text-[11px] text-slate-600 font-mono">
                      {cd.protocol}
                    </div>
                    <p className="text-xs text-slate-600 pt-1 leading-snug">
                      {cd.details}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onOpenLaudo(cd.laudoTitle, cd.laudoPages, cd.pdfPath);
                  }}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl transition-colors flex items-center gap-1.5 shrink-0 self-start sm:self-center cursor-pointer whitespace-nowrap"
                  title="Abrir laudo oficial correspondente"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-600" />
                  <span>Ver Laudo / Imagens</span>
                </button>
              </div>
            ))}
          </div>

          {/* Filmes Radiológicos Impressos */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-start gap-3">
            <HardDrive className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-700 leading-relaxed">
              <strong>Filmes Radiológicos Físicos Impressos:</strong> Além dos 3 CDs digitais, a pasta física contém filmes radiológicos impressos em grande formato das Angiotomografias de Tórax e Aorta/MMII, acondicionados na contracapa.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Mídias conferidas e prontas para entrega</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
