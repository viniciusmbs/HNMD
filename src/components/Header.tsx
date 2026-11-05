import React from 'react';
import {
  FileText,
  Search,
  CheckCircle2,
  Folder,
  TrendingUp,
  Key,
  Pill,
  Plus,
  Filter,
  Printer,
  Shield,
  Activity,
} from 'lucide-react';

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
  activeView: AppNavView;
  setActiveView: (view: AppNavView) => void;
  onOpenSearch: () => void;
  onPrint: () => void;
  onAddExam: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  setActiveView,
  onOpenSearch,
  onPrint,
  onAddExam,
}) => {
  const tabs: {
    id: AppNavView;
    label: string;
    badge?: string;
    badgeColor?: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: 'dossier',
      label: 'Dossiê Clínico',
      icon: <Activity className="w-3 h-3 text-cyan-700" />,
    },
    {
      id: 'folder',
      label: 'Pasta Física (4 Abas)',
      icon: <Folder className="w-3 h-3 text-blue-700" />,
    },
    {
      id: 'checklist',
      label: 'Checklist HNMD',
      badge: '9 de 10',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      icon: <CheckCircle2 className="w-3 h-3 text-emerald-700" />,
    },
    {
      id: 'overview',
      label: 'Pesquisa de Exames',
      icon: <Search className="w-3 h-3 text-slate-700" />,
    },
    {
      id: 'evolution',
      label: 'Evolução Temporal',
      icon: <TrendingUp className="w-3 h-3 text-indigo-700" />,
    },
    {
      id: 'credentials',
      label: 'Laboratórios & Senhas',
      icon: <Key className="w-3 h-3 text-amber-700" />,
    },
    {
      id: 'medications',
      label: 'Medicações',
      icon: <Pill className="w-3 h-3 text-rose-700" />,
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 flex items-center justify-between gap-2.5">
        {/* Brand Zone */}
        <div
          onClick={() => setActiveView('dossier')}
          className="flex items-center gap-2 cursor-pointer shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold shadow-xs">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight leading-tight">
              Prontuário & Dossiê
            </h1>
            <div className="text-[10px] text-slate-500 font-medium">
              HNMD · Cirurgia Vascular
            </div>
          </div>
        </div>

        {/* Compact Navigation Tabs */}
        <nav className="flex items-center gap-1 text-[11px] font-medium overflow-x-auto py-1 max-w-full">
          {tabs.map((tab) => {
            const isActive = activeView === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id)}
                className={`px-2.5 py-1 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  isActive
                    ? 'text-teal-900 font-bold bg-teal-50 border border-teal-200/80 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full font-mono ${tab.badgeColor}`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={onAddExam}
            className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-2xs transition-colors whitespace-nowrap"
            title="Adicionar novo laudo ou exame"
          >
            <Plus className="w-3 h-3" />
            <span className="hidden sm:inline">Adicionar</span>
          </button>

          <button
            onClick={onOpenSearch}
            className="p-1.5 text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
            title="Filtrar ou pesquisar exames"
          >
            <Filter className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onPrint}
            className="p-1.5 text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
            title="Imprimir dossiê / resumo executivo"
          >
            <Printer className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
