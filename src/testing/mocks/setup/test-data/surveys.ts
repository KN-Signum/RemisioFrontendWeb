import { v4 as uuidv4 } from 'uuid';
import { mockPatients } from './patients';
import {
  calculateCrohnTotalScore,
  calculateCrohnCategory,
  calculateUcCategory,
  calculateUcTotalScore,
} from '../../handlers/survey';
import { CrohnSurveyDto, UcSurveyDto } from '@/features/survey';

const getRandomDateIso = (): string => {
  const now = new Date();
  const oneYearAgo = new Date(now);
  oneYearAgo.setFullYear(now.getFullYear() - 1);

  const t =
    oneYearAgo.getTime() + Math.random() * (now.getTime() - oneYearAgo.getTime());

  return new Date(t).toISOString().split('T')[0];
};

const randInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const pick = <T>(arr: readonly T[]): T => arr[randInt(0, arr.length - 1)];

const generateSurveyData = () => {
  const crohnSurveys: CrohnSurveyDto[] = [];
  const ucSurveys: UcSurveyDto[] = [];

  for (const p of mockPatients) {
    const isCrohn = p.disease_type === 'crohn';
    const patientId = p.id;

    const currentW = p.weight;
    const idealW = currentW * (1 + randInt(5, 10) / 100);

    for (let i = 0; i < 8; i++) {
      const surveyDate = getRandomDateIso();
      const createdAt = new Date().toISOString();

      if (isCrohn) {

        const liquidStools = randInt(0, 35);
        const abdominalPainSum = randInt(0, 21);
        const wellbeingSum = randInt(0, 28);

        const extraintestinal = randInt(0, 7);
        const antidiarrheal = Math.random() < 0.3;
        const abdominalMass = pick([0, 2, 5] as const);
        const hematocrit = randInt(35, 47);
        const isMale = true;

        const totalScore = calculateCrohnTotalScore(
          liquidStools,
          abdominalPainSum,
          wellbeingSum,
          extraintestinal,
          antidiarrheal,
          abdominalMass,
          hematocrit,
          idealW,
          currentW,
          isMale
        );

        const category = calculateCrohnCategory(totalScore);

        crohnSurveys.push({
          id: uuidv4(),
          patient_id: patientId,
          survey_date: surveyDate,
          survey_type: 'crohn',

          stools: liquidStools,
          abdominal_pain: abdominalPainSum,
          general_wellbeing: wellbeingSum,
          extraintestinal_manifestations: extraintestinal,
          antidiarrheal_use: antidiarrheal,
          abdominal_mass: abdominalMass,
          hematocrit,
          weight: currentW,

          total_score: totalScore,
          category,

          notes: `Auto-generated Crohn survey #${i + 1}`,
          created_at: createdAt,
          updated_at: createdAt,
        });
      } else {

        const stoolFrequency = randInt(0, 3);
        const rectalBleeding = randInt(0, 3);
        const physicianGlobal = randInt(0, 3);

        const totalScore = calculateUcTotalScore(
          stoolFrequency,
          rectalBleeding,
          physicianGlobal,
        );
        const category = calculateUcCategory(totalScore);

        ucSurveys.push({
          id: uuidv4(),
          patient_id: patientId,
          survey_date: surveyDate,
          survey_type: 'uc',

          stool_frequency: stoolFrequency,
          rectal_bleeding: rectalBleeding,
          physician_global: physicianGlobal,

          total_score: totalScore,
          category,

          notes: `Auto-generated UC survey #${i + 1}`,
          created_at: createdAt,
          updated_at: createdAt,
          weight: currentW,
        });
      }
    }
  }

  return { crohnSurveys, ucSurveys };
};


const { crohnSurveys, ucSurveys } = generateSurveyData();

export const mockCrohnSurveys = crohnSurveys;
export const mockUcSurveys = ucSurveys;
