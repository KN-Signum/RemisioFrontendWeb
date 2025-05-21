import { factory, primaryKey } from '@mswjs/data';

const models = {
  patient: {
    id: primaryKey(Number),
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
};

export const db = factory(models);
