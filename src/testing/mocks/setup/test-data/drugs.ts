import { DrugDto } from '@/features/drug/types';

function getFormattedDate(offsetDays: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const mockDrugs: DrugDto[] = [
  /* dotychczasowe wpisy */
  {
    id: 'drug001',
    name: 'Mesalazine',
    patientId: 'p001',
    dosage: '500mg',
    dateFrom: getFormattedDate(-30),
    dateTo: getFormattedDate(60),
    additionalInfo: 'Take with food',
    times: ['08:00', '20:00'],
  },
  {
    id: 'drug002',
    name: 'Prednisone',
    patientId: 'p001',
    dosage: '20mg',
    dateFrom: getFormattedDate(-15),
    dateTo: getFormattedDate(15),
    additionalInfo: 'Taper down as directed',
    times: ['08:00'],
  },
  /* … pozostałe Twoje wpisy drug003 – drug015 … */

  /* --- nowe, dłuższe terapie od 2023 r. --- */
  {
    id: 'drug016',
    name: 'Etanercept',
    patientId: 'p015',
    dosage: '50mg',
    dateFrom: '2023-02-10',
    dateTo: '2025-12-10',
    additionalInfo: 'Subcutaneous injection every week',
    times: ['09:00'],
  },
  {
    id: 'drug017',
    name: 'Mycophenolate Mofetil',
    patientId: 'p016',
    dosage: '1g',
    dateFrom: '2023-04-01',
    dateTo: '2025-04-01',
    additionalInfo: 'Monitor blood counts',
    times: ['08:00', '20:00'],
  },
  {
    id: 'drug018',
    name: 'Secukinumab',
    patientId: 'p017',
    dosage: '300mg',
    dateFrom: '2023-06-15',
    dateTo: '2025-06-15',
    additionalInfo: 'Subcutaneous injection every 4 weeks',
    times: ['10:00'],
  },
  {
    id: 'drug019',
    name: 'Upadacitinib',
    patientId: 'p018',
    dosage: '30mg',
    dateFrom: '2023-01-05',
    dateTo: '2024-12-31',
    additionalInfo: 'Once daily with water',
    times: ['08:00'],
  },
  {
    id: 'drug020',
    name: 'Mesalazine (long)',
    patientId: 'p001',
    dosage: '1.2g',
    dateFrom: '2023-03-20',
    dateTo: '2025-07-20',
    additionalInfo: 'High-dose maintenance',
    times: ['08:00', '14:00', '20:00'],
  },
];
