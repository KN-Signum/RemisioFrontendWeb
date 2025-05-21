export interface CreateDrugDto {
  name: string;
  dosage: string;
  dateFrom: string;
  dateTo: string;
  additionalInfo: string;
  doses_taken: number;
  doses_left: number;
}
