import React from 'react';
import { AppNavView } from './Header';
import {
  Activity,
  Folder,
  CheckCircle2,
  Search,
  TrendingUp,
  Key,
  Pill,
} from 'lucide-react';

interface StickyNavigationBarProps {
  activeView: AppNavView;
  setActiveView: (view: AppNavView) => void;
  credentialsCount?: number;
}

export const StickyNavigationBar: React.FC<StickyNavigationBarProps> = ({
  activeView,
  setActiveView,
  credentialsCount = 6,
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
      icon: <Activity className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'folder',
      label: 'Pasta Física (4 Abas)',
      icon: <Folder className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'checklist',
      label: 'Checklist HNMD',
      badge: '9 de 10',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      icon: <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />,
    },
    {
      id: 'overview',
      label: 'Pesquisa de Exames',
      icon: <Search className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'evolution',
      label: 'Evolução Temporal',
      icon: <TrendingUp className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'credentials',
      label: 'Laboratórios & Senhas',
      badge: `${credentialsCount}`,
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      icon: <Key className="w-4 h-4 shrink-0 text-amber-600" />,
    },
    {
      id: 'medications',
      label: 'Medicações',
      icon: <Pill className="w-4 h-4 shrink-0 text-rose-600" />,
    },
  ];

  return (
    <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5">
        <nav className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
          {tabs.map((tab) => {
            const isActive = activeView === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id)}
                className={`h-10 px-3.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer shadow-2xs shrink-0 border ${
                  isActive
                    ? 'bg-teal-700 text-white border-teal-800 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200/90 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300'
                }`}
                title={`Ir para ${tab.label}`}
              >
                <span className={isActive ? 'text-white' : 'text-slate-500'}>
                  {tab.icon}
                </span>

                <span>{tab.label}</span>

                {tab.badge && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full font-mono border ${
                      isActive
                        ? 'bg-white/20 text-white border-white/30'
                        : tab.badgeColor
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
