import { PatientInfo } from '../types/medical';

export const patientData: PatientInfo = {
  name: 'Vinícius Paes Mendes Pereira',
  nip: '86679619',
  cpf: '862.278.156-91',
  rg: '5265266',
  birthDate: '14/04/1971',
  age: 55,
  bloodType: 'A+',
  origin: 'Capitania Fluvial de Minas Gerais (CFMG - Marinha do Brasil)',
  destination: 'Hospital Naval Marcílio Dias (HNMD) - Clínica de Cirurgia Vascular',
  admissionDate: '09/11/2026 (Segundo Tempo)',
  diagnosis: 'Síndrome de Claudicação Grave / Oclusão Aortoilíaca e Femoral (CID I70.2 - Aterosclerose das Artérias das Extremidades)',
  habits: 'Ex-Tabagista (Não-Fumante) - Relato prévio de 2 maços/dia com abolição do tabagismo',
  allergies: 'Nega alergias medicamentosas conhecidas',
  contacts: [
    { relation: 'Esposa', name: 'Marisa', phone: '(32) 99116-4611' },
    { relation: 'Irmão', name: 'Rogério', phone: '(32) 98837-8165' },
    { relation: 'Filha', name: 'Carolina', phone: '(28) 99886-7592' },
  ],
};
