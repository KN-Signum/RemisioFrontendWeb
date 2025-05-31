export interface DrugDto {
  id?: string;
  name: string;
  patientId: string;
  dosage: string;
  dateFrom: string;
  dateTo: string;
  additionalInfo: string;
  times: string[];
}
