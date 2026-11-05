import React, { useState } from 'react';
import { X, Github, Check, Copy, ShieldCheck, Terminal, AlertTriangle, ExternalLink } from 'lucide-react';

interface GitHubGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubGuideModal: React.FC<GitHubGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full p-6 space-y-5 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Guia de Publicação: GitHub & Vercel
              </h3>
              <p className="text-xs text-slate-500">
                Como enviar seus exames com total privacidade e sem erros de build
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. Resposta sobre o Sigilo e Repositório Privado */}
        <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Resposta sobre a Privacidade dos Seus Exames:</span>
          </div>
          <p className="text-xs text-emerald-800 leading-relaxed">
            <strong>SIM, é 100% seguro!</strong> Se o seu repositório no GitHub estiver marcado como <strong>Privado (Private)</strong>, ninguém na internet consegue ver os seus arquivos, laudos ou códigos. Nem no Google, nem no seu perfil.
          </p>
          <p className="text-xs text-emerald-800 leading-relaxed">
            O Vercel tem autorização sua para compilar o site e gerar o link. E com a tela de <strong>PIN de Privacidade</strong> que colocamos, mesmo quem tiver o link só verá os exames se digitar o PIN (ex: <strong>1404</strong> ou <strong>HNMD2026</strong>).
          </p>
        </div>

        {/* 2. Como corrigir o erro do Vercel */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Por que deu o erro de build no Vercel e o que já foi corrigido:</span>
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            O erro aconteceu porque o Vite pedia uma versão de <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800">esbuild</code> mais nova do que a que estava no package.json.
            Já deixamos prontos no seu projeto os 3 arquivos fundamentais:
          </p>
          <ul className="text-xs text-slate-700 list-disc list-inside space-y-1 pl-1">
            <li><strong>package.json</strong>: Conflito de esbuild removido.</li>
            <li><strong>.npmrc</strong>: Configurado com <code className="bg-slate-100 px-1 rounded">legacy-peer-deps=true</code>.</li>
            <li><strong>vercel.json</strong>: Comando de instalação configurado com <code className="bg-slate-100 px-1 rounded">npm install --legacy-peer-deps</code>.</li>
          </ul>
        </div>

        {/* 3. Comandos para Atualizar o GitHub */}
        <div className="space-y-2">
          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <Terminal className="w-4 h-4 text-slate-700" />
            <span>Passo a Passo para Subir no seu Terminal:</span>
          </h4>

          <div className="bg-slate-950 rounded-xl p-4 text-slate-200 font-mono text-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-400"># 1. Adicionar todos os arquivos novos e laudos:</span>
              <button
                onClick={() => handleCopy('git add .', 'cmd1')}
                className="text-slate-400 hover:text-white p-1"
                title="Copiar comando"
              >
                {copiedCmd === 'cmd1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <div className="text-cyan-400 font-bold select-all">git add .</div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-slate-400"># 2. Criar o commit das atualizações:</span>
              <button
                onClick={() => handleCopy('git commit -m "feat: prontuario digital vascular completo"', 'cmd2')}
                className="text-slate-400 hover:text-white p-1"
                title="Copiar comando"
              >
                {copiedCmd === 'cmd2' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <div className="text-cyan-400 font-bold select-all">git commit -m &quot;feat: prontuario digital vascular completo&quot;</div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-slate-400"># 3. Enviar para a branch principal (main):</span>
              <button
                onClick={() => handleCopy('git push origin main', 'cmd3')}
                className="text-slate-400 hover:text-white p-1"
                title="Copiar comando"
              >
                {copiedCmd === 'cmd3' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <div className="text-cyan-400 font-bold select-all">git push origin main</div>
          </div>
        </div>

        {/* 4. Dica no Vercel */}
        <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-xs text-slate-700 space-y-1">
          <div className="font-bold text-slate-900">Se preferir ajustar direto no site do Vercel:</div>
          <p>
            Vá em <strong>Settings &gt; General &gt; Build &amp; Development Settings</strong>, marque <strong>Override</strong> no <strong>Install Command</strong> e digite:
            <code className="bg-white px-2 py-0.5 rounded border border-slate-300 ml-1 font-mono font-bold text-slate-900">npm install --legacy-peer-deps</code>.
          </p>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Entendido, Fechar Guia
          </button>
        </div>
      </div>
    </div>
  );
};
