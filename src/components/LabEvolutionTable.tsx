import React, { useState } from 'react';
import { TrendingUp, FileText, CheckCircle2 } from 'lucide-react';
import { LabResultItem } from '../types/medical';
import { labResults } from '../data/labResults';

interface EvolutionRow {
  param: string;
  unit: string;
  refRange: string;
  may2026: string;
  sep20: string;
  sep24: string;
  oct29: string;
  status: 'stable' | 'improved' | 'attention';
  resultId?: string;
}

interface LabEvolutionTableProps {
  onSelectResult: (result: LabResultItem) => void;
}

export const LabEvolutionTable: React.FC<LabEvolutionTableProps> = ({ onSelectResult }) => {
  const [filterCategory, setFilterCategory] = useState<'all' | 'renal' | 'hemo' | 'liver' | 'immune'>('all');

  const rows: EvolutionRow[] = [
    // Renal & Eletrólitos
    {
      param: 'Ureia',
      unit: 'mg/dL',
      refRange: '15 a 40',
      may2026: '24',
      sep20: '31',
      sep24: '39',
      oct29: '29,2',
      status: 'stable',
      resultId: 'ureia',
    },
    {
      param: 'Creatinina',
      unit: 'mg/dL',
      refRange: '0,7 a 1,2',
      may2026: '1,18',
      sep20: '1,26',
      sep24: '1,18',
      oct29: '1,10',
      status: 'improved',
      resultId: 'creatinina',
    },
    {
      param: 'Ritmo Filtração Glomerular (RFG)',
      unit: 'mL/min',
      refRange: '> 60',
      may2026: '> 60',
      sep20: '> 60',
      sep24: '> 60',
      oct29: '79,2',
      status: 'stable',
      resultId: 'rfg',
    },
    {
      param: 'Sódio (Na+)',
      unit: 'mEq/L',
      refRange: '136 a 145',
      may2026: '—',
      sep20: '139',
      sep24: '138',
      oct29: '136',
      status: 'stable',
      resultId: 'sodio',
    },
    {
      param: 'Potássio (K+)',
      unit: 'mEq/L',
      refRange: '3,5 a 5,1',
      may2026: '—',
      sep20: '4,4',
      sep24: '4,0',
      oct29: '3,9',
      status: 'stable',
      resultId: 'potassio',
    },

    // Hematologia
    {
      param: 'Hemoglobina',
      unit: 'g/dL',
      refRange: '13,0 a 17,0',
      may2026: '17,1',
      sep20: '14,5',
      sep24: '13,3',
      oct29: '14,1',
      status: 'stable',
      resultId: 'hemoglobina',
    },
    {
      param: 'Hematócrito',
      unit: '%',
      refRange: '40 a 50',
      may2026: '49,7',
      sep20: '42,0',
      sep24: '39,3',
      oct29: '41,5',
      status: 'stable',
      resultId: 'hematocrito',
    },
    {
      param: 'Leucócitos Totais',
      unit: '/mm³',
      refRange: '4.000 a 10.000',
      may2026: '8.540',
      sep20: '10.800',
      sep24: '7.100',
      oct29: '6.830',
      status: 'improved',
      resultId: 'leucocitos',
    },
    {
      param: 'Plaquetas',
      unit: '/mm³',
      refRange: '150k a 400k',
      may2026: '178.000',
      sep20: '219.000',
      sep24: '176.000',
      oct29: '196.000',
      status: 'stable',
      resultId: 'plaquetas',
    },

    // Glicemia
    {
      param: 'Glicemia de Jejum',
      unit: 'mg/dL',
      refRange: '70 a 99',
      may2026: '97',
      sep20: '—',
      sep24: '119',
      oct29: '105 (est)',
      status: 'attention',
      resultId: 'glicemia',
    },
    {
      param: 'Hemoglobina Glicada (HbA1c)',
      unit: '%',
      refRange: '< 5,7%',
      may2026: '5,2%',
      sep20: '—',
      sep24: '5,30%',
      oct29: '5,3%',
      status: 'stable',
      resultId: 'hba1c',
    },

    // Função Hepática
    {
      param: 'TGP / ALT',
      unit: 'U/L',
      refRange: '<= 45',
      may2026: '20',
      sep20: '—',
      sep24: '—',
      oct29: '22',
      status: 'stable',
      resultId: 'tgp',
    },
    {
      param: 'TGO / AST',
      unit: 'U/L',
      refRange: '< 38',
      may2026: '38',
      sep20: '—',
      sep24: '—',
      oct29: '19',
      status: 'improved',
      resultId: 'tgo',
    },
    {
      param: 'Bilirrubina Total',
      unit: 'mg/dL',
      refRange: '0,1 a 1,2',
      may2026: '0,77',
      sep20: '—',
      sep24: '—',
      oct29: '0,47',
      status: 'stable',
      resultId: 'bilirrubina',
    },

    // Imunologia / Infecto
    {
      param: 'CD4 Absoluto',
      unit: 'céls/mm³',
      refRange: '> 488',
      may2026: '—',
      sep20: '—',
      sep24: '—',
      oct29: '469 (13,23%)',
      status: 'stable',
      resultId: 'cd4',
    },
    {
      param: 'Carga Viral HIV',
      unit: 'cópias/mL',
      refRange: 'Indetectável',
      may2026: '<50 (2024)',
      sep20: '—',
      sep24: '—',
      oct29: '129',
      status: 'stable',
      resultId: 'cargaviral',
    },

    // Hormonal & Próstata (Dr. Arthur Valdier - HGeJF / Bloco 5)
    {
      param: 'Estradiol (E2)',
      unit: 'pg/mL',
      refRange: '10 a 33,1',
      may2026: '86,3 (Elevado)',
      sep20: '—',
      sep24: '—',
      oct29: '—',
      status: 'attention',
      resultId: 'estradiol',
    },
    {
      param: 'PSA Total',
      unit: 'ng/mL',
      refRange: '< 3,5',
      may2026: '0,61',
      sep20: '—',
      sep24: '—',
      oct29: '—',
      status: 'stable',
      resultId: 'psa-total',
    },
    {
      param: 'Testosterona Total',
      unit: 'ng/dL',
      refRange: '220,9 a 715,8',
      may2026: '—',
      sep20: '—',
      sep24: '—',
      oct29: '425,0',
      status: 'stable',
      resultId: 'testosterona',
    },
  ];

  const handleRowClick = (resultId?: string) => {
    if (!resultId) return;
    const res = labResults.find((r) => r.id === resultId);
    if (res) onSelectResult(res);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <div className="text-xs font-semibold text-indigo-800 uppercase tracking-wider flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-indigo-700" />
            Quadro Comparativo de Evolução Temporal
          </div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight mt-0.5">
            Evolução dos Marcadores Clínicos (Maio a Outubro de 2026)
          </h3>
          <p className="text-xs text-slate-500">
            Comparação longitudinal entre a saúde basal, a internação na Santa Casa e o pré-operatório do HNMD.
          </p>
        </div>

        <div className="text-xs text-slate-500">
          Clique em qualquer linha para abrir a folha do laudo correspondente
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-slate-200 rounded-lg">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-100/80 text-slate-700 border-b border-slate-200 font-semibold">
              <th className="py-2.5 px-3">Parâmetro</th>
              <th className="py-2.5 px-3 text-slate-500">Referência</th>
              <th className="py-2.5 px-3 font-mono text-center">
                20/05/2026
                <span className="block text-[10px] text-slate-500 font-sans font-normal">HGeJF (Exército)</span>
              </th>
              <th className="py-2.5 px-3 font-mono text-center">
                20/09/2026
                <span className="block text-[10px] text-slate-500 font-sans font-normal">Admissão Santa Casa</span>
              </th>
              <th className="py-2.5 px-3 font-mono text-center">
                24/09/2026
                <span className="block text-[10px] text-slate-500 font-sans font-normal">Controle Santa Casa</span>
              </th>
              <th className="py-2.5 px-3 font-mono text-center bg-cyan-50/70 text-cyan-950 font-bold border-l border-cyan-200">
                29/10/2026
                <span className="block text-[10px] text-cyan-800 font-sans font-normal">Carlos Chagas (HNMD)</span>
              </th>
              <th className="py-2.5 px-3 text-right">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-800">
            {rows.map((row, idx) => (
              <tr
                key={idx}
                onClick={() => handleRowClick(row.resultId)}
                className="hover:bg-slate-50/80 cursor-pointer transition-colors"
              >
                <td className="py-2.5 px-3 font-medium text-slate-900">
                  {row.param}
                  <span className="text-slate-400 font-normal ml-1">({row.unit})</span>
                </td>
                <td className="py-2.5 px-3 text-slate-500 font-mono text-[11px]">
                  {row.refRange}
                </td>
                <td className="py-2.5 px-3 font-mono text-center tabular-nums text-slate-600">
                  {row.may2026}
                </td>
                <td className="py-2.5 px-3 font-mono text-center tabular-nums text-slate-600">
                  {row.sep20}
                </td>
                <td className="py-2.5 px-3 font-mono text-center tabular-nums text-slate-600">
                  {row.sep24}
                </td>
                <td className="py-2.5 px-3 font-mono text-center tabular-nums font-bold text-slate-900 bg-cyan-50/40 border-l border-cyan-100">
                  {row.oct29}
                </td>
                <td className="py-2.5 px-3 text-right">
                  <span className="inline-flex items-center gap-1 text-[11px] text-cyan-800 hover:text-cyan-950 font-medium">
                    <FileText className="w-3 h-3" />
                    Ver
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-1">
        <span className="flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          Função renal e enzimas hepáticas preservadas no pré-operatório
        </span>
        <span>Amostras conferidas e assinadas eletronicamente</span>
      </div>
    </div>
  );
};
