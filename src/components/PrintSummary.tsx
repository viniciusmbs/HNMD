import React from 'react';
import { patientData } from '../data/patientData';
import { medications } from '../data/medications';
import { labResults } from '../data/labResults';

export const PrintSummary: React.FC = () => {
  return (
    <div className="print-only hidden p-8 max-w-4xl mx-auto text-black bg-white font-sans text-xs">
      {/* Header */}
      <div className="border-b-2 border-black pb-3 mb-4 flex justify-between items-start">
        <div>
          <h1 className="text-lg font-bold uppercase tracking-tight">
            Dossiê Clínico e Cirúrgico Vascular — Resumo Executivo
          </h1>
          <div className="text-xs font-semibold">
            Hospital Naval Marcílio Dias (HNMD) · Internação: {patientData.admissionDate}
          </div>
        </div>
        <div className="text-right text-[11px] font-mono">
          <div>Emissão: 05/11/2026</div>
          <div>Origem: {patientData.origin}</div>
        </div>
      </div>

      {/* Patient info */}
      <div className="border border-black p-3 mb-4 space-y-1">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <strong>Paciente:</strong> {patientData.name} (Idade: {patientData.age} anos · Nasc: {patientData.birthDate})
          </div>
          <div>
            <strong>NIP:</strong> {patientData.nip} · <strong>CPF:</strong> {patientData.cpf} · <strong>RG:</strong> {patientData.rg}
          </div>
        </div>
        <div>
          <strong>Diagnóstico:</strong> {patientData.diagnosis}
        </div>
        <div className="text-[11px]">
          <strong>Hábitos / Antecedentes:</strong> {patientData.habits} · {patientData.allergies}
        </div>
        <div className="text-[11px]">
          <strong>Contatos de Emergência:</strong> Esposa Marisa (32) 99116-4611 · Irmão Rogério (32) 98837-8165
        </div>
      </div>

      {/* Exames Principais Pré-Op */}
      <div className="mb-4">
        <h2 className="text-xs font-bold uppercase border-b border-black pb-1 mb-2">
          1. Exames Laboratoriais Pré-Operatórios (Carlos Chagas — 29/10/2026 e Santa Casa)
        </h2>
        <table className="w-full text-left border-collapse text-[11px]">
          <thead>
            <tr className="border-b border-black">
              <th className="py-1">Exame</th>
              <th className="py-1">Resultado Atual</th>
              <th className="py-1">Valor Referência</th>
              <th className="py-1">Coleta / Local</th>
              <th className="py-1">Pasta Física</th>
            </tr>
          </thead>
          <tbody>
            {labResults
              .filter((r) => ['ureia', 'creatinina', 'sodio', 'potassio', 'hemoglobina', 'plaquetas', 'hba1c', 'tap-rni', 'ttpa', 'cd4', 'cargaviral', 'eas'].includes(r.id))
              .map((r) => (
                <tr key={r.id} className="border-b border-gray-200">
                  <td className="py-1 font-semibold">{r.paramName}</td>
                  <td className="py-1 font-bold">{r.currentValue} {r.unit}</td>
                  <td className="py-1">{r.referenceRange}</td>
                  <td className="py-1">{r.collectionDate}</td>
                  <td className="py-1 font-mono">{r.physicalLocation.tab} · {r.physicalLocation.page}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Medicamentos em Uso */}
      <div className="mb-4">
        <h2 className="text-xs font-bold uppercase border-b border-black pb-1 mb-2">
          2. Medicamentos em Uso Recente
        </h2>
        <table className="w-full text-left border-collapse text-[11px]">
          <thead>
            <tr className="border-b border-black">
              <th className="py-1">Medicamento & Dosagem</th>
              <th className="py-1">Posologia / Frequência</th>
              <th className="py-1">Prescritor</th>
              <th className="py-1">Finalidade</th>
            </tr>
          </thead>
          <tbody>
            {medications.map((m) => (
              <tr key={m.id} className="border-b border-gray-200">
                <td className="py-1 font-semibold">{m.name} ({m.dosage})</td>
                <td className="py-1">{m.posology}</td>
                <td className="py-1">{m.prescribedBy.split('(')[0]}</td>
                <td className="py-1 text-[10px]">{m.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Exames de Imagem */}
      <div className="mb-4">
        <h2 className="text-xs font-bold uppercase border-b border-black pb-1 mb-2">
          3. Laudos de Exames de Imagem e Procedimentos
        </h2>
        <ul className="list-disc list-inside space-y-1 text-[11px]">
          <li><strong>Cateterismo Cardíaco CATE 88181 (01/10/2026):</strong> Estudo da circulação coronariana normal. Livre de obstruções (TCE, ADA, ACX e CD dominantes).</li>
          <li><strong>Angiotomografia Aorta Abdominal e MMII (24/09/2026):</strong> Ateromatose aortoilíaca severa com falhas de enchimento em artérias ilíacas externas bilateralmente.</li>
          <li><strong>Eco Color Doppler Arterial MMII D (21/09/2026):</strong> Oclusão da artéria femoral superficial entre 5 cm e 25 cm da prega inguinal.</li>
          <li><strong>Eco Color Doppler Carótidas e Vertebrais (24/09/2026):</strong> Espessamento médio-intimal discreto; fluxos carotídeos e vertebrais dentro da normalidade.</li>
          <li><strong>Parecer Infectológico (Dra. Cecília - 29/10/2026):</strong> Paciente em acompanhamento há mais de 30 anos; atestado expressamente APTO para a cirurgia vascular.</li>
        </ul>
      </div>

      {/* Mídias e Observações */}
      <div className="border-t border-black pt-2 text-[10px] space-y-1">
        <div><strong>Mídias Anexas:</strong> Envelope com 3 CDs (CATE 88181, AngioTC Aorta/MMII, AngioTC Tórax) + Filmes radiológicos impressos.</div>
        <div><strong>Nota sobre Risco Cirúrgico / ECG:</strong> Exames realizados durante a internação na Santa Casa, com laudo impresso aguardando entrega pelo hospital emissor.</div>
      </div>
    </div>
  );
};
