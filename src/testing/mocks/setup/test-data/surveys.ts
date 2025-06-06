import { v4 as uuidv4 } from 'uuid';
import { mockPatients } from './patients';
import {
    calculateCrohnCategory,
    calculateCrohnTotalScore,
    calculateUcCategory,
    calculateUcTotalScore
} from '@/features/survey/types';

// Helper to generate a random date within the last year
const getRandomDate = () => {
    const now = new Date();
    const oneYearAgo = new Date(now);
    oneYearAgo.setFullYear(now.getFullYear() - 1);

    const randomTime = oneYearAgo.getTime() + Math.random() * (now.getTime() - oneYearAgo.getTime());
    const randomDate = new Date(randomTime);

    return randomDate.toISOString().split('T')[0];
};

// Helper to get a random integer between min and max (inclusive)
const getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate mock survey data
const generateSurveyData = () => {
    const crohnSurveys = [];
    const ucSurveys = [];

    // Process each patient
    for (const patient of mockPatients) {
        const patientId = patient.id;
        const isDiseaseTypeCrohn = patient.disease_type === 'crohn';

        // Generate 8 surveys per patient
        for (let i = 0; i < 8; i++) {
            const surveyDate = getRandomDate();
            const createdAt = new Date().toISOString();

            if (isDiseaseTypeCrohn) {
                // Generate Crohn's survey data
                const abdominalPain = getRandomInt(0, 3);
                const stools = getRandomInt(0, 3);
                const generalWellbeing = getRandomInt(0, 4);
                const extraintestinalManifestations = getRandomInt(0, 9);
                const abdominalMass = getRandomInt(0, 5);
                const hematocrit = getRandomInt(0, 4);
                const weightLoss = getRandomInt(0, 10);

                // Calculate total score
                const totalScore = calculateCrohnTotalScore(
                    abdominalPain,
                    stools,
                    generalWellbeing,
                    extraintestinalManifestations,
                    abdominalMass,
                    hematocrit,
                    weightLoss
                );

                // Determine category based on total score
                const category = calculateCrohnCategory(totalScore);

                crohnSurveys.push({
                    id: uuidv4(),
                    patient_id: patientId,
                    survey_date: surveyDate,
                    survey_type: 'crohn',
                    abdominal_pain: abdominalPain,
                    stools: stools,
                    general_wellbeing: generalWellbeing,
                    extraintestinal_manifestations: extraintestinalManifestations,
                    abdominal_mass: abdominalMass,
                    hematocrit: hematocrit,
                    weight_loss: weightLoss,
                    total_score: totalScore,
                    category: category,
                    notes: `Auto-generated Crohn's survey #${i + 1}`,
                    created_at: createdAt,
                    updated_at: createdAt
                });
            } else {
                // Generate UC survey data
                const stoolFrequency = getRandomInt(0, 3);
                const rectalBleeding = getRandomInt(0, 3);
                const physicianGlobal = getRandomInt(0, 3);

                // Calculate total score (0-9)
                const totalScore = calculateUcTotalScore(
                    stoolFrequency,
                    rectalBleeding,
                    physicianGlobal
                );

                // Determine category based on total score
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
                    category: category,
                    notes: `Auto-generated UC survey #${i + 1}`,
                    created_at: createdAt,
                    updated_at: createdAt
                });
            }
        }
    }

    return {
        crohnSurveys,
        ucSurveys
    };
};

// Generate the survey data once
const { crohnSurveys, ucSurveys } = generateSurveyData();

// Export the generated data
export const mockCrohnSurveys = crohnSurveys;
export const mockUcSurveys = ucSurveys;