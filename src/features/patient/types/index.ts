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
  hospital: string;
}

export interface GetPatientDto {
  id: string;
  name: string;
}
