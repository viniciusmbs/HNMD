import React, { useState } from 'react';
import { examImages } from '../data/imageExams';
import { ExamImage } from '../types/medical';
import { Image as ImageIcon, ZoomIn, Heart, Activity, Download, FileText } from 'lucide-react';

interface ImageGalleryViewProps {
  onSelectImage: (image: ExamImage) => void;
  onOpenLaudo?: (laudoPath: string, title: string) => void;
  activeFilter?: 'all' | 'cateterismo' | 'doppler';
}

export const ImageGalleryView: React.FC<ImageGalleryViewProps> = ({
  onSelectImage,
  onOpenLaudo,
  activeFilter: initialFilter = 'all',
}) => {
  const [filter, setFilter] = useState<'all' | 'cateterismo' | 'doppler'>(
    initialFilter === 'comprovante' as any ? 'all' : initialFilter
  );

  const filteredImages = examImages.filter((img) => {
    if (filter === 'all') return true;
    return img.examType === filter;
  });

  return (
    <div className="space-y-6">
      {/* Header & Category Filter */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
              <ImageIcon className="w-4 h-4 text-emerald-700" />
              Galeria de Imagens Médicas & Radiológicas
            </div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight mt-0.5">
              Cateterismo Cardíaco (4 Projeções) e Eco Doppler Vascular (7 Pranchas)
            </h2>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg text-xs font-medium self-start sm:self-center">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                filter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todas ({examImages.length})
            </button>
            <button
              onClick={() => setFilter('cateterismo')}
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
                filter === 'cateterismo'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-rose-600" />
              Cateterismo (4)
            </button>
            <button
              onClick={() => setFilter('doppler')}
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
                filter === 'doppler'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-cyan-700" />
              Doppler MMII (7)
            </button>
          </div>
        </div>

        <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200">
          Todas as imagens foram digitalizadas diretamente das matrizes de alta resolução dos laudos emitidos pela Santa Casa de Misericórdia de Juiz de Fora (CINDI e Hemodinâmica) e do Laboratório Carlos Chagas.
        </div>
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredImages.map((img) => (
          <div
            key={img.id}
            className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between group"
          >
            {/* Image Preview Box */}
            <div
              className="relative aspect-4/3 bg-slate-950 overflow-hidden cursor-pointer"
              onClick={() => onSelectImage(img)}
            >
              <img
                src={img.imagePath}
                alt={img.title}
                className="w-full h-full object-contain group-hover:scale-102 transition-transform duration-200"
              />
              <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold gap-1.5">
                <ZoomIn className="w-5 h-5" />
                Ampliar em Alta Definição
              </div>
              <div className="absolute top-2 left-2 bg-slate-900/85 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                {img.examType === 'cateterismo'
                  ? 'Hemodinâmica / CATE'
                  : img.examType === 'doppler'
                  ? 'Eco Color Doppler'
                  : 'Comprovante Oficial'}
              </div>
            </div>

            {/* Content & Clinical Notes */}
            <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <div className="text-[11px] text-slate-500 font-medium">
                  {img.date} · {img.institution}
                </div>
                <h3 className="text-sm font-bold text-slate-900 tracking-tight mt-0.5">
                  {img.title}
                </h3>
                <div className="text-xs font-semibold text-cyan-900 mt-1">
                  Projeção / Local: {img.projectionOrSite}
                </div>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed bg-slate-50 p-2.5 rounded border border-slate-200/80">
                  {img.clinicalNote}
                </p>
              </div>

              {/* Action buttons */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onSelectImage(img)}
                    className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors flex items-center gap-1.5"
                    title="Ampliar foto do exame"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                    Ver Foto
                  </button>

                  {img.laudoPath && onOpenLaudo && (
                    <button
                      onClick={() => onOpenLaudo(img.laudoPath!, img.laudoTitle || 'Laudo Médico Oficial')}
                      className="px-3 py-1.5 text-xs font-semibold text-cyan-900 bg-cyan-50 hover:bg-cyan-100 border border-cyan-200 rounded-md transition-colors flex items-center gap-1.5"
                      title="Ver laudo médico original assinado"
                    >
                      <FileText className="w-3.5 h-3.5 text-cyan-700" />
                      Ver Laudo
                    </button>
                  )}
                </div>

                <a
                  href={img.imagePath}
                  download
                  className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
                  title="Baixar imagem original em alta definição"
                >
                  <Download className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
