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
