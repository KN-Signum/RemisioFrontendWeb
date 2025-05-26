export interface GetVisitDto {
  id: string;
  patient_id: string;
  name: string;
  time_start: string;
  time_end: string;
  additional_info: string;
}

export interface CreateVisitDto {
  name: string;
  patient_id: string;
  time_start: Date;
  time_end: Date;
  additional_info: string;
}
