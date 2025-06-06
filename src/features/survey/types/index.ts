// Common types
export type SurveyCategory = 'remission' | 'mild' | 'moderate' | 'severe';

// Base survey interface with common properties
interface BaseSurveyDto {
    id: string;
    patient_id: string;
    survey_date: string;
    total_score: number;
    category: SurveyCategory;
    notes?: string;
    created_at: string;
    updated_at?: string;
}

// Crohn's Disease Survey
export interface CrohnSurveyDto extends BaseSurveyDto {
    survey_type: 'crohn';
    abdominal_pain: number; // 0-3
    stools: number; // 0-3
    general_wellbeing: number; // 0-4
    extraintestinal_manifestations: number; // 0-9
    abdominal_mass: number; // 0-5
    hematocrit: number; // 0-4
    weight_loss: number; // 0-10
}

export interface CreateCrohnSurveyDto {
    patient_id: string;
    survey_date: string;
    abdominal_pain: number; // 0-3
    stools: number; // 0-3
    general_wellbeing: number; // 0-4
    extraintestinal_manifestations: number; // 0-9
    abdominal_mass: number; // 0-5
    hematocrit: number; // 0-4
    weight_loss: number; // 0-10
    notes?: string;
}

// Ulcerative Colitis Survey
export interface UcSurveyDto extends BaseSurveyDto {
    survey_type: 'uc';
    stool_frequency: number; // 0-3
    rectal_bleeding: number; // 0-3
    physician_global: number; // 0-3
}

export interface CreateUcSurveyDto {
    patient_id: string;
    survey_date: string;
    stool_frequency: number; // 0-3
    rectal_bleeding: number; // 0-3
    physician_global: number; // 0-3
    notes?: string;
}

// Response types
export interface GetPatientSurveysDto<T extends BaseSurveyDto> {
    patient_id: string;
    surveys: T[];
}

// Helper functions for Crohn's Disease scoring
export const calculateCrohnTotalScore = (
    abdominalPain: number,
    stools: number,
    generalWellbeing: number,
    extraintestinalManifestations: number,
    abdominalMass: number,
    hematocrit: number,
    weightLoss: number
): number => {
    return (
        abdominalPain * 7 +
        stools * 2 +
        generalWellbeing * 7 +
        extraintestinalManifestations +
        abdominalMass * 5 +
        hematocrit +
        weightLoss * 3
    );
};

export const calculateCrohnCategory = (totalScore: number): SurveyCategory => {
    if (totalScore < 150) return 'remission';
    if (totalScore < 220) return 'mild';
    if (totalScore < 450) return 'moderate';
    return 'severe';
};

// Helper functions for UC scoring
export const calculateUcTotalScore = (
    stoolFrequency: number,
    rectalBleeding: number,
    physicianGlobal: number
): number => {
    return stoolFrequency + rectalBleeding + physicianGlobal;
};

export const calculateUcCategory = (totalScore: number): SurveyCategory => {
    if (totalScore <= 2) return 'remission';
    if (totalScore <= 4) return 'mild';
    if (totalScore <= 6) return 'moderate';
    return 'severe';
};