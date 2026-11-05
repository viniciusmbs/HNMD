import React from 'react';
import { FileText, Plus, Filter, Printer } from 'lucide-react';

export type AppNavView =
  | 'dossier'
  | 'folder'
  | 'checklist'
  | 'overview'
  | 'evolution'
  | 'credentials'
  | 'medications'
  | 'images';

interface HeaderProps {
  onOpenDossier?: () => void;
  onOpenSearch: () => void;
  onPrint: () => void;
  onAddExam: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenDossier,
  onOpenSearch,
  onPrint,
  onAddExam,
}) => {
  return (
    <header className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand Zone - Left: Prontuário & Dossiê */}
        <div
          onClick={onOpenDossier}
          className="flex items-center gap-2.5 cursor-pointer shrink-0 group"
          title="Ir para o Dossiê Clínico Principal"
        >
          <div className="w-9 h-9 rounded-xl bg-teal-600 group-hover:bg-teal-700 text-white flex items-center justify-center font-bold shadow-xs transition-colors">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight leading-tight">
              Prontuário & Dossiê
            </h1>
            <div className="text-xs text-slate-500 font-medium">
              HNMD · Cirurgia Vascular
            </div>
          </div>
        </div>

        {/* Action Controls - Far Right: Adicionar, Filtro e Imprimir */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Botão Adicionar Exame */}
          <button
            onClick={onAddExam}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-2xs transition-colors cursor-pointer whitespace-nowrap"
            title="Adicionar novo laudo ou exame"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Adicionar</span>
          </button>

          {/* Botão Filtro / Busca */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-950 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors cursor-pointer whitespace-nowrap shadow-2xs"
            title="Filtrar ou pesquisar exames e parâmetros"
          >
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Filtro</span>
          </button>

          {/* Botão Imprimir */}
          <button
            onClick={onPrint}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-950 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors cursor-pointer whitespace-nowrap shadow-2xs"
            title="Imprimir resumo executivo do prontuário"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Imprimir</span>
          </button>
        </div>
      </div>
    </header>
  );
};
