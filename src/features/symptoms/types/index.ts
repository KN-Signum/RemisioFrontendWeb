export interface SymptomDto {
    id?: string;
    patient_id: string;
    symptom_type: string;
    duration: string;
    pain_level: string;
    symptom_description: string;
    created_at?: string;
}