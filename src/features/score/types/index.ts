export interface PatientScoreDto {
    id: string;
    patient_id: string;
    score_date: string;
    score: number;
    notes?: string;
    created_at: string;
    updated_at?: string;
}

export interface CreatePatientScoreDto {
    patient_id: string;
    score_date: string;
    score: number;
    notes?: string;
}

export interface GetPatientScoresDto {
    patient_id: string;
    scores: PatientScoreDto[];
}