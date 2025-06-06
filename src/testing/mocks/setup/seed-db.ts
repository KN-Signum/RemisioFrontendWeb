import {
  mockVisits,
  mockPatients,
  mockDrugs,
  mockDiagnosticTests,
  mockPatientScores,
  mockCrohnSurveys,
  mockUcSurveys
} from '@/testing/mocks/setup/test-data';
import { db } from './db';

export const seedDb = () => {
  // Seed basic data
  mockVisits.forEach((visit) => db.visit.create(visit));
  mockPatients.forEach((patient) => db.patient.create(patient));
  mockDrugs.forEach((drug) => db.drug.create(drug));
  mockDiagnosticTests.forEach((test) => db.diagnosticTest.create(test));
  mockPatientScores.forEach((score) => db.patientScore.create(score));

  // Seed survey data
  mockCrohnSurveys.forEach((survey) => db.crohnSurvey.create(survey));
  mockUcSurveys.forEach((survey) => db.ucSurvey.create(survey));
};
