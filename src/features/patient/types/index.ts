export interface GetPatientDto {
  full_name: string;
  mayo_stance: string;
  date_of_last_visit: string;
  drugs: string[];
}

export interface GetFullPatientDto {
  id: string;
  name: string;
  weight: number;
  height: number;
  age: number;
  cdai_score: number;
  email: string;
  phone_number: string;
}

export interface CreatePatientDto {
  name: string;
  email: string;
  phone_number: string;
  password: string;
  weight: number;
  height: number;
  age: number;
}

export interface CreatePatientResponseDto {
  status: string;
  data: string;
}

export interface GetAllPatientsDto {
  patients: GetAllPatientsPatientDto[];
}

export interface GetAllPatientsPatientDto {
  id: string;
  name: string;
}

export interface ExtendedPatientDto extends CreatePatientDto {
  id: number;
  score: number;
  hospital: string;
}
