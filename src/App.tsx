import React, { useState } from 'react';
import { Header, AppNavView } from './components/Header';
import { StickyNavigationBar } from './components/StickyNavigationBar';
import { PatientSummaryBar } from './components/PatientSummaryBar';
import { ClinicalDossierView } from './components/ClinicalDossierView';
import { QuickSearch } from './components/QuickSearch';
import { HNMDChecklist } from './components/HNMDChecklist';
import { PhysicalFolderNav } from './components/PhysicalFolderNav';
import { ImageGalleryView } from './components/ImageGalleryView';
import { LabCredentialsView } from './components/LabCredentialsView';
import { LabEvolutionTable } from './components/LabEvolutionTable';
import { MedicationPanel } from './components/MedicationPanel';
import { DocumentViewerModal } from './components/DocumentViewerModal';
import { GitHubGuideModal } from './components/GitHubGuideModal';
import { SecurityGate } from './components/SecurityGate';
import { PrintSummary } from './components/PrintSummary';
import { EmergencyContactsModal } from './components/EmergencyContactsModal';
import { AddExamModal } from './components/AddExamModal';
import { FolderDividersModal } from './components/FolderDividersModal';
import { CDsModal } from './components/CDsModal';
import { LabResultItem, PhysicalFolderItem, ExamImage, Medication } from './types/medical';
import { physicalFolderItems } from './data/physicalFolder';
import { labResults } from './data/labResults';
import { Search } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<AppNavView>('dossier');
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [githubGuideOpen, setGithubGuideOpen] = useState(false);
  const [contactsModalOpen, setContactsModalOpen] = useState(false);
  const [addExamModalOpen, setAddExamModalOpen] = useState(false);
  const [cdsModalOpen, setCdsModalOpen] = useState(false);
  const [dividersModal, setDividersModal] = useState<{
    isOpen: boolean;
    type: 'dividers' | 'labels';
  }>({
    isOpen: false,
    type: 'dividers',
  });
  const [folderInitialTab, setFolderInitialTab] = useState<'all' | 1 | 2 | 3 | 4>('all');
  const [imageGalleryFilter, setImageGalleryFilter] = useState<'all' | 'cateterismo' | 'doppler'>('all');

  // Dynamic user-added exams and folder items
  const [customExams, setCustomExams] = useState<LabResultItem[]>([]);
  const [customFolderItems, setCustomFolderItems] = useState<PhysicalFolderItem[]>([]);

  // Modal viewer state
  const [viewerState, setViewerState] = useState<{
    isOpen: boolean;
    title: string;
    subtitle?: string;
    pages: string[];
    initialPage?: number;
    pdfPath?: string;
    doctor?: string;
    date?: string;
    location?: string;
  }>({
    isOpen: false,
    title: '',
    pages: [],
  });

  const handleOpenFolderTab = (tab: 'all' | 1 | 2 | 3 | 4) => {
    setFolderInitialTab(tab);
    setActiveView('folder');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenGallery = (galleryId: string) => {
    if (galleryId === 'cateterismo') setImageGalleryFilter('cateterismo');
    else if (galleryId === 'doppler') setImageGalleryFilter('doppler');
    else setImageGalleryFilter('all');
    setActiveView('images');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenOfficialMessage = () => {
    setViewerState({
      isOpen: true,
      title: 'Mensagem Oficial SIGAD-MB P221325Z & Despacho CFMG (Marinha do Brasil)',
      subtitle: 'Página 1: Mensagem Oficial (ALFA a DELTA) · Página 2: Despacho e-mail 3º SG Ana Barbazan',
      pages: [
        '/assets/rendered/marinha_sigad_mb_p01.png',
        '/assets/rendered/marinha_email_ana_p01.png',
      ],
      initialPage: 0,
      pdfPath: '/assets/aistudio/Procedimento_de_Alta_Complexidade_78074c58.pdf',
      doctor: 'Hospital Naval Marcílio Dias / 3º SG Ana Barbazan (CFMG)',
      date: '22/10/2026 a 26/10/2026',
      location: 'Aba 1 · Item 04 (Documento Oficial)',
    });
  };

  const handleSelectResult = (result: LabResultItem) => {
    // Caso especial: Item 18 (CDs e Mídias)
    if (result.id === 'item-18-cds' || result.physicalLocation.itemNumber === 18) {
      setCdsModalOpen(true);
      return;
    }

    let pages = [result.previewImage];
    let initialPage = 0;

    const itemNum = result.physicalLocation.itemNumber;
    const blockText = `${result.physicalLocation.block || ''} ${result.doctor || ''} ${result.laboratory || ''}`;

    // 1. Exames de Imagem e Relatórios Cirúrgicos Específicos
    if (itemNum === 15 || result.id === 'laudo-doppler-mmii') {
      // Eco Color Doppler Membro Inferior Direito (Folha 1: Laudo CINDI + Folhas 2 a 8: 7 Fotos do exame)
      pages = [
        '/assets/rendered/laudo_doppler_arterial_mmii_p01.png',
        '/assets/aistudio/15._Eco_Color_Doppler_Arterial_de_Membro_Inferior_Direito_imagem_1_e5ea2d00.jpg',
        '/assets/aistudio/15._Eco_Color_Doppler_Arterial_de_Membro_Inferior_Direito_imagem_2_59ecb576.jpg',
        '/assets/aistudio/15._Eco_Color_Doppler_Arterial_de_Membro_Inferior_Direito_imagem_3_d9eef1b6.jpg',
        '/assets/aistudio/15._Eco_Color_Doppler_Arterial_de_Membro_Inferior_Direito_imagem_4_6162b4e5.jpg',
        '/assets/aistudio/15._Eco_Color_Doppler_Arterial_de_Membro_Inferior_Direito_imagem_5_fd56bc24.jpg',
        '/assets/aistudio/15._Eco_Color_Doppler_Arterial_de_Membro_Inferior_Direito_imagem_6_adbbc7e4.jpg',
        '/assets/aistudio/15._Eco_Color_Doppler_Arterial_de_Membro_Inferior_Direito_imagem_7_4f58a874.jpg',
      ];
      initialPage = 0;
    } else if (itemNum === 13 || result.id === 'laudo-cateterismo') {
      pages = [
        '/assets/rendered/laudo_cateterismo_88181_p01.png',
        '/assets/rendered/cateterismo_imagem_oficial_p01.png',
        '/assets/aistudio/13_imagem_cateterismo_separada_1_42458f5a.jpg',
        '/assets/aistudio/13_imagem_cateterismo_separada_2_a0163eeb.jpg',
        '/assets/aistudio/13_imagem_cateterismo_separada_3_97920774.jpg',
        '/assets/aistudio/13_imagem_cateterismo_separada_4_bc9bca79.jpg',
      ];
      initialPage = 0;
    } else if (itemNum === 14 || result.id === 'laudo-doppler-carotidas') {
      pages = [
        '/assets/rendered/laudo_doppler_carotidas_p01.png',
        '/assets/rendered/imagem_doppler_carotidas_p01.png',
      ];
      initialPage = 0;
    } else if (itemNum === 17 || result.id === 'laudo-angiotc-aorta') {
      pages = [
        '/assets/rendered/laudo_angiotc_aorta_mmii_p01.png',
        '/assets/rendered/laudo_angiotc_aorta_mmii_p02.png',
      ];
      initialPage = 0;
    } else if (itemNum === 16 || result.id === 'laudo-angiotc-torax') {
      pages = [
        '/assets/rendered/laudo_angiotc_torax_p01.png',
        '/assets/rendered/laudo_angiotc_torax_p2_p01.png',
      ];
      initialPage = 0;
    } else if (itemNum === 8 || result.id === 'laudo-infecto-aptidao') {
      pages = ['/assets/rendered/parecer_infecto_cecilia_p01.png'];
      initialPage = 0;
    } else if (itemNum === 2 || result.id === 'laudo-alta-hospitalar') {
      pages = ['/assets/rendered/resumo_alta_santacasa_p01.png'];
      initialPage = 0;
    } else if (itemNum === 1 || result.id === 'laudo-cirurgia-vascular') {
      pages = ['/assets/rendered/relatorio_evolucao_kingma_p01.png'];
      initialPage = 0;
    } else if (itemNum === 9 || (result.category === 'Infectologia' && (result.id.includes('cd4') || result.id.includes('carga-viral')))) {
      pages = [
        '/assets/rendered/laudo_cargaviral_cd4_p01.png',
        '/assets/rendered/laudo_cargaviral_cd4_p02.png',
      ];
      initialPage = result.pageNumber ? result.pageNumber - 1 : 0;
    } else if (itemNum === 10 || result.id === 'hiv-pendente-p168579') {
      pages = [
        '/assets/rendered/resultado.png',
      ];
      initialPage = 0;
    }
    // 2. Blocos de Análises Clínicas de Sangue
    else if (blockText.includes('Cecília') && result.category !== 'Resumo Clínico') {
      pages = [
        '/assets/rendered/lab_carlos_chagas_cecilia_9p_p01.png',
        '/assets/rendered/lab_carlos_chagas_cecilia_9p_p02.png',
        '/assets/rendered/lab_carlos_chagas_cecilia_9p_p03.png',
        '/assets/rendered/lab_carlos_chagas_cecilia_9p_p04.png',
        '/assets/rendered/lab_carlos_chagas_cecilia_9p_p05.png',
        '/assets/rendered/lab_carlos_chagas_cecilia_9p_p06.png',
        '/assets/rendered/lab_carlos_chagas_cecilia_9p_p07.png',
        '/assets/rendered/lab_carlos_chagas_cecilia_9p_p08.png',
        '/assets/rendered/lab_carlos_chagas_cecilia_9p_p09.png',
      ];
      initialPage = result.pageNumber ? result.pageNumber - 1 : 0;
    } else if (blockText.includes('Lucas Klier') && result.category !== 'Imagem/Laudo') {
      pages = [
        '/assets/rendered/lab_santacasa_klier_5p_p01.png',
        '/assets/rendered/lab_santacasa_klier_5p_p02.png',
        '/assets/rendered/lab_santacasa_klier_5p_p03.png',
        '/assets/rendered/lab_santacasa_klier_5p_p04.png',
        '/assets/rendered/lab_santacasa_klier_5p_p05.png',
      ];
      initialPage = result.pageNumber ? result.pageNumber - 1 : 0;
    } else if (blockText.includes('Kingma')) {
      pages = [
        '/assets/rendered/lab_santacasa_kingma_7p_p01.png',
        '/assets/rendered/lab_santacasa_kingma_7p_p02.png',
        '/assets/rendered/lab_santacasa_kingma_7p_p03.png',
        '/assets/rendered/lab_santacasa_kingma_7p_p04.png',
        '/assets/rendered/lab_santacasa_kingma_7p_p05.png',
        '/assets/rendered/lab_santacasa_kingma_7p_p06.png',
        '/assets/rendered/lab_santacasa_kingma_7p_p07.png',
      ];
      initialPage = result.pageNumber ? result.pageNumber - 1 : 0;
    } else if (blockText.includes('Túlio') || blockText.includes('Tulio')) {
      pages = [
        '/assets/rendered/lab_carlos_chagas_tulio_8p_p01.png',
        '/assets/rendered/lab_carlos_chagas_tulio_8p_p02.png',
        '/assets/rendered/lab_carlos_chagas_tulio_8p_p03.png',
        '/assets/rendered/lab_carlos_chagas_tulio_8p_p04.png',
        '/assets/rendered/lab_carlos_chagas_tulio_8p_p05.png',
        '/assets/rendered/lab_carlos_chagas_tulio_8p_p06.png',
        '/assets/rendered/lab_carlos_chagas_tulio_8p_p07.png',
        '/assets/rendered/lab_carlos_chagas_tulio_8p_p08.png',
      ];
      initialPage = result.pageNumber ? result.pageNumber - 1 : 0;
    } else if (blockText.includes('Valdier') || result.category === 'Hormonal') {
      pages = [
        '/assets/rendered/lab_dr_valdier_hormonal_9p_p01.png',
        '/assets/rendered/lab_dr_valdier_hormonal_9p_p02.png',
        '/assets/rendered/lab_dr_valdier_hormonal_9p_p03.png',
        '/assets/rendered/lab_dr_valdier_hormonal_9p_p04.png',
        '/assets/rendered/lab_dr_valdier_hormonal_9p_p05.png',
        '/assets/rendered/lab_dr_valdier_hormonal_9p_p06.png',
        '/assets/rendered/lab_dr_valdier_hormonal_9p_p07.png',
        '/assets/rendered/lab_dr_valdier_hormonal_9p_p08.png',
        '/assets/rendered/lab_dr_valdier_hormonal_9p_p09.png',
      ];
      initialPage = result.pageNumber ? result.pageNumber - 1 : 0;
    } else {
      pages = [result.previewImage];
      initialPage = 0;
    }

    setViewerState({
      isOpen: true,
      title: `${result.paramName}: ${result.currentValue}${result.unit && !result.currentValue.includes(result.unit) ? ` ${result.unit}` : ''}`,
      subtitle: `${result.laboratory} · ${result.doctor}`,
      pages,
      initialPage: Math.min(Math.max(0, initialPage), pages.length - 1),
      pdfPath: result.pdfPath,
      doctor: result.doctor,
      date: result.collectionDate,
      location: `${result.physicalLocation.tab} · ${result.physicalLocation.block || ''} · ${result.physicalLocation.page}`,
    });
  };

  const handleOpenDocument = (item: PhysicalFolderItem) => {
    if (item.itemNumber === 18) {
      setCdsModalOpen(true);
      return;
    }

    setViewerState({
      isOpen: true,
      title: item.title,
      subtitle: item.subtitle,
      pages: item.previewImages,
      initialPage: 0,
      pdfPath: item.pdfPath,
      doctor: item.doctor,
      date: item.date,
      location: `${item.tabName} · Item ${item.itemNumber}`,
    });
  };

  const handleSelectExamImage = (img: ExamImage) => {
    setViewerState({
      isOpen: true,
      title: img.title,
      subtitle: img.projectionOrSite,
      pages: [img.imagePath],
      initialPage: 0,
      pdfPath: img.imagePath,
      doctor: img.doctor,
      date: img.date,
      location: img.institution,
    });
  };

  const handleOpenDocRef = (docRef: NonNullable<Medication['documentRef']>) => {
    setViewerState({
      isOpen: true,
      title: docRef.title,
      subtitle: `${docRef.folderTab} · Item ${docRef.itemNumber}`,
      pages: [docRef.previewImage],
      initialPage: 0,
      pdfPath: docRef.pdfPath,
      location: docRef.folderTab,
    });
  };

  const handleOpenBlock = (blockNum: 1 | 2 | 3 | 4 | 5 | 6) => {
    if (blockNum === 1) {
      setViewerState({
        isOpen: true,
        title: 'Bloco 1: Laudo de Admissão — Dr. Lucas Klier (5 Páginas)',
        subtitle: 'Santa Casa de Misericórdia de Juiz de Fora · Dr. Lucas Klier Silva',
        pages: [
          '/assets/rendered/lab_santacasa_klier_5p_p01.png',
          '/assets/rendered/lab_santacasa_klier_5p_p02.png',
          '/assets/rendered/lab_santacasa_klier_5p_p03.png',
          '/assets/rendered/lab_santacasa_klier_5p_p04.png',
          '/assets/rendered/lab_santacasa_klier_5p_p05.png',
        ],
        initialPage: 0,
        pdfPath: '/assets/aistudio/laudo_laboratorial_dr_lucas_klier_santacasa_5p.pdf',
        doctor: 'Dr. Lucas Klier Silva',
        date: '20/09/2026',
        location: 'Aba 3 · Item 12 (Bloco 1)',
      });
    } else if (blockNum === 2) {
      setViewerState({
        isOpen: true,
        title: 'Bloco 2: Cirurgia Vascular / Angiologia — Dr. Luiz Kingma (7 Páginas)',
        subtitle: 'Santa Casa de Misericórdia de Juiz de Fora · Dr. Luiz Kingma Lanziotti',
        pages: [
          '/assets/rendered/lab_santacasa_kingma_7p_p01.png',
          '/assets/rendered/lab_santacasa_kingma_7p_p02.png',
          '/assets/rendered/lab_santacasa_kingma_7p_p03.png',
          '/assets/rendered/lab_santacasa_kingma_7p_p04.png',
          '/assets/rendered/lab_santacasa_kingma_7p_p05.png',
          '/assets/rendered/lab_santacasa_kingma_7p_p06.png',
          '/assets/rendered/lab_santacasa_kingma_7p_p07.png',
        ],
        initialPage: 0,
        pdfPath: '/assets/aistudio/laudo_laboratorial_dr_luiz_kingma_santacasa_7p.pdf',
        doctor: 'Dr. Luiz Kingma Lanziotti (Angiologia / Cirurgia Vascular)',
        date: '24/09/2026',
        location: 'Aba 3 · Item 12 (Bloco 2)',
      });
    } else if (blockNum === 3) {
      setViewerState({
        isOpen: true,
        title: 'Bloco 3: Exames Laboratoriais e Sorologias — Dr. Túlio (8 Páginas)',
        subtitle: 'Laboratório Carlos Chagas · Solicitante: Tulio Vieira Mendes (O.S. 004-67872-36)',
        pages: [
          '/assets/rendered/lab_carlos_chagas_tulio_8p_p01.png',
          '/assets/rendered/lab_carlos_chagas_tulio_8p_p02.png',
          '/assets/rendered/lab_carlos_chagas_tulio_8p_p03.png',
          '/assets/rendered/lab_carlos_chagas_tulio_8p_p04.png',
          '/assets/rendered/lab_carlos_chagas_tulio_8p_p05.png',
          '/assets/rendered/lab_carlos_chagas_tulio_8p_p06.png',
          '/assets/rendered/lab_carlos_chagas_tulio_8p_p07.png',
          '/assets/rendered/lab_carlos_chagas_tulio_8p_p08.png',
        ],
        initialPage: 0,
        pdfPath: '/assets/aistudio/11_Protocolo_de_Resultados_de_Exames_Laboratoriais_Tulio_a8028bee.pdf',
        doctor: 'Dr. Túlio Vieira Mendes (Maj. Túlio)',
        date: '29/10/2026 a 04/11/2026',
        location: 'Aba 3 · Item 12 (Bloco 3)',
      });
    } else if (blockNum === 4) {
      setViewerState({
        isOpen: true,
        title: 'Bloco 4: Protocolo Bioquímico Geral e Urina — Dra. Cecília (9 Páginas)',
        subtitle: 'Laboratório Carlos Chagas · Dra. Cecília Faria Wolkartt (O.S. 004-67872-36)',
        pages: [
          '/assets/rendered/lab_carlos_chagas_cecilia_9p_p01.png',
          '/assets/rendered/lab_carlos_chagas_cecilia_9p_p02.png',
          '/assets/rendered/lab_carlos_chagas_cecilia_9p_p03.png',
          '/assets/rendered/lab_carlos_chagas_cecilia_9p_p04.png',
          '/assets/rendered/lab_carlos_chagas_cecilia_9p_p05.png',
          '/assets/rendered/lab_carlos_chagas_cecilia_9p_p06.png',
          '/assets/rendered/lab_carlos_chagas_cecilia_9p_p07.png',
          '/assets/rendered/lab_carlos_chagas_cecilia_9p_p08.png',
          '/assets/rendered/lab_carlos_chagas_cecilia_9p_p09.png',
        ],
        initialPage: 0,
        pdfPath: '/assets/aistudio/11_Protocolo_de_Resultados_de_Exames_Laboratoriais__ceilia_f5c95ee4.pdf',
        doctor: 'Dra. Cecília Faria Wolkartt',
        date: '29/10/2026',
        location: 'Aba 3 · Item 11 / Item 12 (Bloco 4)',
      });
    } else if (blockNum === 5) {
      setViewerState({
        isOpen: true,
        title: 'Bloco 5: Imunologia CD4 e Carga Viral HIV — Dra. Cecília (2 Páginas)',
        subtitle: 'Laboratório Carlos Chagas · Dra. Cecília Faria Wolkartt (O.S. 004-67856-84)',
        pages: [
          '/assets/rendered/lab_carlos_chagas_ceciliacargaviral_2p_p01.png',
          '/assets/rendered/lab_carlos_chagas_ceciliacargaviral_2p_p02.png',
        ],
        initialPage: 0,
        pdfPath: '/assets/aistudio/laudo_cargaviral_cd4_cecilia_2p.pdf',
        doctor: 'Dra. Cecília Faria Wolkartt (Infectologista)',
        date: '13/10 a 23/10/2026',
        location: 'Aba 3 · Item 09 / Item 12 (Bloco 5)',
      });
    } else {
      setViewerState({
        isOpen: true,
        title: 'Bloco 6: Dr. Arthur Valdier (HGeJF) — Perfil Hormonal, PSA e Metabólico (9 Páginas)',
        subtitle: 'Hospital Geral de Juiz de Fora · Solicitação Dr. Arthur Valdier · Atendimento 00104618/014',
        pages: [
          '/assets/rendered/lab_dr_valdier_hormonal_9p_p01.png',
          '/assets/rendered/lab_dr_valdier_hormonal_9p_p02.png',
          '/assets/rendered/lab_dr_valdier_hormonal_9p_p03.png',
          '/assets/rendered/lab_dr_valdier_hormonal_9p_p04.png',
          '/assets/rendered/lab_dr_valdier_hormonal_9p_p05.png',
          '/assets/rendered/lab_dr_valdier_hormonal_9p_p06.png',
          '/assets/rendered/lab_dr_valdier_hormonal_9p_p07.png',
          '/assets/rendered/lab_dr_valdier_hormonal_9p_p08.png',
          '/assets/rendered/lab_dr_valdier_hormonal_9p_p09.png',
        ],
        initialPage: 7, // Opens directly on Page 8 (Hormonal / Estradiol 86,3) or page 1
        pdfPath: '/assets/aistudio/11_Protocolo_de_Resultados_de_Exames_Laboratoriais__etraiol_d7833244.pdf',
        doctor: 'Dr. Arthur Valdier',
        date: '20/05/2026',
        location: 'Aba 3 · Item 12 (Bloco 6)',
      });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (isLocked) {
    return <SecurityGate onUnlock={() => setIsLocked(false)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* 1. Cabeçalho Superior Limpo: Prontuário à esquerda, Ações à direita */}
      <Header
        onOpenDossier={() => {
          setActiveView('dossier');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSearch={() => setSearchModalOpen(true)}
        onPrint={handlePrint}
        onAddExam={() => setAddExamModalOpen(true)}
      />

      {/* 2. Cartão do Paciente (Foto ampliada, NIP, CPF, Internação HNMD, Contatos) */}
      <PatientSummaryBar
        onOpenCredentials={() => {
          setActiveView('credentials');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenOfficialMessage={handleOpenOfficialMessage}
      />

      {/* 3. Barra de Opções Padronizada e Fixa ao Rolar (Sticky) */}
      <StickyNavigationBar
        activeView={activeView}
        setActiveView={(view) => {
          setActiveView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-5 space-y-6">
        {/* DOSSIÊ CLÍNICO EXECUTIVO (Default na frente conforme solicitado) */}
        {activeView === 'dossier' && (
          <ClinicalDossierView
            onOpenFolder={() => {
              setFolderInitialTab('all');
              setActiveView('folder');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenChecklist={() => {
              setActiveView('checklist');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenOfficialMessage={handleOpenOfficialMessage}
            onOpenCateterismo={() => handleOpenGallery('cateterismo')}
            onOpenInfecto={() => {
              const item8 = physicalFolderItems.find((i) => i.itemNumber === 8);
              if (item8) handleOpenDocument(item8);
            }}
          />
        )}

        {/* PASTA FÍSICA (4 ABAS & ITENS NUMERADOS) */}
        {activeView === 'folder' && (
          <PhysicalFolderNav
            items={[...customFolderItems, ...physicalFolderItems]}
            initialTab={folderInitialTab}
            onOpenDocument={handleOpenDocument}
            onOpenGallery={handleOpenGallery}
            onOpenDividersModal={(type) => setDividersModal({ isOpen: true, type })}
            onOpenBlock={handleOpenBlock}
          />
        )}

        {/* CHECKLIST HNMD (9 DE 10 EXIGÊNCIAS) */}
        {activeView === 'checklist' && (
          <HNMDChecklist
            onSelectResult={handleSelectResult}
            onOpenFolderTab={handleOpenFolderTab}
            onOpenOfficialMessage={handleOpenOfficialMessage}
            onOpenSpecificLaudo={(title, pages, pdfPath) =>
              setViewerState({
                isOpen: true,
                title,
                pages,
                initialPage: 0,
                pdfPath,
              })
            }
          />
        )}

        {/* PESQUISA DE EXAMES */}
        {activeView === 'overview' && (
          <div className="space-y-6">
            <QuickSearch
              onSelectResult={handleSelectResult}
              onOpenGallery={handleOpenGallery}
            />
          </div>
        )}

        {/* EVOLUÇÃO TEMPORAL */}
        {activeView === 'evolution' && (
          <LabEvolutionTable onSelectResult={handleSelectResult} />
        )}

        {/* LABORATÓRIOS & SENHAS DOS PORTAIS */}
        {activeView === 'credentials' && (
          <LabCredentialsView
            onViewImage={(imagePath, title) =>
              setViewerState({
                isOpen: true,
                title,
                pages: [imagePath],
                initialPage: 0,
                pdfPath: imagePath,
              })
            }
          />
        )}

        {/* MEDICAÇÕES EM USO */}
        {activeView === 'medications' && (
          <div className="space-y-6">
            <MedicationPanel onOpenDocRef={handleOpenDocRef} />
          </div>
        )}

        {/* IMAGENS E LAUDOS MÉDICOS */}
        {activeView === 'images' && (
          <ImageGalleryView
            activeFilter={imageGalleryFilter}
            onSelectImage={handleSelectExamImage}
            onOpenLaudo={(laudoPath, title) =>
              setViewerState({
                isOpen: true,
                title,
                subtitle: 'Laudo Médico Original Assinado',
                pages: [laudoPath],
                initialPage: 0,
                pdfPath: laudoPath,
              })
            }
          />
        )}
      </main>

      {/* Floating search button on mobile */}
      <div className="md:hidden fixed bottom-5 right-5 z-20">
        <button
          onClick={() => setSearchModalOpen(true)}
          className="w-12 h-12 rounded-full bg-slate-900 text-white shadow-xl flex items-center justify-center hover:bg-slate-800 transition-colors"
          title="Buscar exame"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <span className="font-semibold text-slate-800">
              Dossiê Clínico e Cirúrgico Vascular — Vinícius Paes Mendes Pereira
            </span>
            <div className="text-slate-400">
              Capitania Fluvial de Minas Gerais (CFMG) · Hospital Naval Marcílio Dias (HNMD)
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setGithubGuideOpen(true)}
              className="text-slate-600 hover:text-slate-900 underline"
            >
              Instruções GitHub / Vercel
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={handlePrint}
              className="text-slate-600 hover:text-slate-900 underline"
            >
              Imprimir Resumo Executivo
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setIsLocked(true)}
              className="text-slate-600 hover:text-slate-900 underline"
            >
              Bloquear com PIN
            </button>
          </div>
        </div>
      </footer>

      {/* Document Viewer Modal */}
      <DocumentViewerModal
        isOpen={viewerState.isOpen}
        onClose={() => setViewerState((prev) => ({ ...prev, isOpen: false }))}
        title={viewerState.title}
        subtitle={viewerState.subtitle}
        pages={viewerState.pages}
        initialPage={viewerState.initialPage}
        pdfPath={viewerState.pdfPath}
        doctor={viewerState.doctor}
        date={viewerState.date}
        location={viewerState.location}
      />

      {/* Global Quick Search Modal */}
      {searchModalOpen && (
        <QuickSearch
          isOpenModal={true}
          onCloseModal={() => setSearchModalOpen(false)}
          onSelectResult={(res) => {
            setSearchModalOpen(false);
            handleSelectResult(res);
          }}
          onOpenGallery={(gid) => {
            setSearchModalOpen(false);
            handleOpenGallery(gid);
          }}
        />
      )}

      {/* GitHub & Vercel Guide Modal */}
      <GitHubGuideModal
        isOpen={githubGuideOpen}
        onClose={() => setGithubGuideOpen(false)}
      />

      {/* Emergency Contacts Modal */}
      <EmergencyContactsModal
        isOpen={contactsModalOpen}
        onClose={() => setContactsModalOpen(false)}
      />

      {/* Add Exam Modal */}
      <AddExamModal
        isOpen={addExamModalOpen}
        onClose={() => setAddExamModalOpen(false)}
        nextItemNumber={18 + customFolderItems.length + 1}
        onAddExam={(newExam, newFolderItem) => {
          setCustomExams((prev) => [newExam, ...prev]);
          labResults.unshift(newExam);
          if (newFolderItem) {
            setCustomFolderItems((prev) => [newFolderItem, ...prev]);
          }
        }}
      />

      {/* Folder Dividers Modal */}
      <FolderDividersModal
        isOpen={dividersModal.isOpen}
        onClose={() => setDividersModal({ isOpen: false, type: 'dividers' })}
        type={dividersModal.type}
      />

      {/* 3 CDs & Mídias Físicas Modal */}
      <CDsModal
        isOpen={cdsModalOpen}
        onClose={() => setCdsModalOpen(false)}
        onOpenLaudo={(title, pages, pdfPath) =>
          setViewerState({
            isOpen: true,
            title,
            subtitle: 'Mídia Física em Alta Definição · HNMD',
            pages,
            initialPage: 0,
            pdfPath,
          })
        }
      />

      {/* Printable Sheet */}
      <PrintSummary />
    </div>
  );
}
