import { mockVisits } from '@/testing/test-data/visits';
import { db } from './db';

export const seedDb = () => {
  mockVisits.forEach((visit) => db.visit.create(visit));
  //testData.patients.forEach((patient) => db.patient.create(patient));
};
