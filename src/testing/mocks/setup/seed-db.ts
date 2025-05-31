import {
  mockVisits,
  mockPatients,
  mockDrugs,
} from '@/testing/mocks/setup/test-data';
import { db } from './db';

export const seedDb = () => {
  mockVisits.forEach((visit) => db.visit.create(visit));
  mockPatients.forEach((patient) => db.patient.create(patient));
  mockDrugs.forEach((drug) => db.drug.create(drug));
};
