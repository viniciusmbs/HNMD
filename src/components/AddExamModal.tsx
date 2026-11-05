import React, { useState } from 'react';
import { X, Plus, Upload, CheckCircle2 } from 'lucide-react';
import { LabResultItem } from '../types/medical';

interface AddExamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddExam: (newExam: LabResultItem) => void;
}

export const AddExamModal: React.FC<AddExamModalProps> = ({
  isOpen,
  onClose,
  onAddExam,
}) => {
  const [paramName, setParamName] = useState('');
  const [category, setCategory] = useState<LabResultItem['category']>('Hematologia');
  const [currentValue, setCurrentValue] = useState('');
  const [unit, setUnit] = useState('');
  const [referenceRange, setReferenceRange] = useState('');
  const [laboratory, setLaboratory] = useState('Laboratório Carlos Chagas');
  const [doctor, setDoctor] = useState('Dra. Cecília Faria Wolkartt');
  const [collectionDate, setCollectionDate] = useState('04/11/2026');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paramName.trim() || !currentValue.trim()) return;

    const newResult: LabResultItem = {
      id: `custom-${Date.now()}`,
      paramName: paramName.trim(),
      category,
      currentValue: currentValue.trim(),
      unit: unit.trim(),
      referenceRange: referenceRange.trim() || 'Conforme referência laboratorial',
      status: 'normal',
      collectionDate,
      doctor,
      laboratory,
      physicalLocation: {
        tab: 'Aba 3',
        page: 'Página Adicional',
        itemNumber: 11,
      },
      previewImage: '/assets/rendered/lab_carlos_chagas_cecilia_9p_p01.png',
      pdfPath: '/assets/aistudio/11_Protocolo_de_Resultados_de_Exames_Laboratoriais__ceilia_f5c95ee4.pdf',
    };

    onAddExam(newResult);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      setParamName('');
      setCurrentValue('');
      setUnit('');
      setNotes('');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in duration-150">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 font-bold">
            <Plus className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Adicionar Novo Exame ao Prontuário
            </h3>
            <p className="text-xs text-slate-500">
              Registrar novos laudos de sangue, urina ou imagem realizados pelo paciente.
            </p>
          </div>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-2">
            <CheckCircle2 className="w-12 h-12 text-teal-600 mx-auto" />
            <h4 className="text-sm font-bold text-slate-900">Exame Adicionado com Sucesso!</h4>
            <p className="text-xs text-slate-500">O resultado foi indexado no prontuário digital.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nome do Exame / Parâmetro *
              </label>
              <input
                type="text"
                required
                value={paramName}
                onChange={(e) => setParamName(e.target.value)}
                placeholder="Ex: D-Dímero, PCR Ultrassensível, Eletrocardiograma"
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Categoria
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as LabResultItem['category'])}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500 bg-white"
                >
                  <option value="Hematologia">Hematologia</option>
                  <option value="Coagulação">Coagulação</option>
                  <option value="Renal">Função Renal</option>
                  <option value="Eletrólitos">Eletrólitos</option>
                  <option value="Glicemia">Glicemia</option>
                  <option value="Infectologia">Infectologia / Imunologia</option>
                  <option value="Hepático">Função Hepática</option>
                  <option value="Lipídico">Perfil Lipídico</option>
                  <option value="Urina">EAS / Urina</option>
                  <option value="Imagem/Laudo">Imagem / Laudo</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Data da Coleta
                </label>
                <input
                  type="text"
                  value={collectionDate}
                  onChange={(e) => setCollectionDate(e.target.value)}
                  placeholder="DD/MM/AAAA"
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Valor Encontrado *
                </label>
                <input
                  type="text"
                  required
                  value={currentValue}
                  onChange={(e) => setCurrentValue(e.target.value)}
                  placeholder="Ex: 0,45 ou Normal"
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Unidade de Medida
                </label>
                <input
                  type="text"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  placeholder="Ex: mg/L, g/dL, %"
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Laboratório / Hospital
                </label>
                <input
                  type="text"
                  value={laboratory}
                  onChange={(e) => setLaboratory(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Médico Solicitante
                </label>
                <input
                  type="text"
                  value={doctor}
                  onChange={(e) => setDoctor(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Intervalo de Referência
              </label>
              <input
                type="text"
                value={referenceRange}
                onChange={(e) => setReferenceRange(e.target.value)}
                placeholder="Ex: Menor que 0,50 mg/L"
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Observações Clínicas
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ex: Laudo impresso guardado na pasta física para apresentação no HNMD."
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                Salvar Exame
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
