import React, { useState, useMemo } from 'react';
import { labResults } from '../data/labResults';
import { LabResultItem } from '../types/medical';
import {
  Search,
  ExternalLink,
  Calendar,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  FileText,
  X,
  ImageIcon,
} from 'lucide-react';

interface QuickSearchProps {
  onSelectResult: (result: LabResultItem) => void;
  onOpenGallery?: (galleryId: string) => void;
  isOpenModal?: boolean;
  onCloseModal?: () => void;
}

const CATEGORY_TABS = [
  { id: 'all', label: 'Todos' },
  { id: 'Resumo Clínico', label: 'Resumos - Pareceres' },
  { id: 'Imagem/Laudo', label: 'Exames de Imagem' },
  { id: 'Renal', label: 'Renal' },
  { id: 'Eletrólitos', label: 'Eletrólitos' },
  { id: 'Hematologia', label: 'Hematologia' },
  { id: 'Glicemia', label: 'Glicemia' },
  { id: 'Coagulação', label: 'Coagulação' },
  { id: 'Infectologia', label: 'Infectologia' },
  { id: 'Urina', label: 'Urina' },
  { id: 'Hepático', label: 'Hepático' },
  { id: 'Hormonal', label: 'Hormonal' },
];

function normalizeText(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export const QuickSearch: React.FC<QuickSearchProps> = ({
  onSelectResult,
  onOpenGallery,
  isOpenModal = false,
  onCloseModal,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredResults = useMemo(() => {
    const raw = searchTerm.trim();
    const term = normalizeText(raw);

    return labResults.filter((item) => {
      // 1. Category Filter
      if (selectedCategory !== 'all') {
        const itemCat = normalizeText(item.category);
        const selCat = normalizeText(selectedCategory);
        if (itemCat !== selCat) return false;
      }

      if (!term) return true;

      // 2. Direct normalized text matches
      const normParam = normalizeText(item.paramName);
      const normCat = normalizeText(item.category);
      const normDoc = normalizeText(item.doctor);
      const normLab = normalizeText(item.laboratory);
      const normVal = normalizeText(item.currentValue);
      const normTab = normalizeText(item.physicalLocation.tab);
      const normBlock = normalizeText(item.physicalLocation.block || '');

      if (
        normParam.includes(term) ||
        normCat.includes(term) ||
        normDoc.includes(term) ||
        normLab.includes(term) ||
        normVal.includes(term) ||
        normTab.includes(term) ||
        normBlock.includes(term)
      ) {
        return true;
      }

      // 3. Smart Semantic Groupings & Aliases requested by user
      // A. Eletrólitos: potássio, sódio, cálcio, magnésio, cloreto, sérico
      const isElectrolyteQuery =
        term.includes('potassio') ||
        term.includes('sodio') ||
        term.includes('calcio') ||
        term.includes('magnesio') ||
        term.includes('serico') ||
        term.includes('eletrolito');

      if (isElectrolyteQuery && item.category === 'Eletrólitos') {
        return true;
      }

      // B. Hormonal: PSA, hormônio, testosterona, estradiol, LH, FSH, prolactina
      const isHormonalQuery =
        term.includes('hormon') ||
        term.includes('psa') ||
        term.includes('testosterona') ||
        term.includes('estradiol') ||
        term.includes('prolactina') ||
        term.includes('lh') ||
        term.includes('fsh') ||
        term.includes('prostata');

      if (isHormonalQuery && item.category === 'Hormonal') {
        return true;
      }

      // C. Imagem / Vascular: femoral, artéria, oclusão, eco, doppler, laudo, cateterismo, cate, angiotc, tomografia, aorta, iliaca
      const isVascularQuery =
        term.includes('femoral') ||
        term.includes('arteria') ||
        term.includes('oclusao') ||
        term.includes('eco') ||
        term.includes('doppler') ||
        term.includes('laudo') ||
        term.includes('cateterismo') ||
        term.includes('cate') ||
        term.includes('angiotc') ||
        term.includes('tomografia') ||
        term.includes('aorta') ||
        term.includes('iliaca') ||
        term.includes('torax') ||
        term.includes('carotida') ||
        term.includes('imagem');

      if (
        isVascularQuery &&
        (item.category === 'Imagem/Laudo' ||
          normParam.includes('laudo') ||
          normParam.includes('cateterismo') ||
          normParam.includes('doppler') ||
          normParam.includes('angiotomografia'))
      ) {
        return true;
      }

      // D. Renal: rim, renal, ureia, creatinina, tfg
      const isRenalQuery =
        term.includes('renal') ||
        term.includes('rim') ||
        term.includes('creatinina') ||
        term.includes('ureia') ||
        term.includes('tfg');

      if (isRenalQuery && item.category === 'Renal') {
        return true;
      }

      // E. Infectologia: HIV, CD4, CD8, carga viral, hepatite, sifilis, vdrl
      const isInfectoQuery =
        term.includes('hiv') ||
        term.includes('cd4') ||
        term.includes('cd8') ||
        term.includes('carga viral') ||
        term.includes('hepatite') ||
        term.includes('sorologia') ||
        term.includes('vdrl');

      if (isInfectoQuery && item.category === 'Infectologia') {
        return true;
      }

      return false;
    });
  }, [searchTerm, selectedCategory]);

  const content = (
    <div className="space-y-4">
      {/* Search Input Bar */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Pesquise por parâmetro (ex: potássio, sódio, PSA, estradiol, femoral, doppler, laudo, cateterismo)..."
          className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:bg-white transition-all"
          autoFocus={isOpenModal}
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Category Filter Tabs - Exact Order Requested */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {CATEGORY_TABS.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-slate-900 text-white shadow-xs font-bold'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Results Count & Quick Hint */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
        <span>
          Encontrados: <strong className="text-slate-900 font-mono">{filteredResults.length}</strong> parâmetros / laudos
        </span>
        <span className="hidden sm:inline">
          Clique em &quot;Ver Laudo&quot; para abrir o documento correspondente
        </span>
      </div>

      {/* Results List */}
      <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl bg-white max-h-[520px] overflow-y-auto">
        {filteredResults.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">
            Nenhum resultado encontrado para &quot;<strong>{searchTerm}</strong>&quot;.
            <div className="text-xs text-slate-400 mt-1">
              Dica: você pode buscar por termos como potássio, sódio, PSA, estradiol, testosterona, femoral, doppler ou cateterismo.
            </div>
          </div>
        ) : (
          filteredResults.map((item) => {
            const isImageExam =
              item.category === 'Imagem/Laudo' &&
              (item.id.includes('cateterismo') ||
               item.id.includes('doppler') ||
               item.id.includes('angiotc') ||
               item.id.includes('cds'));

            return (
              <div
                key={item.id}
                className="p-3.5 hover:bg-slate-50/80 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-3"
              >
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-bold text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                    <span className="text-slate-300">·</span>
                    <h4 className="text-sm font-bold text-slate-900 tracking-tight">
                      {item.paramName}
                    </h4>
                  </div>

                  {/* Primary value display */}
                  <div className="flex flex-wrap items-baseline gap-2 pt-0.5">
                    <span className="text-base font-bold text-slate-900 font-mono">
                      {item.currentValue} {item.unit}
                    </span>
                    <span className="text-xs text-slate-500">
                      (Ref: {item.referenceRange})
                    </span>
                    {item.status === 'normal' && (
                      <span className="text-xs text-emerald-700 flex items-center gap-0.5 font-medium">
                        <CheckCircle2 className="w-3 h-3" /> Normal
                      </span>
                    )}
                    {item.status === 'altered' && (
                      <span className="text-xs text-amber-700 flex items-center gap-0.5 font-medium">
                        <AlertTriangle className="w-3 h-3" /> Alterado
                      </span>
                    )}
                    {item.status === 'attention' && (
                      <span className="text-xs text-blue-700 flex items-center gap-0.5 font-medium">
                        <FileText className="w-3 h-3" /> Em processamento
                      </span>
                    )}
                  </div>

                  {/* Metadata & Physical Location */}
                  <div className="flex flex-wrap items-center gap-x-2 text-xs text-slate-600 pt-1">
                    <span className="flex items-center gap-1 text-slate-700">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {item.collectionDate}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="text-slate-700 font-medium">{item.laboratory}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-slate-500">{item.doctor}</span>
                  </div>

                  {/* Physical folder badge */}
                  <div className="flex items-center gap-1.5 pt-1 text-xs text-cyan-900 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-cyan-700 shrink-0" />
                    <span>
                      Pasta Física: <strong>{item.physicalLocation.tab}</strong>
                      {item.physicalLocation.block && ` · ${item.physicalLocation.block}`}
                      {` · ${item.physicalLocation.page}`}
                    </span>
                  </div>
                </div>

                {/* Action Buttons: Dual buttons for imaging exams, single button for lab */}
                <div className="shrink-0 flex items-center gap-2 pt-2 md:pt-0">
                  <button
                    onClick={() => onSelectResult(item)}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
                    title="Ver a folha original do laudo"
                  >
                    <FileText className="w-3.5 h-3.5 text-slate-600" />
                    <span>Ver Laudo</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );

  if (isOpenModal) {
    return (
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-4xl w-full p-5 space-y-4 max-h-[90vh] flex flex-col">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Pesquisa Rápida de Exames e Laudos
              </h3>
              <p className="text-xs text-slate-500">
                Busca com reconhecimento de parâmetros bioquímicos, hormonais e laudos de imagem
              </p>
            </div>
            {onCloseModal && (
              <button
                onClick={onCloseModal}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          <div className="flex-1 overflow-y-auto">{content}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3">
      <div className="mb-2">
        <h3 className="text-base font-bold text-slate-900 tracking-tight">
          Pesquisa de Parâmetros e Laudos
        </h3>
        <p className="text-xs text-slate-500">
          Pesquise por eletrólitos (potássio, sódio, magnésio), perfil hormonal (PSA, estradiol, testosterona) ou exames vasculares (femoral, doppler, cateterismo).
        </p>
      </div>
      {content}
    </div>
  );
};
