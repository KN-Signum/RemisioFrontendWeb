export type Analyte =
    | 'cea'
    | 'ldl'
    | 'hbe_positive'
    | 'parasite_feces_positive'
    | 'calprotectin_feces'
    | 'creatinine_serum'
    | 'glucose_urine'
    | 'bacteria_urine_count'
    | 'erythrocytes'
    | 'mch'
    | 'pLcr'
    | 'hemoglobin'
    | 'hct'
    | 'leukocytes'
    | 'ob'

export interface GetPatientLabSamplesDto {
    patient_id: string;
    samples: LabSampleDto[];
    analytes: AnalyteHistoryDto[];
}


export interface LabSampleDto<U extends string = string> {
    id: string;
    patientId: string;
    analyte: Analyte;
    value: number;
    unit: U;
    measuredAt: string;
}

export interface AnalyteHistoryDto<U extends string = string> {
    analyte: Analyte;
    samples: {
        id: string;
        value: number;
        unit: U;
        measuredAt: string;
    }[];
}

export interface LabSamplesPageDto {
    items: LabSampleDto[];
    total: number;
}

export interface CreateLabSampleDto {
    patientId: string;
    analyte: Analyte;
    value: number;
    unit: string;
    measuredAt: string;
    batchId?: string;
}
