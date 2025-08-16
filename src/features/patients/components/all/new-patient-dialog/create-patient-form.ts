export interface CreatePatientForm {
  firstName: string;
  lastName: string;
  email: string;
  phone_number: string;
  password: string;
  height: string;
  weight: string;
  date_of_birth?: Date;
  hospital: string;
}
