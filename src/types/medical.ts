export interface PatientInfo {
  name: string;
  nip: string;
  cpf: string;
  rg: string;
  birthDate: string;
  age: number;
  origin: string;
  destination: string;
  admissionDate: string;
  diagnosis: string;
  habits: string;
  allergies: string;
  contacts: {
    relation: string;
    name: string;
    phone: string;
  }[];
}

export interface Medication {
  id: string;
  category: 'analgesia' | 'vascular' | 'hiv';
  name: string;
  dosage: string;
  posology: string;
  prescribedBy: string;
  date: string;
  notes?: string;
  documentRef?: {
    title: string;
    folderTab: string;
    itemNumber: number;
    previewImage: string;
    pdfPath: string;
  };
}

export interface LabResultItem {
  id: string;
  paramName: string;
  category: 'Resumo Clínico' | 'Renal' | 'Eletrólitos' | 'Hematologia' | 'Glicemia' | 'Coagulação' | 'Infectologia' | 'Hepático' | 'Lipídico' | 'Hormonal' | 'Urina' | 'Imagem/Laudo';
  currentValue: string;
  unit: string;
  referenceRange: string;
  status: 'normal' | 'altered' | 'attention';
  collectionDate: string;
  doctor: string;
  laboratory: string;
  physicalLocation: {
    tab: string; // e.g. "Aba 3"
    block?: string; // e.g. "Bloco 2 (Dra. Cecília)"
    page: string; // e.g. "Página 7/9"
    itemNumber: number; // e.g. 11 or 12
  };
  history?: {
    date: string;
    value: string;
    lab: string;
  }[];
  previewImage: string;
  pdfPath: string;
  pageNumber?: number;
}

export interface PhysicalFolderItem {
  itemNumber: number;
  tab: 1 | 2 | 3 | 4;
  tabName: string;
  title: string;
  subtitle: string;
  date: string;
  institution: string;
  doctor: string;
  highlights: string[];
  pageCount: number;
  previewImages: string[];
  pdfPath: string;
  hasImages?: boolean;
  imageGalleryId?: string;
}

export interface LabPortal {
  id: string;
  name: string;
  institution: string;
  purpose: string;
  portalUrl: string;
  login: string;
  password?: string;
  orderNumber?: string;
  additionalCredentials?: { label: string; value: string }[];
  phone: string;
  notes: string;
  isSpecialNotice?: boolean;
  ticketImage?: string;
}

export interface ExamImage {
  id: string;
  examType: 'cateterismo' | 'doppler' | 'comprovante';
  title: string;
  projectionOrSite: string;
  date: string;
  institution: string;
  doctor: string;
  imagePath: string;
  clinicalNote: string;
  laudoPath?: string;
  laudoTitle?: string;
}
