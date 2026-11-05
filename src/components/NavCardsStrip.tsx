import React from 'react';
import { Search, ShieldCheck, Folder, TrendingUp, Key, Pill } from 'lucide-react';

export type MainNavView = 'overview' | 'checklist' | 'folder' | 'evolution' | 'credentials' | 'medications';

interface NavCardsStripProps {
  activeView: MainNavView;
  onSelectView: (view: MainNavView) => void;
}

export const NavCardsStrip: React.FC<NavCardsStripProps> = ({
  activeView,
  onSelectView,
}) => {
  const cards: {
    id: MainNavView;
    title: string;
    subtitle: string;
    badge: string;
    badgeColor: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: 'overview',
      title: 'Pesquisa Direta',
      subtitle: 'Busca de resultados & folha',
      badge: '62 itens',
      badgeColor: 'text-slate-500',
      icon: <Search className="w-4 h-4 text-slate-700" />,
    },
    {
      id: 'checklist',
      title: 'Checklist HNMD',
      subtitle: 'Exigências pré-operatórias',
      badge: '10 itens',
      badgeColor: 'text-teal-700 font-bold',
      icon: <ShieldCheck className="w-4 h-4 text-teal-600" />,
    },
    {
      id: 'folder',
      title: 'Pasta Física',
      subtitle: 'Itens 01 a 18 numerados',
      badge: '4 Abas',
      badgeColor: 'text-slate-500',
      icon: <Folder className="w-4 h-4 text-cyan-700" />,
    },
    {
      id: 'evolution',
      title: 'Evolução Temporal',
      subtitle: 'Comparativo Mai/Set/Out',
      badge: '4 Épocas',
      badgeColor: 'text-slate-500',
      icon: <TrendingUp className="w-4 h-4 text-indigo-700" />,
    },
    {
      id: 'credentials',
      title: 'Labs & Senhas',
      subtitle: 'Logins e exames online',
      badge: '4 Portais',
      badgeColor: 'text-amber-700 font-bold',
      icon: <Key className="w-4 h-4 text-amber-600" />,
    },
    {
      id: 'medications',
      title: 'Medicações',
      subtitle: 'Vascular, Dor e TARV',
      badge: '7 Drogas',
      badgeColor: 'text-slate-500',
      icon: <Pill className="w-4 h-4 text-rose-600" />,
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-6">
      {cards.map((card) => {
        const isActive = activeView === card.id;
        return (
          <button
            key={card.id}
            onClick={() => onSelectView(card.id)}
            className={`p-3 rounded-xl text-left transition-all relative flex flex-col justify-between ${
              isActive
                ? 'bg-white border-2 border-teal-600 shadow-sm ring-2 ring-teal-500/10'
                : 'bg-white border border-slate-200 hover:border-slate-300 shadow-2xs hover:shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between w-full mb-2">
              <div className="p-1 rounded-md bg-slate-50">{card.icon}</div>
              <span className={`text-[11px] font-mono ${card.badgeColor}`}>
                {card.badge}
              </span>
            </div>

            <div>
              <div className={`text-xs font-bold leading-tight ${isActive ? 'text-slate-900' : 'text-slate-800'}`}>
                {card.title}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                {card.subtitle}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};
