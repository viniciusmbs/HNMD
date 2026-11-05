import React from 'react';
import { patientData } from '../data/patientData';
import {
  FileText,
  ShieldAlert,
  Hospital,
  Calendar,
  Heart,
  ShieldCheck,
  Pill,
  ArrowRight,
  ExternalLink,
  Phone,
  CheckCircle2,
  FileCheck,
} from 'lucide-react';

interface ClinicalDossierViewProps {
  onOpenFolder: () => void;
  onOpenChecklist: () => void;
  onOpenOfficialMessage: () => void;
  onOpenCateterismo: () => void;
  onOpenInfecto: () => void;
}

export const ClinicalDossierView: React.FC<ClinicalDossierViewProps> = ({
  onOpenFolder,
  onOpenChecklist,
  onOpenOfficialMessage,
  onOpenCateterismo,
  onOpenInfecto,
}) => {
  return (
    <div className="space-y-6">
      {/* Top Welcome / Dossier Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider bg-teal-50 text-teal-800 border border-teal-200 px-2.5 py-0.5 rounded-full">
                Dossiê Clínico e Cirúrgico Estruturado
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Atualizado para Novembro/2026
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Resumo Clínico Executivo para a Equipe de Cirurgia Vascular do HNMD
            </h2>
            <p className="text-xs text-slate-600 max-w-3xl leading-relaxed">
              Dossiê completo elaborado para admissão hospitalar em <strong>09/11/2026 (Segundo Tempo)</strong> no Hospital Naval Marcílio Dias. Reúne o histórico detalhado de 20 dias de internação na Santa Casa, a avaliação hemodinâmica coronariana, o parecer infectológico com carga viral e imunologia atualizadas e o checklist pré-operatório da Marinha do Brasil.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={onOpenFolder}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
            >
              <span>Abrir Pasta Física (18 Itens)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onOpenChecklist}
              className="px-3.5 py-2 text-xs font-semibold text-teal-900 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <span>Checklist HNMD (9 de 10)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 3 Pillars Grid: Vascular, Hemodinâmica e Infectologia */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
          {/* Pillar 1: Diagnóstico Vascular */}
          <div className="bg-rose-50/70 border border-rose-200/90 rounded-xl p-4 flex flex-col justify-between space-y-2">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800">
                <ShieldAlert className="w-4 h-4 text-rose-700" />
                <span>Diagnóstico Vascular</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 mt-1 leading-snug">
                Oclusão Aortoilíaca & Femoral
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                CID I70.2. Claudicação grave com dor em repouso e ausência de pulsos femorais. Eco Doppler evidenciando oclusão de femoral superficial entre 5 cm e 25 cm.
              </p>
            </div>
            <div className="text-[11px] font-semibold text-rose-900 pt-2 border-t border-rose-200/60">
              Indicação cirúrgica prioritária
            </div>
          </div>

          {/* Pillar 2: Coronárias Livres */}
          <div
            onClick={onOpenCateterismo}
            className="bg-emerald-50/70 border border-emerald-200/90 rounded-xl p-4 flex flex-col justify-between space-y-2 cursor-pointer hover:border-emerald-300 transition-colors group"
          >
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                <Heart className="w-4 h-4 text-emerald-700" />
                <span>Hemodinâmica (CATE 88181)</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 mt-1 leading-snug">
                Coronárias 100% Livres
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Cateterismo em 01/10/2026 pelo Dr. Antonio Muniz. Tronco, ADA, Circunflexa e CD anatômicas e totalmente isentas de estenose obstrutiva.
              </p>
            </div>
            <div className="text-[11px] font-semibold text-emerald-900 group-hover:underline pt-2 border-t border-emerald-200/60 flex items-center justify-between">
              <span>Ver laudo e 4 fotos</span>
              <ExternalLink className="w-3.5 h-3.5 text-emerald-700" />
            </div>
          </div>

          {/* Pillar 3: Infectologia & Imunologia */}
          <div
            onClick={onOpenInfecto}
            className="bg-cyan-50/70 border border-cyan-200/90 rounded-xl p-4 flex flex-col justify-between space-y-2 cursor-pointer hover:border-cyan-300 transition-colors group"
          >
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-800">
                <ShieldCheck className="w-4 h-4 text-cyan-700" />
                <span>Infectologia (29/10/2026)</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 mt-1 leading-snug">
                Paciente Plenamente Apto
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Acompanhamento há &gt;30 anos. CD4: 469 céls/mm³ (13,23%) e Carga Viral: 129 cópias/mL. Sem interações com medicamentos vasculares.
              </p>
            </div>
            <div className="text-[11px] font-semibold text-cyan-900 group-hover:underline pt-2 border-t border-cyan-200/60 flex items-center justify-between">
              <span>Ver parecer da Dra. Cecília</span>
              <ExternalLink className="w-3.5 h-3.5 text-cyan-700" />
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Clinical Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): History & Clinical Timeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* History of Hospitalization */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <Hospital className="w-4 h-4 text-cyan-700" />
              <span>Histórico da Internação de 20 Dias (Santa Casa de Misericórdia)</span>
            </div>

            <div className="text-xs text-slate-600 space-y-2 leading-relaxed">
              <p>
                O paciente <strong>Vinícius Paes Mendes Pereira</strong> deu entrada na Santa Casa de Misericórdia de Juiz de Fora em <strong>20/09/2026</strong> apresentando lesão trófica incipiente no hálux direito, queimação, dor isquêmica em repouso e claudicação intermitente severa para curtas distâncias (&lt; 20 metros).
              </p>
              <p>
                Durante os 20 dias de internação na Unidade de Internação do 8º Andar (Leito 8017ENF), sob os cuidados do cirurgião vascular <strong>Dr. Luiz Kingma Lanziotti</strong> e do <strong>Dr. Lucas Klier Silva</strong>, foram realizados:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-700">
                <li>
                  <strong>Eco Color Doppler Arterial de MMII:</strong> evidenciou placas ateroscleróticas fibrocalcificadas e oclusão extensa da artéria femoral superficial entre 5 cm e 25 cm da prega inguinal, com padrão de fluxo monofásico pós-obstrutivo distal.
                </li>
                <li>
                  <strong>Angiotomografia de Aorta Abdominal e MMII (Ultrimagem):</strong> confirmou ateromatose aortoilíaca severa com falhas acentuadas de enchimento nas artérias ilíacas externas bilateralmente.
                </li>
                <li>
                  <strong>Eco Doppler de Carótidas e Vertebrais:</strong> fluxo carotídeo e vertebral sem estenoses hemodinamicamente significativas.
                </li>
                <li>
                  <strong>Cateterismo Cardíaco Radial (CATE 88181):</strong> estudo coronariano anatomico normal, assegurando excelente reserva miocárdica para o procedimento vascular.
                </li>
              </ul>
              <p>
                Teve alta melhorado em <strong>10/10/2026</strong> com indicação formal de transferência para o Hospital Naval Marcílio Dias (HNMD) para procedimento de revascularização vascular de alta complexidade.
              </p>
            </div>
          </div>

          {/* Current Pharmacological Therapy */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <Pill className="w-4 h-4 text-rose-600" />
              <span>Esquema Farmacológico Atual em Uso Contínuo</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              {/* Vascular */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-1.5 py-0.5 rounded">
                  Cirurgia Vascular
                </span>
                <h4 className="text-xs font-bold text-slate-900 mt-1">
                  AAS 100mg + Cilostazol 50mg
                </h4>
                <p className="text-[11px] text-slate-600">
                  Prescrito pelo Dr. Luiz Kingma. 1 comprimido de AAS após o almoço e Cilostazol 12/12h.
                </p>
              </div>

              {/* Analgesia */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded">
                  Analgesia & Relaxamento
                </span>
                <h4 className="text-xs font-bold text-slate-900 mt-1">
                  Tramadol 37,5mg + Baclofeno 10mg
                </h4>
                <p className="text-[11px] text-slate-600">
                  Prescrito pelo Maj. Túlio (HGeJF). Alívio da dor isquêmica e controle do espasmo muscular.
                </p>
              </div>

              {/* TARV */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-800 bg-cyan-50 px-1.5 py-0.5 rounded">
                  Antirretroviral (SICLOM)
                </span>
                <h4 className="text-xs font-bold text-slate-900 mt-1">
                  Darunavir + Dolutegravir + Ritonavir
                </h4>
                <p className="text-[11px] text-slate-600">
                  Prescrito pela Dra. Cecília Wolkartt. Regime contínuo e estável há décadas.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (1 Col): Key Contacts & Admission Checklist Quick Reference */}
        <div className="space-y-6">
          {/* Quick Readiness Box */}
          <div className="bg-[#0a2540] rounded-2xl p-5 text-white shadow-xs space-y-3">
            <div className="text-[11px] uppercase tracking-wider font-semibold text-teal-300">
              Prontidão Operatória HNMD
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">9 / 10</span>
              <span className="text-xs text-slate-300">Exigências Concluídas</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Hemograma, Coagulograma, Eletrólitos (Na/K), Ureia, Creatinina, Glicemia, EAS e Imagens completas. Pendente apenas a emissão do laudo formal do ECG pela Santa Casa.
            </p>
            <div className="pt-1 flex flex-col gap-2">
              <button
                onClick={onOpenChecklist}
                className="w-full py-2 px-3 text-xs font-semibold text-teal-950 bg-teal-400 hover:bg-teal-300 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
              >
                <span>Visualizar Checklist Completo (9 de 10)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onOpenOfficialMessage}
                className="w-full py-1.5 px-3 text-[11px] font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-slate-700/60"
              >
                <FileText className="w-3.5 h-3.5 text-teal-400" />
                <span>Mensagem SIGAD-MB P221325Z (Despacho CFMG)</span>
              </button>
            </div>
          </div>

          {/* Emergency Contacts Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <Phone className="w-4 h-4 text-cyan-700" />
              <span>Contatos dos Familiares e Acompanhantes</span>
            </div>

            <div className="space-y-2 text-xs">
              {patientData.contacts.map((c, i) => (
                <div
                  key={i}
                  className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-slate-900">
                      {c.relation}: {c.name}
                    </div>
                    <div className="font-mono text-cyan-800 font-medium">{c.phone}</div>
                  </div>
                  <a
                    href={`tel:${c.phone.replace(/\D/g, '')}`}
                    className="p-1.5 bg-cyan-100 hover:bg-cyan-200 text-cyan-900 rounded-md transition-colors"
                    title={`Ligar para ${c.name}`}
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
