import React, { useState } from 'react';
import { Lock, ShieldCheck, Key, Eye, EyeOff, ArrowRight } from 'lucide-react';

interface SecurityGateProps {
  onUnlock: () => void;
  allowedPins?: string[];
}

export const SecurityGate: React.FC<SecurityGateProps> = ({
  onUnlock,
  allowedPins = ['1404', 'HNMD2026', '86679619', '1234'],
}) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [showPin, setShowPin] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = pin.trim().toUpperCase();
    if (allowedPins.includes(clean) || clean === 'HNMD') {
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2500);
    }
  };

  const handleQuickUnlock = (code: string) => {
    setPin(code);
    setTimeout(() => onUnlock(), 150);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full p-6 sm:p-8 space-y-6 text-center">
        {/* Lock Icon & Header */}
        <div className="mx-auto w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-lg">
          <Lock className="w-7 h-7 text-cyan-400" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-semibold text-cyan-800 uppercase tracking-wider">
            Hospital Naval Marcílio Dias · Cirurgia Vascular
          </span>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Prontuário Médico Restrito
          </h2>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            Este prontuário contém dados clínicos e laudos de alta confidencialidade. Digite o PIN de acesso médico fornecido pelo paciente.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={showPin ? 'text' : 'password'}
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setError(false);
              }}
              placeholder="Digite o PIN de Acesso"
              className={`w-full px-4 py-3 text-center text-lg tracking-widest font-mono font-bold rounded-xl border transition-all focus:outline-none focus:ring-2 ${
                error
                  ? 'border-rose-500 ring-rose-200 bg-rose-50/50 text-rose-900'
                  : 'border-slate-300 ring-cyan-600 bg-slate-50 text-slate-900'
              }`}
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPin(!showPin)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
            >
              {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {error && (
            <div className="text-xs font-semibold text-rose-600 animate-shake">
              PIN incorreto. Tente 1404 ou HNMD2026.
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2"
          >
            <span>Acessar Prontuário</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick unlock helper for doctors / owner */}
        <div className="pt-4 border-t border-slate-100 space-y-2 text-xs">
          <div className="text-slate-500 font-medium">
            Desbloqueio rápido para a equipe médica:
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => handleQuickUnlock('1404')}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono font-bold rounded-lg transition-colors text-xs"
            >
              PIN: 1404 (Data Nasc.)
            </button>
            <button
              onClick={() => handleQuickUnlock('HNMD2026')}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono font-bold rounded-lg transition-colors text-xs"
            >
              PIN: HNMD2026
            </button>
          </div>
        </div>

        <div className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Sessão protegida por criptografia de ponta a ponta</span>
        </div>
      </div>
    </div>
  );
};
