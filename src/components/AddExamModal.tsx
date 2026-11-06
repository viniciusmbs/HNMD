import React, { useState, useRef } from 'react';
import {
  X,
  Upload,
  FileText,
  Sparkles,
  CheckCircle2,
  Folder,
  AlertCircle,
  FileUp,
  RefreshCw,
  Clock,
  Building,
  User,
  ShieldCheck,
  Tag,
} from 'lucide-react';
import { LabResultItem, PhysicalFolderItem } from '../types/medical';
import {
  analyzeUploadedExamFile,
  ExamAnalysisResult,
  fileToBase64,
} from '../services/examAnalyzer';

interface AddExamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddExam: (newExam: LabResultItem, newFolderItem?: PhysicalFolderItem) => void;
  nextItemNumber?: number;
}

export const AddExamModal: React.FC<AddExamModalProps> = ({
  isOpen,
  onClose,
  onAddExam,
  nextItemNumber = 19,
}) => {
  // File state
  const [file, setFile] = useState<File | null>(null);
  const [fileDataUrl, setFileDataUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<ExamAnalysisResult | null>(null);

  // Form fields
  const [paramName, setParamName] = useState('');
  const [category, setCategory] = useState<LabResultItem['category']>('Hematologia');
  const [currentValue, setCurrentValue] = useState('');
  const [unit, setUnit] = useState('');
  const [referenceRange, setReferenceRange] = useState('');
  const [laboratory, setLaboratory] = useState('Laboratório Carlos Chagas');
  const [doctor, setDoctor] = useState('Dra. Cecília Faria Wolkartt');
  const [collectionDate, setCollectionDate] = useState(() =>
    new Intl.DateTimeFormat('pt-BR').format(new Date())
  );
  const [physicalTab, setPhysicalTab] = useState<1 | 2 | 3 | 4>(3);
  const [itemNumber, setItemNumber] = useState(nextItemNumber);
  const [highlightsText, setHighlightsText] = useState('');
  const [status, setStatus] = useState<LabResultItem['status']>('normal');
  const [isSuccess, setIsSuccess] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleProcessFile = async (uploadedFile: File) => {
    setFile(uploadedFile);
    setIsAnalyzing(true);
    setAnalysisError(null);
    setAnalysisProgress('Lendo arquivo e decodificando laudo médico...');

    try {
      // Create local preview URL
      const dataUrl = await fileToBase64(uploadedFile);
      setFileDataUrl(dataUrl);

      setAnalysisProgress('Processando com IA médica especializada do HNMD...');

      // Execute AI / heuristic analyzer
      const result = await analyzeUploadedExamFile(uploadedFile);
      setAnalysisResult(result);

      // Pre-fill form fields automatically
      setParamName(result.paramName);
      setCategory(result.category);
      setCurrentValue(result.currentValue);
      setUnit(result.unit);
      setReferenceRange(result.referenceRange);
      setLaboratory(result.laboratory);
      setDoctor(result.doctor);
      setCollectionDate(result.collectionDate);
      setPhysicalTab(result.physicalTab);
      setItemNumber(result.suggestedItemNumber || nextItemNumber);
      setStatus(result.status);
      setHighlightsText(result.highlights.join('\n'));

      setAnalysisProgress('');
    } catch (err: any) {
      console.error('Error analyzing file:', err);
      setAnalysisError('Não foi possível ler o arquivo. Você pode preencher os dados manualmente.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      handleProcessFile(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleProcessFile(e.target.files[0]);
    }
  };

  const handleResetFile = () => {
    setFile(null);
    setFileDataUrl(null);
    setAnalysisResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paramName.trim() || !currentValue.trim()) return;

    const tabNames: Record<1 | 2 | 3 | 4, string> = {
      1: 'Relatórios e Histórico',
      2: 'Risco Cirúrgico e Cardiologia',
      3: 'Infectologia e Exames',
      4: 'Exames de Imagem',
    };

    // 1. Create LabResultItem
    const newResult: LabResultItem = {
      id: `custom-${Date.now()}`,
      paramName: paramName.trim(),
      category,
      currentValue: currentValue.trim(),
      unit: unit.trim(),
      referenceRange: referenceRange.trim() || 'Conforme padrão laboratorial',
      status,
      collectionDate,
      doctor: doctor.trim(),
      laboratory: laboratory.trim(),
      physicalLocation: {
        tab: `Aba ${physicalTab}`,
        page: `Folha 01/01 (Item ${itemNumber})`,
        itemNumber,
      },
      previewImage: fileDataUrl || '/assets/rendered/lab_carlos_chagas_cecilia_9p_p01.png',
      pdfPath: fileDataUrl || '/assets/aistudio/11_Protocolo_de_Resultados_de_Exames_Laboratoriais__ceilia_f5c95ee4.pdf',
    };

    // 2. Create PhysicalFolderItem for immediate appearance in 4-Tab folder
    const highlights = highlightsText
      .split('\n')
      .map((h) => h.trim())
      .filter((h) => h.length > 0);

    const newFolderItem: PhysicalFolderItem = {
      itemNumber,
      tab: physicalTab,
      tabName: tabNames[physicalTab],
      title: paramName.trim(),
      subtitle: `${laboratory.trim()} · ${doctor.trim()} (Laudo Novo Digitalizado)`,
      date: collectionDate,
      institution: laboratory.trim(),
      doctor: doctor.trim(),
      highlights:
        highlights.length > 0
          ? highlights
          : [
              `Resultado: ${currentValue.trim()} ${unit.trim()}`,
              `Referência: ${referenceRange.trim() || 'Normal'}`,
              'Laudo original digitalizado arquivado no prontuário do paciente',
            ],
      pageCount: 1,
      previewImages: [fileDataUrl || '/assets/rendered/lab_carlos_chagas_cecilia_9p_p01.png'],
      pdfPath: fileDataUrl || '/assets/aistudio/11_Protocolo_de_Resultados_de_Exames_Laboratoriais__ceilia_f5c95ee4.pdf',
    };

    onAddExam(newResult, newFolderItem);
    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      handleResetFile();
      setParamName('');
      setCurrentValue('');
      setUnit('');
      setHighlightsText('');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in duration-150 my-auto max-h-[92vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          title="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold shadow-xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span>Adicionar Exame com Preenchimento Automático</span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-teal-50 text-teal-800 border border-teal-200 px-2 py-0.5 rounded-full">
                IA HNMD
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              Basta soltar o PDF ou imagem: o sistema identifica o exame, preenche os dados e indica a aba na pasta física.
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto flex-1 pt-4 space-y-4 pr-1">
          {isSuccess ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h4 className="text-base font-bold text-slate-900">
                Exame Indexado com Sucesso!
              </h4>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                O exame <strong>&quot;{paramName}&quot;</strong> foi adicionado ao prontuário digital e catalogado na{' '}
                <strong>Aba {physicalTab} (Item {itemNumber})</strong> da Pasta Física.
              </p>
            </div>
          ) : (
            <>
              {/* Dropzone Area */}
              {!file && (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                    isDragging
                      ? 'border-teal-500 bg-teal-50/70 scale-[0.99]'
                      : 'border-slate-300 hover:border-teal-500 hover:bg-slate-50/80 bg-slate-50/40'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,image/png,image/jpeg,image/jpg,image/webp"
                    className="hidden"
                    onChange={handleFileChange}
                  />

                  <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center mx-auto mb-3 shadow-2xs">
                    <FileUp className="w-6 h-6" />
                  </div>

                  <h4 className="text-sm font-bold text-slate-900">
                    Arraste e solte o laudo em PDF ou Imagem aqui
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    ou clique para selecionar o arquivo do seu computador
                  </p>

                  <div className="inline-flex items-center gap-1.5 mt-3 text-[11px] font-semibold text-teal-800 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
                    <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                    <span>Identifica o tipo de exame, valores, médico e aba na pasta física</span>
                  </div>
                </div>
              )}

              {/* Scanning / Analysis in Progress */}
              {isAnalyzing && (
                <div className="bg-teal-50/80 border border-teal-200 rounded-2xl p-6 text-center space-y-3 animate-pulse">
                  <div className="w-12 h-12 rounded-full bg-teal-600 text-white flex items-center justify-center mx-auto shadow-sm animate-spin">
                    <RefreshCw className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-teal-950">
                      Analisando laudo médico com IA...
                    </h4>
                    <p className="text-xs text-teal-700 mt-0.5">
                      {analysisProgress || 'Extraindo nome do exame, valores, médico e aba de destino...'}
                    </p>
                  </div>
                </div>
              )}

              {/* Auto-fill Confirmation Banner */}
              {analysisResult && !isAnalyzing && (
                <div className="bg-emerald-50/90 border border-emerald-300 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-emerald-950">
                          Laudo Analisado com Sucesso!
                        </span>
                        <span className="text-[10px] font-bold bg-emerald-200 text-emerald-900 px-2 py-0.2 rounded-full font-mono">
                          {analysisResult.confidenceSource === 'gemini-ai'
                            ? 'Gemini 3.8 Flash'
                            : 'Motor Clínico HNMD'}
                        </span>
                      </div>
                      <div className="text-xs text-emerald-800 mt-0.5">
                        Classificado para: <strong>{analysisResult.physicalTabName}</strong> · Sugerido:{' '}
                        <strong>Item {itemNumber}</strong>
                      </div>
                      <div className="text-[11px] text-emerald-700 mt-1 font-mono flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5" />
                        <span className="truncate max-w-[220px] sm:max-w-xs">{file?.name}</span>
                        <span>({file ? (file.size / 1024).toFixed(0) : 0} KB)</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleResetFile}
                    className="text-xs font-semibold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 px-3 py-1.5 rounded-lg transition-colors cursor-pointer shrink-0 self-end sm:self-auto"
                  >
                    Trocar Arquivo
                  </button>
                </div>
              )}

              {/* Form Fields for Review */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* 1. Nome do Exame & Categoria */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nome do Exame / Parâmetro *
                    </label>
                    <input
                      type="text"
                      required
                      value={paramName}
                      onChange={(e) => setParamName(e.target.value)}
                      placeholder="Ex: D-Dímero Quantitativo, Hemograma Completo"
                      className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 bg-white font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Categoria Clínica
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as LabResultItem['category'])}
                      className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 bg-white"
                    >
                      <option value="Hematologia">Hematologia</option>
                      <option value="Coagulação">Coagulação</option>
                      <option value="Renal">Função Renal</option>
                      <option value="Eletrólitos">Eletrólitos</option>
                      <option value="Glicemia">Glicemia</option>
                      <option value="Infectologia">Infectologia / Sorologias</option>
                      <option value="Hepático">Função Hepática</option>
                      <option value="Lipídico">Perfil Lipídico</option>
                      <option value="Urina">EAS / Urina</option>
                      <option value="Imagem/Laudo">Imagem / Laudo Vascular</option>
                      <option value="Cardiologia/Risco">Cardiologia / Risco Cirúrgico</option>
                      <option value="Resumo Clínico">Resumo Clínico / Parecer</option>
                    </select>
                  </div>
                </div>

                {/* 2. Valor Encontrado & Unidade */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Resultado / Valor Encontrado *
                    </label>
                    <input
                      type="text"
                      required
                      value={currentValue}
                      onChange={(e) => setCurrentValue(e.target.value)}
                      placeholder="Ex: 0,35 ou Ritmo sinusal regular"
                      className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 font-semibold text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Unidade
                    </label>
                    <input
                      type="text"
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      placeholder="Ex: mg/L, g/dL, %"
                      className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 font-mono"
                    />
                  </div>
                </div>

                {/* 3. Faixa de Referência & Data */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Intervalo de Referência
                    </label>
                    <input
                      type="text"
                      value={referenceRange}
                      onChange={(e) => setReferenceRange(e.target.value)}
                      placeholder="Ex: Inferior a 0,50 mg/L FEU"
                      className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center justify-between">
                      <span>Data da Realização / Coleta</span>
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                    </label>
                    <input
                      type="text"
                      value={collectionDate}
                      onChange={(e) => setCollectionDate(e.target.value)}
                      placeholder="DD/MM/AAAA"
                      className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 font-mono"
                    />
                  </div>
                </div>

                {/* 4. Laboratório & Médico */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-slate-400" />
                      <span>Laboratório / Hospital</span>
                    </label>
                    <input
                      type="text"
                      value={laboratory}
                      onChange={(e) => setLaboratory(e.target.value)}
                      placeholder="Ex: Laboratório Carlos Chagas"
                      className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>Médico Solicitante / Signatário</span>
                    </label>
                    <input
                      type="text"
                      value={doctor}
                      onChange={(e) => setDoctor(e.target.value)}
                      placeholder="Ex: Dr. Luiz Kingma Lanziotti (Cirurgia Vascular)"
                      className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                {/* 5. Destino na Pasta Física (Onde Colocar) */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <Folder className="w-4 h-4 text-teal-700" />
                      <span>Onde Colocar na Pasta Física de Exames?</span>
                    </div>
                    <span className="text-[11px] font-mono font-bold bg-white text-slate-700 border border-slate-200 px-2.5 py-0.5 rounded-lg shadow-2xs">
                      Item Sugerido: {itemNumber}
                    </span>
                  </div>

                  {/* 4 Abas Selecionáveis */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { tab: 1 as const, name: 'Aba 1', desc: 'Relatórios e Histórico' },
                      { tab: 2 as const, name: 'Aba 2', desc: 'Risco Cirúrgico & Cardio' },
                      { tab: 3 as const, name: 'Aba 3', desc: 'Infectologia & Sangue' },
                      { tab: 4 as const, name: 'Aba 4', desc: 'Imagens e Laudos' },
                    ].map((item) => {
                      const isSelected = physicalTab === item.tab;
                      return (
                        <button
                          key={item.tab}
                          type="button"
                          onClick={() => setPhysicalTab(item.tab)}
                          className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-teal-700 text-white border-teal-800 shadow-xs'
                              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold">{item.name}</span>
                            {isSelected && <ShieldCheck className="w-3.5 h-3.5 text-teal-200" />}
                          </div>
                          <div
                            className={`text-[10px] mt-0.5 leading-tight ${
                              isSelected ? 'text-teal-100' : 'text-slate-500'
                            }`}
                          >
                            {item.desc}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                    <span>Número do Item na Pasta Física:</span>
                    <input
                      type="number"
                      min={1}
                      max={99}
                      value={itemNumber}
                      onChange={(e) => setItemNumber(parseInt(e.target.value, 10) || nextItemNumber)}
                      className="w-20 text-center font-mono font-bold text-xs px-2 py-1 bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                {/* 6. Destaques Clínicos */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Destaques Clínicos / Observações para o HNMD
                  </label>
                  <textarea
                    rows={2}
                    value={highlightsText}
                    onChange={(e) => setHighlightsText(e.target.value)}
                    placeholder="Pontos essenciais para a equipe médica da Cirurgia Vascular do HNMD (1 por linha)"
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 font-sans leading-relaxed"
                  />
                </div>

                {/* Footer Action Buttons */}
                <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 shrink-0">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    className="px-5 py-2.5 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Salvar e Indexar no Prontuário</span>
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
