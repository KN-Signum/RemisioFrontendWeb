import { factory, primaryKey } from '@mswjs/data';

const models = {
  patient: {
    id: primaryKey(String),
    first_name: String,
    last_name: String,
    email: String,
    phone_number: String,
    weight: Number,
    height: Number,
    age: Number,
    score: Number,
    hospital: String,
  },
  visit: {
    id: primaryKey(String),
    patient_id: String,
    doctor_id: String,
    name: String,
    time_start: String,
    time_end: String,
    additional_info: String,
  },
};

export const db = factory(models);
