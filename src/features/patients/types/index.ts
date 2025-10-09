import { DiseaseType, GenderType } from '@/utils/types';

export interface GetPatientDto {
  id: string;
  first_name: string;
  last_name: string;
  gender: GenderType;
  disease_type: DiseaseType;
  last_visit: Date;
  drugs: string[];
  age: number;
  last_score: number;
  surveys: number;
  diet: string;
  weight: number;
}

export interface GetPatientDetailsDto {
  id: string;
  hospital: string;
  phone_number: string;
  email: string;
  notes_about_patient: string;
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
