import {
  mockVisits,
  mockPatients,
  mockDrugs,
  mockDiagnosticTests,
  mockPatientScores,
  mockCrohnSurveys,
  mockUcSurveys,
  mockSymptoms,
  mockMeals,
} from '@/testing/mocks/setup/test-data';
import { db } from './db';

export const seedDb = () => {
  // if no data exists, seed the database with mock data
  if (db.visit.count() > 0) return;
  mockVisits.forEach((visit) => db.visit.create(visit));
  mockPatients.forEach((patient) => db.patient.create(patient));
  mockDrugs.forEach((drug) => db.drug.create(drug));
  mockDiagnosticTests.forEach((test) => db.diagnosticTest.create(test));
  mockPatientScores.forEach((score) => db.patientScore.create(score));
  mockSymptoms.forEach((symptom) => db.symptom.create(symptom));
  mockCrohnSurveys.forEach((survey) => db.crohnSurvey.create(survey));
  mockUcSurveys.forEach((survey) => db.ucSurvey.create(survey));
  mockMeals.forEach((meal) => db.meal.create(meal));
};
