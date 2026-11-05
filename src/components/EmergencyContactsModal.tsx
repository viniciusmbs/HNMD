import React from 'react';
import { X, Phone, User, Hospital, Shield, MessageCircle } from 'lucide-react';
import { patientData } from '../data/patientData';

interface EmergencyContactsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyContactsModal: React.FC<EmergencyContactsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold tracking-tight">Contatos de Emergência & Apoio</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4 text-xs">
          <div>
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Familiares & Responsáveis Diretos
            </div>
            <div className="space-y-2.5">
              {patientData.contacts.map((c, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between gap-3 hover:border-slate-300 transition-colors"
                >
                  <div className="space-y-0.5">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-cyan-700" />
                      {c.name}
                    </div>
                    <div className="text-slate-500 font-medium">
                      {c.relation} · Juiz de Fora / MG
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <a
                      href={`tel:${c.phone.replace(/\D/g, '')}`}
                      className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-mono font-semibold rounded-md flex items-center gap-1 transition-colors"
                    >
                      <Phone className="w-3 h-3" />
                      Ligar
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Instituições Militares & Regulação
            </div>
            <div className="space-y-2">
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Hospital className="w-3.5 h-3.5 text-cyan-700" />
                    Hospital Naval Marcílio Dias (HNMD)
                  </div>
                  <div className="text-slate-500">Clínica de Cirurgia Vascular / PABX</div>
                </div>
                <a
                  href="tel:2125995599"
                  className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono font-medium rounded-md"
                >
                  (21) 2599-5599
                </a>
              </div>

              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-cyan-700" />
                    Capitania Fluvial de MG (CFMG)
                  </div>
                  <div className="text-slate-500">Regulação Médica / 3º SG Ana Barbazan</div>
                </div>
                <a
                  href="tel:3132772200"
                  className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono font-medium rounded-md"
                >
                  (31) 3277-2200
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center">
          <button
            onClick={onClose}
            className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
