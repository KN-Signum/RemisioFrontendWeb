import { DiseaseType, GenderType, PatientState } from '@/types';

export interface GetPatientDto {
  id: string;
  full_name: string;
  gender: GenderType;
  disease: DiseaseType;
  state: PatientState;
  last_visit: Date;
  drugs: string[];
  age: number;
  score: number;
  surveys: number;
  diet: string;
  weight: number;
}

export interface GetPatientDetailsDto {
  id: string;
  hospital: string;
  phone: string;
  email: string;
  notes: string;
  smoking: string;
}

export interface FullPatient extends GetPatientDto, GetPatientDetailsDto {}

export interface CreatePatientDto {
  firstName: string;
  lastName: string;
  email: string;
  phone_number: string;
  password: string;
  weight: number;
  height: number;
  date_of_birth: Date;
  hospital: string;
}
