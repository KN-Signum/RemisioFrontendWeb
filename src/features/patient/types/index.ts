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

export interface SimpleTablePatientDto {
  id: string;
  name: string;
  disease: string;
  state: string;
  last_visit: string;
  drugs: string;
  // alert: boolean; TODO: add alert field when something important happens
}

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

export interface GetPatientDto {
  id: string;
  name: string;
  disease_type: string;
  state: string;
  age: number;
  score: number;
}
