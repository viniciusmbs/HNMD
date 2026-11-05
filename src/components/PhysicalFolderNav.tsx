import React, { useState } from 'react';
import { physicalFolderItems } from '../data/physicalFolder';
import { PhysicalFolderItem } from '../types/medical';
import {
  Folder,
  FileText,
  Calendar,
  Hospital,
  User,
  Check,
  ExternalLink,
  Tag,
  Layers,
  Disc,
} from 'lucide-react';

interface PhysicalFolderNavProps {
  onOpenDocument: (item: PhysicalFolderItem) => void;
  onOpenGallery?: (galleryId: string) => void;
  onOpenDividersModal?: (type: 'dividers' | 'labels') => void;
  onOpenBlock?: (blockNum: 1 | 2 | 3 | 4 | 5 | 6) => void;
  initialTab?: 'all' | 1 | 2 | 3 | 4;
}

export const PhysicalFolderNav: React.FC<PhysicalFolderNavProps> = ({
  onOpenDocument,
  onOpenGallery,
  onOpenDividersModal,
  onOpenBlock,
  initialTab = 'all',
}) => {
  const [filterTab, setFilterTab] = useState<'all' | 1 | 2 | 3 | 4>(
    initialTab || 'all'
  );

  React.useEffect(() => {
    setFilterTab(initialTab || 'all');
  }, [initialTab]);

  // Metadata mappings for each item corresponding to screenshots 2 and 3
  const itemMeta: Record<
    number,
    {
      category: string;
      tags: string[];
      statusText: string;
    }
  > = {
    1: {
      category: 'Relatórios e Histórico de Internação',
      tags: ['#Evolução Médica', '#Cirurgia Vascular', '#Transferência HNMD', '#Santa Casa', '#Aba 1'],
      statusText: 'Disponível na pasta e digitalizado',
    },
    2: {
      category: 'Relatórios e Histórico de Internação',
      tags: ['#Resumo de Alta', '#Internação', '#Aba 1'],
      statusText: 'Constante na pasta física',
    },
    3: {
      category: 'Relatórios e Histórico de Internação',
      tags: ['#Enfermagem', '#Cuidados', '#Aba 1'],
      statusText: 'Documento arquivado',
    },
    4: {
      category: 'Relatórios e Histórico de Internação',
      tags: ['#Protocolo', '#Prontuário', '#SAME', '#Aba 1'],
      statusText: 'Protocolo arquivado',
    },
    5: {
      category: 'Prescrições e Medicações',
      tags: ['#Receita', '#AAS', '#Cilostazol', '#Vascular', '#Aba 2'],
      statusText: 'Receita original na pasta',
    },
    6: {
      category: 'Prescrições e Medicações',
      tags: ['#Receita', '#HGeJF', '#Tramadol', '#Baclofeno', '#Aba 2'],
      statusText: 'Receita original na pasta',
    },
    7: {
      category: 'Prescrições e Medicações',
      tags: ['#SICLOM', '#Tarv', '#HIV', '#Aba 2'],
      statusText: 'Dispensação regular',
    },
    8: {
      category: 'Infectologia e Exames de Sangue',
      tags: ['#Infectologia', '#Apto Cirurgia', '#CD4', '#Carga Viral', '#Aba 3'],
      statusText: 'Atestado de Aptidão Concedido',
    },
    9: {
      category: 'Infectologia e Exames de Sangue',
      tags: ['#Carga Viral', '#CD4', '#CD8', '#Imunologia', '#Aba 3'],
      statusText: 'Estável e Controlado',
    },
    10: {
      category: 'Infectologia e Exames de Sangue',
      tags: ['#Pedido Médico', '#Carga Viral', '#Aba 3'],
      statusText: 'Coleta realizada / Protocolada',
    },
    11: {
      category: 'Infectologia e Exames de Sangue',
      tags: [],
      statusText: '9 Páginas Completas Analisadas',
    },
    13: {
      category: 'Cirurgia Vascular e Imagens',
      tags: ['#Cateterismo', '#CATE 88181', '#Coronárias Livres', '#Aba 4'],
      statusText: 'Obstruções excluídas (Normal)',
    },
    14: {
      category: 'Cirurgia Vascular e Imagens',
      tags: ['#Doppler', '#Carótidas', '#Vertebrais', '#Normal', '#Aba 4'],
      statusText: 'Normalidade confirmada',
    },
    15: {
      category: 'Cirurgia Vascular e Imagens',
      tags: ['#Doppler', '#Femoral Superficial', '#Oclusão MMII', '#Aba 4'],
      statusText: 'Oclusão detalhada (5-25cm)',
    },
    16: {
      category: 'Cirurgia Vascular e Imagens',
      tags: ['#AngioTC', '#Torácica', '#Pulmonar', '#Aba 4'],
      statusText: 'Laudo e imagens disponíveis',
    },
    17: {
      category: 'Cirurgia Vascular e Imagens',
      tags: ['#AngioTC', '#Aorta Abdominal', '#Ilíacas', '#Aba 4'],
      statusText: 'Falhas de enchimento evidenciadas',
    },
    18: {
      category: 'Cirurgia Vascular e Imagens',
      tags: ['#Envelope', '#3 CDs DICOM', '#Filmes Impressos', '#Aba 4'],
      statusText: 'Mídias físicas prontas para entrega',
    },
  };

  const filteredItems =
    filterTab === 'all'
      ? physicalFolderItems
      : physicalFolderItems.filter((i) => i.tab === filterTab);

  return (
    <div className="space-y-6">
      {/* Title Header Matching image_e68739a6.png */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-slate-900">
              <Folder className="w-5 h-5 text-cyan-600" />
              <h2 className="text-base sm:text-lg font-bold tracking-tight">
                Organização Sequencial da Pasta Física de Exames
              </h2>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-3xl">
              Índice 100% espelhado nas divisórias plásticas e etiquetas físicas levadas pelo paciente ao hospital. O médico pode localizar o documento original em papel ou abrir a versão digital em PDF/imagem instantaneamente.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onOpenDividersModal && onOpenDividersModal('dividers')}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Layers className="w-3.5 h-3.5 text-cyan-700" />
              <span>Ver Divisórias A4</span>
            </button>

            <button
              onClick={() => onOpenDividersModal && onOpenDividersModal('labels')}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Tag className="w-3.5 h-3.5 text-teal-700" />
              <span>Ver Folha de Etiquetas</span>
            </button>
          </div>
        </div>

        {/* 5 Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
          <button
            onClick={() => setFilterTab('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterTab === 'all'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 bg-slate-50'
            }`}
          >
            Todos os Itens (01 a 18)
          </button>

          <button
            onClick={() => setFilterTab(1)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterTab === 1
                ? 'bg-teal-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 bg-slate-50'
            }`}
          >
            ABA 1: Relatórios & Histórico
          </button>

          <button
            onClick={() => setFilterTab(2)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterTab === 2
                ? 'bg-teal-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 bg-slate-50'
            }`}
          >
            ABA 2: Prescrições & Medicamentos
          </button>

          <button
            onClick={() => setFilterTab(3)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterTab === 3
                ? 'bg-teal-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 bg-slate-50'
            }`}
          >
            ABA 3: Infectologia & Sangue
          </button>

          <button
            onClick={() => setFilterTab(4)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterTab === 4
                ? 'bg-teal-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 bg-slate-50'
            }`}
          >
            ABA 4: Cirurgia Vascular & Imagem
          </button>
        </div>
      </div>

      {/* 2-Column Grid of Items (01 to 18) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item) => {
          const meta = itemMeta[item.itemNumber] || {
            category: item.tabName,
            tags: [`#Aba ${item.tab}`],
            statusText: 'Disponível na pasta e digitalizado',
          };

          return (
            <div
              key={item.itemNumber}
              className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                {/* Header row: Badges on left, Category on right */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono font-bold bg-teal-800 text-white px-2 py-0.5 rounded">
                      ITEM {String(item.itemNumber).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] font-semibold bg-cyan-50 text-cyan-800 border border-cyan-200 px-2 py-0.5 rounded">
                      ABA {item.tab}
                    </span>
                  </div>

                  <span className="text-[11px] text-slate-500 font-medium truncate max-w-[50%] text-right">
                    {meta.category}
                  </span>
                </div>

                {/* Title and Subtitle */}
                <div>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {item.itemNumber}. {item.title}
                  </h3>
                  <div className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                    {item.subtitle}
                  </div>
                </div>

                {/* Metadata Line with icons */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-600">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    {item.date.split(' às')[0]}
                  </span>
                  <span className="flex items-center gap-1">
                    <Hospital className="w-3 h-3 text-slate-400" />
                    <span className="truncate max-w-[140px] sm:max-w-[180px]">{item.institution}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3 text-slate-400" />
                    <span className="truncate max-w-[140px] sm:max-w-[180px]">{item.doctor.split(' (')[0]}</span>
                  </span>
                </div>

                {/* Summary / Highlights text */}
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {item.highlights[0] || item.subtitle}
                </p>
              </div>

              {/* Footer row: Status check on left, Ver Laudo + Ver Imagens buttons on right */}
              <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 text-xs gap-2 flex-wrap">
                <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-700">
                  <Check className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate max-w-[150px] sm:max-w-none">{meta.statusText}</span>
                </span>

                <div className="flex items-center gap-1.5 shrink-0">
                  {item.itemNumber === 18 ? (
                    <button
                      onClick={() => onOpenDocument(item)}
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
                      title="Ver detalhes dos 3 CDs e filmes radiológicos"
                    >
                      <Disc className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Ver Conteúdo dos 3 CDs</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => onOpenDocument(item)}
                      className="px-2.5 py-1.5 text-xs font-semibold text-slate-800 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                      title="Ver folha oficial do laudo em PDF"
                    >
                      <FileText className="w-3 h-3 text-slate-600" />
                      <span>Ver Laudo</span>
                    </button>
                  )}

                  {[13, 14, 15, 16, 17].includes(item.itemNumber) && onOpenGallery && (
                    <button
                      onClick={() => {
                        if (item.itemNumber === 13) onOpenGallery('cateterismo');
                        else if (item.itemNumber === 14 || item.itemNumber === 15) onOpenGallery('doppler');
                        else onOpenGallery('all');
                      }}
                      className="px-2.5 py-1.5 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-600 rounded-lg transition-colors flex items-center gap-1 shadow-2xs cursor-pointer"
                      title="Ver galeria de imagens e fotos do exame"
                    >
                      <span>Ver Imagens</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Section: Detalhamento dos 6 Blocos de Laudos de Sangue */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-teal-700" />
            <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
              Detalhamento dos 6 Blocos de Laudos de Sangue (Aba 3 - Item 12)
            </h3>
          </div>
          <span className="text-[11px] font-semibold text-teal-800 bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-full">
            6 Blocos Oficiais · Todos Laudos Digitalizados
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {/* Bloco 1 - Dr. Lucas Klier */}
          <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-3.5 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono font-bold text-slate-700">
                <span>BLOCO 1 (DR. LUCAS KLIER)</span>
                <span className="bg-slate-200/80 px-1.5 py-0.5 rounded text-slate-800">5 PÁGS</span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 mt-1">
                Santa Casa (Dr. Lucas Klier)
              </h4>
              <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                Exames admissionais na Santa Casa (20/09/2026 · 5 Páginas):
              </p>
              <div className="flex flex-wrap gap-1 mt-1.5">
                {[
                  'Hemograma (Hb 14,5)',
                  'Plaquetas (219k)',
                  'Ureia (31)',
                  'Creatinina (1,26)',
                  'Sódio (139)',
                  'Potássio (4,40)',
                  'Magnésio (2,1)',
                  'PCR (0,40)',
                  'Coagulograma (TAP 100%)',
                ].map((item, i) => (
                  <span
                    key={i}
                    className="text-[10px] bg-slate-100 text-slate-800 font-medium px-1.5 py-0.5 rounded border border-slate-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={() => onOpenBlock && onOpenBlock(1)}
              className="w-full py-1.5 px-2.5 text-xs font-semibold text-slate-800 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Abrir Bloco 1 (Dr. Klier · 5 Págs)</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </button>
          </div>

          {/* Bloco 2 - Dr. Luiz Kingma */}
          <div className="bg-indigo-50/50 border border-indigo-300 rounded-xl p-3.5 flex flex-col justify-between space-y-3 shadow-2xs">
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono font-bold text-indigo-900">
                <span className="flex items-center gap-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-indigo-500"></span>
                  BLOCO 2 (DR. LUIZ KINGMA)
                </span>
                <span className="bg-indigo-200/80 px-1.5 py-0.5 rounded text-indigo-950 font-semibold">7 PÁGS</span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 mt-1">
                Santa Casa (Dr. Luiz Kingma · Angiologista)
              </h4>
              <p className="text-[11px] text-slate-700 mt-1 leading-snug">
                Exames de controle vascular pré-operatório (24/09/2026 · 7 Páginas):
              </p>
              <div className="flex flex-wrap gap-1 mt-1.5">
                {[
                  'Hemograma (Hb 13,3)',
                  'Glicemia (119 mg/dL)',
                  'Ureia (39 mg/dL)',
                  'Creatinina (1,18 mg/dL)',
                  'Sódio (138 mmol/L)',
                  'Potássio (4,00 mmol/L)',
                  'HbA1c (5,30%)',
                  'Coagulograma (TAP 100%)',
                ].map((item, i) => (
                  <span
                    key={i}
                    className="text-[10px] bg-indigo-100/90 text-indigo-900 font-medium px-1.5 py-0.5 rounded border border-indigo-200/80"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={() => onOpenBlock && onOpenBlock(2)}
              className="w-full py-1.5 px-2.5 text-xs font-bold text-indigo-950 bg-indigo-200/90 hover:bg-indigo-300 border border-indigo-400 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Abrir Bloco 2 (Dr. Kingma · 7 Págs)</span>
              <ExternalLink className="w-3 h-3 text-indigo-800" />
            </button>
          </div>

          {/* Bloco 3 - Dr. Túlio */}
          <div className="bg-sky-50/50 border border-sky-300 rounded-xl p-3.5 flex flex-col justify-between space-y-3 shadow-2xs">
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono font-bold text-sky-900">
                <span className="flex items-center gap-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-sky-500"></span>
                  BLOCO 3 (DR. TÚLIO)
                </span>
                <span className="bg-sky-200/80 px-1.5 py-0.5 rounded text-sky-900 font-semibold">8 PÁGS</span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 mt-1">
                Carlos Chagas (Dr. Túlio)
              </h4>
              <p className="text-[11px] text-slate-700 mt-1 leading-snug">
                Exames solicitados pelo Dr. Túlio (Carlos Chagas · 8 Páginas):
              </p>
              <div className="flex flex-wrap gap-1 mt-1.5">
                {[
                  'Anti-HBC Total',
                  'HBsAg Superfície',
                  'Toxoplasmose IgG',
                  'Toxoplasmose IgM',
                  'HbA1c Glicada (5,3%)',
                  'Anti-HBS',
                  'Anti-HCV',
                  'Testosterona Total',
                  'Testosterona Livre',
                  'VDRL',
                ].map((item, i) => (
                  <span
                    key={i}
                    className="text-[10px] bg-sky-100/90 text-sky-900 font-medium px-1.5 py-0.5 rounded border border-sky-200/80"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={() => onOpenBlock && onOpenBlock(3)}
              className="w-full py-1.5 px-2.5 text-xs font-bold text-sky-950 bg-sky-200/90 hover:bg-sky-300 border border-sky-400 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Abrir Bloco 3 (Dr. Túlio · 8 Págs)</span>
              <ExternalLink className="w-3 h-3 text-sky-800" />
            </button>
          </div>

          {/* Bloco 4 - Dra. Cecília (Geral) */}
          <div className="bg-teal-50/40 border border-teal-200/80 rounded-xl p-3.5 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono font-bold text-teal-900">
                <span>BLOCO 4 (DRA. CECÍLIA · GERAL)</span>
                <span className="bg-teal-200/80 px-1.5 py-0.5 rounded text-teal-950 font-semibold">9 PÁGS</span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 mt-1">
                Carlos Chagas (Dra. Cecília · Bioquímica)
              </h4>
              <p className="text-[11px] text-slate-600 mt-1">
                Protocolo completo de 9 páginas: Hemograma (Hb 14,1), Urina EAS límpido, Perfil Lipídico, Hepático (TGO/TGP/Bilirrubina), Renal (Ureia 29,2/Creat 1,10), Eletrólitos e VDRL.
              </p>
            </div>
            <button
              onClick={() => onOpenBlock && onOpenBlock(4)}
              className="w-full py-1.5 px-2.5 text-xs font-semibold text-teal-900 bg-teal-100/70 hover:bg-teal-200/80 border border-teal-300 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Abrir Bloco 4 (Dra. Cecília · 9 Págs)</span>
              <ExternalLink className="w-3 h-3 text-teal-700" />
            </button>
          </div>

          {/* Bloco 5 - Dra. Cecília (CD4 e Carga Viral HIV) */}
          <div className="bg-emerald-50/50 border-2 border-emerald-400/90 rounded-xl p-3.5 flex flex-col justify-between space-y-3 shadow-xs">
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono font-bold text-emerald-950">
                <span className="flex items-center gap-1.5">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
                  BLOCO 5 (DRA. CECÍLIA · CD4/CV)
                </span>
                <span className="bg-emerald-200/80 px-1.5 py-0.5 rounded text-emerald-900 font-semibold">2 PÁGS</span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 mt-1">
                Carlos Chagas (Dra. Cecília · Imunologia)
              </h4>
              <p className="text-[11px] text-slate-700 mt-1 leading-snug">
                Laudos emitidos com valores absolutos, percentuais e RT-PCR:
              </p>
              <div className="flex flex-wrap gap-1 mt-1.5">
                {[
                  'Linfócitos CD4+ (13,23%)',
                  'CD4 Absoluto (469 /mm³)',
                  'Carga Viral HIV (129 cópias/mL)',
                  'RT-PCR (2,11 log)',
                ].map((item, i) => (
                  <span
                    key={i}
                    className="text-[10px] bg-emerald-100 text-emerald-900 font-medium px-1.5 py-0.5 rounded border border-emerald-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={() => onOpenBlock && onOpenBlock(5)}
              className="w-full py-1.5 px-2.5 text-xs font-bold text-emerald-950 bg-emerald-200/90 hover:bg-emerald-300 border border-emerald-400 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Abrir Bloco 5 (CD4 e Carga Viral · 2 Págs)</span>
              <ExternalLink className="w-3 h-3 text-emerald-800" />
            </button>
          </div>

          {/* Bloco 6 - Dr. Arthur Valdier */}
          <div className="bg-amber-50/60 border-2 border-amber-400/90 rounded-xl p-3.5 flex flex-col justify-between space-y-3 shadow-xs">
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono font-bold text-amber-950">
                <span className="flex items-center gap-1.5">
                  <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                  BLOCO 6 (DR. VALDIER)
                </span>
                <span className="bg-amber-200/80 px-1.5 py-0.5 rounded text-amber-900">9 PÁGS</span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 mt-1">
                Dr. Arthur Valdier (HGeJF)
              </h4>
              <p className="text-[11px] text-slate-700 mt-1 leading-snug">
                <span className="text-rose-700 font-bold bg-rose-50 px-1 rounded">Estradiol 86,3 pg/mL (Elevado)</span>, PSA Total (0,61), PSA Livre (0,08), Hemograma, Glicemia 97, Lipídico e Hepático.
              </p>
            </div>
            <button
              onClick={() => onOpenBlock && onOpenBlock(6)}
              className="w-full py-1.5 px-2.5 text-xs font-bold text-amber-950 bg-amber-300 hover:bg-amber-400 border border-amber-500 rounded-lg transition-colors flex items-center justify-center gap-1 shadow-xs cursor-pointer"
            >
              <span>Abrir Bloco 6 (Dr. Valdier · 9 Págs)</span>
              <ExternalLink className="w-3 h-3 text-amber-900" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
