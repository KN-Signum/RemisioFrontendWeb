import { DrugDto } from '@/features/drugs/types';

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
    patientId: 'p001',
    drug_name: 'Mesalazine',
    dosage: '500mg',
    dateFrom: getFormattedDate(-30),
    dateTo: getFormattedDate(60),
    prescription_notes: 'Take with food',
    created_at: Date.now().toString(),
    updated_at: Date.now().toString(),
  },
  {
    id: 'drug002',
    patientId: 'p001',
    drug_name: 'Prednisone',
    dosage: '20mg',
    dateFrom: getFormattedDate(-15),
    dateTo: getFormattedDate(15),
    prescription_notes: 'Taper down as directed',
    created_at: Date.now().toString(),
    updated_at: Date.now().toString(),
  },
  /* … pozostałe Twoje wpisy drug003 – drug015 … */

  /* --- nowe, dłuższe terapie od 2023 r. --- */
  {
    id: 'drug016',
    patientId: 'p015',
    drug_name: 'Etanercept',
    dosage: '50mg',
    dateFrom: '2023-02-10',
    dateTo: '2025-12-10',
    prescription_notes: 'Subcutaneous injection every week',
    created_at: Date.now().toString(),
    updated_at: Date.now().toString(),
  },
  {
    id: 'drug017',
    patientId: 'p016',
    drug_name: 'Mycophenolate Mofetil',
    dosage: '1g',
    dateFrom: '2023-04-01',
    dateTo: '2025-04-01',
    prescription_notes: 'Monitor blood counts',
    created_at: Date.now().toString(),
    updated_at: Date.now().toString(),
  },
  {
    id: 'drug018',
    patientId: 'p017',
    drug_name: 'Secukinumab',
    dosage: '300mg',
    dateFrom: '2023-06-15',
    dateTo: '2025-06-15',
    prescription_notes: 'Subcutaneous injection every 4 weeks',
    created_at: Date.now().toString(),
    updated_at: Date.now().toString(),
  },
  {
    id: 'drug019',
    patientId: 'p018',
    drug_name: 'Upadacitinib',
    dosage: '30mg',
    dateFrom: '2023-01-05',
    dateTo: '2024-12-31',
    prescription_notes: 'Once daily with water',
    created_at: Date.now().toString(),
    updated_at: Date.now().toString(),
  },
  {
    id: 'drug020',
    patientId: 'p001',
    drug_name: 'Mesalazine (long)',
    dosage: '1.2g',
    dateFrom: '2023-03-20',
    dateTo: '2025-07-20',
    prescription_notes: 'High-dose maintenance',
    created_at: Date.now().toString(),
    updated_at: Date.now().toString(),
  },
];
