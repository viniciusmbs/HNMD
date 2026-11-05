import React from 'react';
import { medications } from '../data/medications';
import { Medication } from '../types/medical';
import { Pill, ShieldAlert, FileText, CheckCircle2, Stethoscope } from 'lucide-react';

interface MedicationPanelProps {
  onOpenDocRef: (docRef: NonNullable<Medication['documentRef']>) => void;
}

export const MedicationPanel: React.FC<MedicationPanelProps> = ({ onOpenDocRef }) => {
  const categories = [
    {
      key: 'vascular' as const,
      letter: 'B',
      title: 'Tratamento Vascular & Prevenção Antitrombótica',
      doctor: 'Dr. Luiz Kingma Lanziotti (Cirurgia Vascular - Santa Casa JF)',
      desc: 'Proteção endotelial, inibição plaquetária e dilatação arteriolar periférica.',
      badgeClass: 'bg-blue-100/80 text-blue-900 border-blue-300',
      headerBg: 'bg-blue-50/60 border-blue-200/70',
    },
    {
      key: 'analgesia' as const,
      letter: 'A',
      title: 'Analgesia & Relaxamento Muscular',
      doctor: 'Maj. Túlio Vieira Mendes (HGeJF - Exército Brasileiro)',
      desc: 'Alívio da dor isquêmica em queimação e controle de espasmos musculares no membro direito.',
      badgeClass: 'bg-amber-100/80 text-amber-900 border-amber-300',
      headerBg: 'bg-amber-50/60 border-amber-200/70',
    },
    {
      key: 'hiv' as const,
      letter: 'C',
      title: 'Esquema Antirretroviral / Infectologia (Manter Ininterruptamente)',
      doctor: 'Dra. Cecília Faria Wolkartt (Infectologia)',
      desc: 'Terapia antirretroviral contínua há >30 anos. Manter no pré e pós-operatório sem interrupções.',
      badgeClass: 'bg-emerald-100/80 text-emerald-900 border-emerald-300',
      headerBg: 'bg-emerald-50/60 border-emerald-200/70',
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-5">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <div className="text-xs font-bold text-cyan-800 uppercase tracking-wider flex items-center gap-1.5">
            <Pill className="w-4 h-4 text-cyan-700" />
            Lista Completa de Medicamentos em Uso Recente
          </div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight mt-0.5">
            Prescrições em Uso e Recomendações Perioperatórias
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Dossiê conferido com os receituários originais e formulário oficial SICLOM.
          </p>
        </div>

        <div className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-3 py-1.5 rounded-xl flex items-center gap-1.5 shrink-0 self-start sm:self-center">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Sem interações medicamentosas adversas (Infectologia)</span>
        </div>
      </div>

      {/* 3 Categories Blocks with Proportional Layout */}
      <div className="space-y-4">
        {categories.map((cat) => {
          const items = medications.filter((m) => m.category === cat.key);
          const isTwoColumns = items.length === 2;

          return (
            <div
              key={cat.key}
              className="bg-slate-50/60 border border-slate-200/90 rounded-2xl p-4 space-y-3"
            >
              {/* Category Header: Title AND Prescribing Doctor unified together */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-lg border ${cat.badgeClass}`}>
                  {cat.letter}
                </span>

                <h4 className="text-sm font-bold text-slate-900 tracking-tight">
                  {cat.title}
                </h4>

                <span className="text-slate-300 hidden md:inline">•</span>

                {/* Prescribing Doctor Badge tightly integrated with the title */}
                <div className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200/90 px-2.5 py-0.5 rounded-lg shadow-2xs">
                  <Stethoscope className="w-3.5 h-3.5 text-cyan-700 shrink-0" />
                  <span className="text-slate-500 font-normal">Prescrito por:</span>
                  <span className="font-semibold text-slate-800">{cat.doctor}</span>
                </div>
              </div>

              {/* Proportional Grid: 2 columns for 2 items, 3 columns for 3 items (No empty void on the right!) */}
              <div
                className={`grid grid-cols-1 ${
                  isTwoColumns ? 'md:grid-cols-2' : 'md:grid-cols-3'
                } gap-3`}
              >
                {items.map((med) => (
                  <div
                    key={med.id}
                    className="p-4 rounded-xl border border-slate-200/90 bg-white hover:border-slate-300 hover:shadow-xs transition-all flex flex-col justify-between space-y-2.5"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-sm font-bold text-slate-900 tracking-tight">
                          {med.name}
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-800 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md shrink-0">
                          {med.dosage}
                        </span>
                      </div>

                      <div className="text-xs font-medium text-slate-700 mt-1.5">
                        Posologia:{' '}
                        <span className="font-semibold text-slate-900">
                          {med.posology}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                        {med.notes}
                      </p>
                    </div>

                    {med.documentRef && (
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-[11px] text-slate-500 font-mono">
                          {med.documentRef.folderTab} · Item {med.documentRef.itemNumber}
                        </span>
                        <button
                          onClick={() => onOpenDocRef(med.documentRef!)}
                          className="font-semibold text-cyan-700 hover:text-cyan-900 flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <FileText className="w-3 h-3" />
                          <span>Ver Receita</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Infectology Recommendation Box */}
      <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 text-xs text-amber-900 flex items-start gap-3 shadow-2xs">
        <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Recomendação da Infectologista (Dra. Cecília):</strong> Manter rigorosamente o esquema antirretroviral (Darunavir + Dolutegravir + Ritonavir) no pré e pós-operatório. Orientação de suspensão ou ajuste do AAS/Cilostazol deve ser dada privativamente pelo cirurgião vascular e anestesista do HNMD conforme a técnica operatória.
        </div>
      </div>
    </div>
  );
};
