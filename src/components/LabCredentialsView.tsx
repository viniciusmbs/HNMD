import React, { useState } from 'react';
import { labPortals } from '../data/labPortals';
import { Copy, Check, ExternalLink, Key, Lock, User } from 'lucide-react';

interface LabCredentialsViewProps {
  onViewImage?: (imagePath: string, title: string) => void;
}

export const LabCredentialsView: React.FC<LabCredentialsViewProps> = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-5">
      {/* Cabeçalho direto e sem firula */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <div className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
            <Key className="w-4 h-4 text-amber-700" />
            Senhas dos Portais de Exames
          </div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight mt-0.5">
            Login, Senha e Site de Acesso Direto
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Clique no botão para abrir o site e copie o login e a senha diretamente.
          </p>
        </div>

        <div className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
          {labPortals.length} Portais
        </div>
      </div>

      {/* Grid com apenas Nome, Site, Login e Senha */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {labPortals.map((portal, index) => (
          <div
            key={portal.id}
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all space-y-4"
          >
            {/* Nome do Hospital / Laboratório */}
            <div className="flex items-start gap-2.5">
              <span className="w-6 h-6 rounded-lg bg-slate-900 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {index + 1}
              </span>
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                {portal.name}
              </h3>
            </div>

            {/* Apenas Login e Senha */}
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-2 text-xs">
              {/* Login */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>Login / Usuário:</span>
                </div>
                <div className="flex items-center gap-1.5 font-mono font-bold text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                  <span className="select-all">{portal.login}</span>
                  <button
                    onClick={() => handleCopy(portal.login, `${portal.id}-login`)}
                    className="p-1 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded transition-colors cursor-pointer"
                    title="Copiar login"
                  >
                    {copiedKey === `${portal.id}-login` ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Senha */}
              {portal.password && (
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Senha:</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono font-bold text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                    <span className="select-all">{portal.password}</span>
                    <button
                      onClick={() => handleCopy(portal.password || '', `${portal.id}-pwd`)}
                      className="p-1 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded transition-colors cursor-pointer"
                      title="Copiar senha"
                    >
                      {copiedKey === `${portal.id}-pwd` ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Botão Direto para o Site */}
            <a
              href={portal.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-10 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
            >
              <span>Acessar Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
