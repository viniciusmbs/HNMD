import React, { useState } from 'react';
import { patientData } from '../data/patientData';
import { labPortals } from '../data/labPortals';
import {
  Calendar,
  Key,
  Phone,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  X,
  ZoomIn,
  Shield,
  HeartPulse,
} from 'lucide-react';

interface PatientSummaryBarProps {
  onOpenCredentials?: () => void;
  onOpenOfficialMessage?: () => void;
}

export const PatientSummaryBar: React.FC<PatientSummaryBarProps> = ({
  onOpenCredentials,
  onOpenOfficialMessage,
}) => {
  const [showContacts, setShowContacts] = useState(false);
  const [showClinicalSummary, setShowClinicalSummary] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  const patientPhotoSrc = '/assets/aistudio/Captura_de_tela_2025-09-23_070510_a083944c.jpg';

  return (
    <>
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          {/* Patient Card Box */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Left: Avatar with Real Photo & Demographics */}
              <div className="flex items-start sm:items-center gap-3.5">
                {/* Clickable Photo Avatar */}
                <button
                  type="button"
                  onClick={() => setShowPhotoModal(true)}
                  className="relative group shrink-0 rounded-full focus:outline-hidden focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 cursor-pointer"
                  title="Clique para ampliar a foto do paciente"
                >
                  <img
                    src={patientPhotoSrc}
                    alt={patientData.name}
                    className="w-13 h-13 rounded-full object-cover border-2 border-slate-200 group-hover:border-cyan-600 transition-all shadow-xs group-hover:scale-105"
                  />
                  <div className="absolute inset-0 rounded-full bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </button>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                      {patientData.name}
                    </h2>
                    <span className="text-[11px] font-semibold bg-cyan-50 text-cyan-800 border border-cyan-200/80 px-2.5 py-0.5 rounded-full">
                      Capitania Fluvial de Minas Gerais (Marinha do Brasil)
                    </span>
                  </div>

                  <div className="text-xs text-slate-600 font-mono mt-0.5">
                    NIP: {patientData.nip} · CPF: {patientData.cpf} · Nasc: {patientData.birthDate} ({patientData.age} anos)
                  </div>
                </div>
              </div>

              {/* Right: Internação HNMD (Acima) + 3 Botões Padronizados (Abaixo) */}
              <div className="flex flex-col sm:items-end gap-2.5 shrink-0">
                {/* Acima: Badge destacada e clicável de Internação HNMD */}
                <button
                  onClick={onOpenOfficialMessage}
                  className="inline-flex items-center gap-2 bg-amber-50/90 hover:bg-amber-100/90 border border-amber-300 rounded-xl px-3 py-1.5 shadow-2xs self-start sm:self-end cursor-pointer transition-all group"
                  title="Clique para abrir a Mensagem Oficial SIGAD-MB e Despacho CFMG (Página 1 e 2)"
                >
                  <Calendar className="w-3.5 h-3.5 text-amber-700 shrink-0 group-hover:scale-110 transition-transform" />
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[11px] font-bold text-amber-950 uppercase tracking-wide">
                      Internação HNMD:
                    </span>
                    <span className="text-xs text-amber-900 font-mono font-semibold underline decoration-amber-400 group-hover:decoration-amber-700">
                      09/11/2026 · 2º Tempo
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-200/60 px-1.5 py-0.2 rounded font-mono">
                    SIGAD-MB
                  </span>
                </button>

                {/* Abaixo: Linha com os 3 botões padronizados (mesma altura, estilo e alinhamento) */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* 1. Botão Contatos de Emergência */}
                  <button
                    onClick={() => setShowContacts(!showContacts)}
                    className={`h-9 px-3.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-2 cursor-pointer shadow-2xs ${
                      showContacts
                        ? 'bg-cyan-700 text-white border-cyan-800 shadow-xs'
                        : 'bg-cyan-50 text-cyan-900 border-cyan-300 hover:bg-cyan-100/90'
                    }`}
                    title="Clique para ver os telefones dos familiares e acompanhantes"
                  >
                    <Phone className="w-4 h-4 text-cyan-700 shrink-0" />
                    <span>Contatos de Emergência ({patientData.contacts.length})</span>
                    {showContacts ? (
                      <ChevronUp className="w-3.5 h-3.5 opacity-80" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 opacity-80" />
                    )}
                  </button>

                  {/* 2. Botão Ver Resumo Clínico */}
                  <button
                    onClick={() => setShowClinicalSummary(!showClinicalSummary)}
                    className={`h-9 px-3.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-2 cursor-pointer shadow-2xs ${
                      showClinicalSummary
                        ? 'bg-slate-800 text-white border-slate-900'
                        : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                    title="Ver resumo de diagnóstico, alergias e regulação"
                  >
                    <span>Ver Resumo Clínico</span>
                    {showClinicalSummary ? (
                      <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    )}
                  </button>

                  {/* 3. Botão Senhas Labs */}
                  <button
                    onClick={onOpenCredentials}
                    className="h-9 px-3.5 rounded-xl text-xs font-semibold bg-yellow-50 text-yellow-950 border border-yellow-300 hover:bg-yellow-100/90 transition-all flex items-center gap-2 cursor-pointer shadow-2xs"
                    title="Ver senhas dos portais online"
                  >
                    <Key className="w-4 h-4 text-yellow-700 shrink-0" />
                    <span>Senhas Labs ({labPortals.length})</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Emergency Contacts Cards Strip */}
            {showContacts && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 animate-in fade-in duration-150">
                {patientData.contacts.map((contact, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-slate-200/90 rounded-xl p-3 flex items-center justify-between hover:border-cyan-300 transition-colors shadow-2xs"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        {contact.relation}: {contact.name}
                      </div>
                      <div className="text-xs font-mono font-medium text-cyan-800 mt-0.5">
                        {contact.phone}
                      </div>
                    </div>

                    <a
                      href={`tel:${contact.phone.replace(/\D/g, '')}`}
                      className="w-8 h-8 rounded-lg bg-cyan-50 hover:bg-cyan-100 text-cyan-800 flex items-center justify-center transition-colors"
                      title={`Ligar para ${contact.name}`}
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                  </div>
                ))}
              </div>
            )}

            {/* Collapsible Clinical Summary */}
            {showClinicalSummary && (
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs animate-in fade-in duration-150">
                <div className="flex items-start gap-2 text-rose-900 font-semibold">
                  <AlertTriangle className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Diagnóstico Vascular Principal:</span> {patientData.diagnosis}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-700 pt-1">
                  <div>
                    <strong className="text-slate-900">Destino de Transferência:</strong> {patientData.destination}
                  </div>
                  <div>
                    <strong className="text-slate-900">Histórico de Hábitos:</strong> {patientData.habits}
                  </div>
                  <div>
                    <strong className="text-slate-900">Alergias Relatadas:</strong> {patientData.allergies}
                  </div>
                  <div>
                    <strong className="text-slate-900">Documento Regulatório:</strong> Mensagem SIGAD-MB P221325Z/OUT/2026 (CFMG)
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox / Modal de Foto Ampliada do Paciente */}
      {showPhotoModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setShowPhotoModal(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-cyan-700" />
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Identificação do Paciente
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowPhotoModal(false)}
                className="w-8 h-8 rounded-lg bg-slate-200/70 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                title="Fechar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Photo Container */}
            <div className="p-4 bg-slate-950 flex items-center justify-center">
              <img
                src={patientPhotoSrc}
                alt={patientData.name}
                className="max-h-[65vh] w-auto object-contain rounded-lg shadow-lg"
              />
            </div>

            {/* Modal Footer with Patient Details */}
            <div className="p-4 bg-white border-t border-slate-100 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900">
                  {patientData.name}
                </h3>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800">
                  {patientData.age} anos
                </span>
              </div>
              <div className="text-xs text-slate-600 font-mono">
                NIP: {patientData.nip} · CPF: {patientData.cpf} · Nasc: {patientData.birthDate}
              </div>
              <div className="text-xs text-slate-500 pt-1 flex items-center gap-1.5">
                <HeartPulse className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span>Oclusão Arterial Aortoilíaca (TASC D) · Regulação HNMD</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
