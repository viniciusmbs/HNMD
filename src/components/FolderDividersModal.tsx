import React from 'react';
import { X, Printer, Folder, Tag, FileCheck } from 'lucide-react';

interface FolderDividersModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'dividers' | 'labels';
}

export const FolderDividersModal: React.FC<FolderDividersModalProps> = ({
  isOpen,
  onClose,
  type,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-3xl w-full p-6 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 font-bold">
              {type === 'dividers' ? <Folder className="w-5 h-5" /> : <Tag className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                {type === 'dividers'
                  ? 'Divisórias A4 da Pasta Física (4 Abas)'
                  : 'Folha de Etiquetas Adesivas para Identificação'}
              </h3>
              <p className="text-xs text-slate-500">
                Padrão oficial para impressão e organização das divisórias plásticas do dossiê.
              </p>
            </div>
          </div>

          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            Imprimir Formato A4
          </button>
        </div>

        {type === 'dividers' ? (
          <div className="space-y-6 pt-4">
            <div className="p-5 border-2 border-dashed border-teal-500 rounded-xl bg-teal-50/30 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-teal-700 text-white px-2 py-0.5 rounded">
                DIVISÓRIA 01 · ABA 1
              </span>
              <h4 className="text-lg font-bold text-slate-900">
                RELATÓRIOS MÉDICOS E HISTÓRICO DE INTERNAÇÃO
              </h4>
              <p className="text-xs text-slate-600">
                • Item 01: Relatório de Evolução Médica Cirurgia Vascular (Dr. Luiz Kingma - 22/09/2026)<br />
                • Item 02: Resumo de Alta Hospitalar - 20 Dias de Internação (Santa Casa - 10/10/2026)<br />
                • Item 03: Orientações de Alta de Enfermagem / Equipe Multidisciplinar<br />
                • Item 04: Documento Oficial de Encaminhamento Marinha do Brasil (SIGAD-MB & CFMG)
              </p>
            </div>

            <div className="p-5 border-2 border-dashed border-cyan-500 rounded-xl bg-cyan-50/30 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-cyan-700 text-white px-2 py-0.5 rounded">
                DIVISÓRIA 02 · ABA 2
              </span>
              <h4 className="text-lg font-bold text-slate-900">
                PRESCRIÇÕES MÉDICAS E MEDICAÇÕES EM USO
              </h4>
              <p className="text-xs text-slate-600">
                • Item 05: Receituário Vascular - AAS 100 mg + Cilostazol 50 mg (Dr. Luiz Kingma)<br />
                • Item 06: Receituários HGeJF - Paracetamol + Tramadol e Baclofeno (Maj. Túlio)<br />
                • Item 07: Formulário Oficial SICLOM - Tratamento Antirretroviral (Dra. Cecília)
              </p>
            </div>

            <div className="p-5 border-2 border-dashed border-indigo-500 rounded-xl bg-indigo-50/30 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-700 text-white px-2 py-0.5 rounded">
                DIVISÓRIA 03 · ABA 3
              </span>
              <h4 className="text-lg font-bold text-slate-900">
                INFECTOLOGIA, IMUNOLOGIA E EXAMES DE SANGUE
              </h4>
              <p className="text-xs text-slate-600">
                • Item 08: Relatório Pré-Operatório da Infectologista Dra. Cecília (Aptidão Cirúrgica)<br />
                • Item 09: Laudos de Carga Viral HIV (129 cópias) e CD4/CD8 (469 células)<br />
                • Item 10: Protocolo de Coleta Recente / Portais Online P168579<br />
                • Item 11: Protocolo Completo de Exames Laboratoriais (9 Páginas Carlos Chagas)<br />
                • Item 12: Índice dos 6 Blocos (B1: Dr. Klier 5p · B2: Dr. Kingma 7p · B3: Dr. Túlio 8p · B4: Dra. Cecília 9p · B5: Dra. Cecília CD4/CV 2p · B6: Dr. Valdier 9p) 
              </p>
            </div>

            <div className="p-5 border-2 border-dashed border-emerald-500 rounded-xl bg-emerald-50/30 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-700 text-white px-2 py-0.5 rounded">
                DIVISÓRIA 04 · ABA 4
              </span>
              <h4 className="text-lg font-bold text-slate-900">
                CIRURGIA VASCULAR, HEMODINÂMICA E IMAGENS
              </h4>
              <p className="text-xs text-slate-600">
                • Item 13: Cateterismo Cardíaco CATE 88181 - Coronárias Livres de Obstruções<br />
                • Item 14: Eco Color Doppler de Carótidas e Vertebrais (Normal)<br />
                • Item 15: Eco Color Doppler Arterial de Membro Inferior Direito (Oclusão Femoral S.)<br />
                • Item 16: Angiotomografia Multislice Arterial Torácica (Ultrimagem)<br />
                • Item 17: Angiotomografia da Aorta Abdominal e MMII (Falhas de Enchimento Ilíacas)<br />
                • Item 18: Envelope Físico com Filmes Impressos e 3 CDs de Tomografia
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4">
            {[
              { id: '01', title: 'Relatório Evolução Vascular', doctor: 'Dr. Luiz Kingma' },
              { id: '02', title: 'Resumo Alta Santa Casa (20d)', doctor: 'Dr. Luiz Kingma' },
              { id: '03', title: 'Alta de Enfermagem', doctor: 'Equipe Multidisciplinar' },
              { id: '04', title: 'Mensagem Oficial SIGAD-MB', doctor: 'Marinha do Brasil' },
              { id: '05', title: 'Receita AAS + Cilostazol', doctor: 'Dr. Luiz Kingma' },
              { id: '06', title: 'Receita Tramadol + Baclofeno', doctor: 'Maj. Túlio (HGeJF)' },
              { id: '07', title: 'Formulário SICLOM - TARV', doctor: 'Dra. Cecília Wolkartt' },
              { id: '08', title: 'Aptidão Cirúrgica Infecto', doctor: 'Dra. Cecília Wolkartt' },
              { id: '09', title: 'Laudos CD4/CD8 e CV HIV', doctor: 'Laboratório Carlos Chagas' },
              { id: '10', title: 'Protocolo e Senhas Labs', doctor: 'Protocolo P168579' },
              { id: '11', title: 'Exames Laboratoriais (9 Págs)', doctor: 'Laboratório Carlos Chagas' },
              { id: '12', title: 'Sumário de 6 Blocos Sangue', doctor: 'Consolidado Geral' },
              { id: '13', title: 'Cateterismo CATE 88181', doctor: 'Dr. Antonio Muniz' },
              { id: '14', title: 'Doppler Carótidas e Vertebrais', doctor: 'Dr. Luiz Gesualdo' },
              { id: '15', title: 'Doppler MMII Direito', doctor: 'Dr. Lucas Klier' },
              { id: '16', title: 'AngioTC Arterial Torácica', doctor: 'Dra. Ana Clara Barizon' },
              { id: '17', title: 'AngioTC Aorta e MMII', doctor: 'Dra. Ana Clara Barizon' },
              { id: '18', title: 'Envelope com 3 CDs e Filmes', doctor: 'Imagens Originais DICOM' },
            ].map((tag) => (
              <div
                key={tag.id}
                className="p-3 border border-slate-300 rounded-lg bg-slate-50 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold text-teal-800">
                    <span>ITEM {tag.id}</span>
                    <span>HNMD 09/11</span>
                  </div>
                  <div className="text-xs font-bold text-slate-900 mt-1 leading-snug">
                    {tag.title}
                  </div>
                </div>
                <div className="text-[10px] text-slate-500 mt-2 border-t border-slate-200 pt-1">
                  {tag.doctor}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
