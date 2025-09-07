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
  {
    id: 'drug001',
    patient_id: 'p001',
    drug_name: 'Mesalazine',
    dosage: '500mg',
    date_from: getFormattedDate(-30),
    date_to: getFormattedDate(60),
    prescription_notes: 'Take with food',
    created_at: Date.now().toString(),
    updated_at: Date.now().toString(),
  },
  {
    id: 'drug002',
    patient_id: 'p001',
    drug_name: 'Prednisone',
    dosage: '20mg',
    date_from: getFormattedDate(-15),
    date_to: getFormattedDate(15),
    prescription_notes: 'Taper down as directed',
    created_at: Date.now().toString(),
    updated_at: Date.now().toString(),
  },
  {
    id: 'drug016',
    patient_id: 'p015',
    drug_name: 'Etanercept',
    dosage: '50mg',
    date_from: '2023-02-10',
    date_to: '2025-12-10',
    prescription_notes: 'Subcutaneous injection every week',
    created_at: Date.now().toString(),
    updated_at: Date.now().toString(),
  },
  {
    id: 'drug017',
    patient_id: 'p016',
    drug_name: 'Mycophenolate Mofetil',
    dosage: '1g',
    date_from: '2023-04-01',
    date_to: '2025-04-01',
    prescription_notes: 'Monitor blood counts',
    created_at: Date.now().toString(),
    updated_at: Date.now().toString(),
  },
  {
    id: 'drug018',
    patient_id: 'p017',
    drug_name: 'Secukinumab',
    dosage: '300mg',
    date_from: '2023-06-15',
    date_to: '2025-06-15',
    prescription_notes: 'Subcutaneous injection every 4 weeks',
    created_at: Date.now().toString(),
    updated_at: Date.now().toString(),
  },
  {
    id: 'drug019',
    patient_id: 'p018',
    drug_name: 'Upadacitinib',
    dosage: '30mg',
    date_from: '2023-01-05',
    date_to: '2024-12-31',
    prescription_notes: 'Once daily with water',
    created_at: Date.now().toString(),
    updated_at: Date.now().toString(),
  },
  {
    id: 'drug020',
    patient_id: 'p001',
    drug_name: 'Mesalazine (long)',
    dosage: '1.2g',
    date_from: '2023-03-20',
    date_to: '2025-07-20',
    prescription_notes: 'High-dose maintenance',
    created_at: Date.now().toString(),
    updated_at: Date.now().toString(),
  },
];
