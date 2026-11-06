import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Download,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ArrowUp,
  RotateCcw,
} from 'lucide-react';

interface DocumentViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  pages: string[];
  initialPage?: number;
  pdfPath?: string;
  doctor?: string;
  date?: string;
  location?: string;
}

export const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  pages,
  initialPage = 0,
  pdfPath,
  doctor,
  date,
  location,
}) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(initialPage);
  const [zoomLevel, setZoomLevel] = useState(1.25);
  const [rotation, setRotation] = useState(0);
  const [invertContrast, setInvertContrast] = useState(false);
  const [scrolledDown, setScrolledDown] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setCurrentPageIndex(Math.min(Math.max(0, initialPage), Math.max(0, pages.length - 1)));
      setZoomLevel(1.25);
      setRotation(0);
      setInvertContrast(false);
      setScrolledDown(false);
    }
  }, [isOpen, initialPage, pages]);

  // When changing page, scroll back to the top of the document immediately
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      setScrolledDown(false);
    }
  }, [currentPageIndex]);

  if (!isOpen || pages.length === 0) return null;

  const currentImage = pages[currentPageIndex] || pages[0];

  const handleNextPage = () => {
    if (currentPageIndex < pages.length - 1) {
      setCurrentPageIndex((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex((prev) => prev - 1);
    }
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setRotation(0);
    setInvertContrast(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleZoomIn = () => {
    // 10% steps so 100% smoothly goes to 110%, 120%, 130% instead of jumping straight to 125%
    setZoomLevel((z) => Math.min(3, +(z + 0.10).toFixed(2)));
  };

  const handleZoomOut = () => {
    // 10% steps so it smoothly reduces
    setZoomLevel((z) => Math.max(0.60, +(z - 0.10).toFixed(2)));
  };

  const handleSetExactZoom = (level: number) => {
    setZoomLevel(level);
  };

  const handleScrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isZoomed = zoomLevel > 1;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-6xl h-[95vh] flex flex-col overflow-hidden shadow-2xl relative">
        {/* Top Header Bar - Always Fixed, never scrolls or gets cut */}
        <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-white shrink-0 z-20">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold text-cyan-300 bg-cyan-950/80 border border-cyan-700 px-2.5 py-0.5 rounded-full shrink-0">
                Pág {currentPageIndex + 1} de {pages.length}
              </span>
              <h3 className="text-sm sm:text-base font-bold text-white truncate">
                {title}
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-x-2 text-xs text-slate-400 pt-0.5">
              {subtitle && <span>{subtitle}</span>}
              {doctor && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-slate-300">{doctor}</span>
                </>
              )}
              {date && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-slate-300">{date}</span>
                </>
              )}
              {location && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-teal-400 font-medium">{location}</span>
                </>
              )}
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-1.5 shrink-0 flex-wrap">
            {/* Zoom Controls with 10% steps */}
            <div className="flex items-center bg-slate-900 border border-slate-700 rounded-lg p-0.5 shadow-2xs">
              <button
                onClick={handleZoomOut}
                disabled={zoomLevel <= 0.60}
                className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-transparent rounded-md transition-colors cursor-pointer"
                title="Reduzir zoom (-10%)"
              >
                <ZoomOut className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleSetExactZoom(1)}
                className={`text-xs font-mono font-semibold min-w-[50px] text-center px-1.5 py-1 rounded transition-colors ${
                  zoomLevel === 1 ? 'text-cyan-300 bg-slate-800 font-bold' : 'text-slate-300 hover:text-white'
                }`}
                title="Clique para voltar a 100%"
              >
                {Math.round(zoomLevel * 100)}%
              </button>

              <button
                onClick={handleZoomIn}
                disabled={zoomLevel >= 3}
                className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-transparent rounded-md transition-colors cursor-pointer"
                title="Aumentar zoom (+10%)"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            {/* Quick 100% & 125% Buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleSetExactZoom(1)}
                className={`px-2 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                  zoomLevel === 1
                    ? 'bg-cyan-950 text-cyan-300 border-cyan-700 font-bold'
                    : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-white'
                }`}
                title="Fixar em 100%"
              >
                100%
              </button>
              <button
                onClick={() => handleSetExactZoom(1.25)}
                className={`px-2 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                  zoomLevel === 1.25
                    ? 'bg-cyan-950 text-cyan-300 border-cyan-700 font-bold'
                    : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-white'
                }`}
                title="Fixar em 125%"
              >
                125%
              </button>
            </div>

            {/* Fit to screen button */}
            <button
              onClick={handleResetZoom}
              className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer flex items-center gap-1 ${
                zoomLevel === 1 && rotation === 0
                  ? 'bg-slate-800 text-cyan-300 border-slate-700'
                  : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-white'
              }`}
              title="Ajustar à tela"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ajustar</span>
            </button>

            {/* Rotate */}
            <button
              onClick={handleRotate}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700 bg-slate-900 rounded-lg transition-colors cursor-pointer"
              title="Girar 90 graus"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            {/* Invert contrast */}
            <button
              onClick={() => setInvertContrast((c) => !c)}
              className={`px-2 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer hidden sm:block ${
                invertContrast
                  ? 'bg-cyan-700 text-white border-cyan-600'
                  : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-white'
              }`}
              title="Inverter contraste (radiologia)"
            >
              Negativo
            </button>

            {/* Download PDF button */}
            {pdfPath && (
              <a
                href={pdfPath}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="px-2.5 py-1.5 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-600 border border-teal-600 rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs"
                title="Abrir ou baixar arquivo PDF original assinado"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden md:inline">PDF Original</span>
              </a>
            )}

            {/* Close button */}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-rose-900/60 hover:text-rose-200 border border-transparent hover:border-rose-700/60 rounded-lg transition-colors ml-1 cursor-pointer"
              title="Fechar janela (ESC)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Viewport Area - Guaranteed full vertical scroll without cutting the top */}
        <div
          ref={scrollContainerRef}
          onScroll={(e) => {
            const top = (e.target as HTMLDivElement).scrollTop;
            setScrolledDown(top > 120);
          }}
          className="flex-1 bg-slate-950/95 overflow-auto relative select-none scroll-smooth p-4 sm:p-6"
        >
          {/* Inner centering wrapper: switches to items-start on zoom so top is never lost */}
          <div
            className={`min-w-full min-h-full flex justify-center ${
              isZoomed ? 'items-start pt-2' : 'items-center'
            }`}
          >
            <div
              style={{
                transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
                transformOrigin: isZoomed ? 'top center' : 'center center',
                filter: invertContrast ? 'invert(1) hue-rotate(180deg)' : 'none',
                marginBottom: isZoomed ? `${Math.max(10, (zoomLevel - 1) * 85)}vh` : 0,
              }}
              className="transition-transform duration-150 ease-out flex items-center justify-center will-change-transform"
            >
              <img
                src={currentImage}
                alt={`${title} - Página ${currentPageIndex + 1}`}
                className="w-auto max-w-full object-contain rounded-md shadow-2xl bg-white select-none"
                style={{
                  maxHeight: isZoomed ? 'none' : '76vh',
                }}
              />
            </div>
          </div>

          {/* Floating 'Voltar ao Topo do Cabeçalho' button when zoomed in and scrolled */}
          {isZoomed && scrolledDown && (
            <button
              onClick={handleScrollToTop}
              className="fixed bottom-16 right-8 z-30 px-3 py-1.5 bg-slate-900/90 text-cyan-300 border border-cyan-500/50 rounded-full text-xs font-semibold shadow-xl hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer backdrop-blur-xs transition-all animate-in fade-in"
              title="Rolar até o cabeçalho do exame"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Topo do Laudo</span>
            </button>
          )}

          {/* Navigation Arrows for multi-page documents */}
          {pages.length > 1 && (
            <>
              <button
                onClick={handlePrevPage}
                disabled={currentPageIndex === 0}
                className="fixed left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/85 hover:bg-slate-800 text-white disabled:opacity-20 disabled:pointer-events-none transition-all shadow-2xl border border-slate-700/80 cursor-pointer z-20"
                title="Página anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handleNextPage}
                disabled={currentPageIndex === pages.length - 1}
                className="fixed right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/85 hover:bg-slate-800 text-white disabled:opacity-20 disabled:pointer-events-none transition-all shadow-2xl border border-slate-700/80 cursor-pointer z-20"
                title="Próxima página"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* Bottom Pagination Strip (if multi-page) - Always Fixed */}
        {pages.length > 1 && (
          <div className="px-4 py-2 bg-slate-950 border-t border-slate-800 flex items-center justify-center gap-1.5 overflow-x-auto text-xs shrink-0 z-20">
            <span className="text-slate-400 font-semibold mr-1.5 text-[11px]">
              Folhas ({pages.length}):
            </span>
            {pages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPageIndex(idx)}
                className={`px-3 py-1 rounded-lg font-mono text-xs transition-all cursor-pointer ${
                  currentPageIndex === idx
                    ? 'bg-cyan-700 text-white font-bold shadow-xs border border-cyan-500'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
                }`}
              >
                Folha {idx + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
