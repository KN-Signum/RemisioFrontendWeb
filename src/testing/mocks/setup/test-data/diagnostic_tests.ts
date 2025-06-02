/* mockLabSamples.ts */

import type {
    LabSampleDto,
    Analyte,
    AnalyteHistoryDto,
    GetPatientLabSamplesDto
} from '@/features/diagnostic_tests';

import { mockPatients } from './patients';

export const mockLabSamples: LabSampleDto[] = (() => {
    const analyteDefs: {
        analyte: Analyte;
        unit: string;
        gen: (i: number) => number;
    }[] = [
            {
                analyte: 'ldl',
                unit: 'mg/dL',
                gen: i => 100 + (i % 5) * 5, // 100-120
            },
            {
                analyte: 'cea',
                unit: 'ng/mL',
                gen: i => Number((2.5 + (i % 4) * 0.4).toFixed(1)), // 2.5-3.7
            },
            {
                analyte: 'calprotectin_feces',
                unit: 'µg/g',
                gen: i => 150 + (i % 3) * 40, // 150-230
            },
            {
                analyte: 'hemoglobin',
                unit: 'g/dL',
                gen: i => Number((13.5 + (i % 4) * 0.3).toFixed(1)), // 13.5-14.4
            },
            {
                analyte: 'hct',
                unit: '%',
                gen: i => 38 + (i % 4), // 38-41
            },
            {
                analyte: 'leukocytes',
                unit: '10^3/µL',
                gen: i => Number((5.4 + (i % 4) * 0.4).toFixed(1)), // 5.4-6.6
            },
        ];

    const res: LabSampleDto[] = [];

    mockPatients.forEach((p, idx) => {
        ['2025-05-05T07:30:00Z', '2025-05-15T07:30:00Z'].forEach(
            (iso, batchIdx) => {
                analyteDefs.forEach(def => {
                    res.push({
                        id: `s-${p.id}-${batchIdx}-${def.analyte}`,
                        patientId: p.id,
                        analyte: def.analyte,
                        value: def.gen(idx + batchIdx),
                        unit: def.unit,
                        measuredAt: iso,
                    });
                });
            },
        );
    });

    return res;
})();

function buildAnalyteHistory(
    samples: LabSampleDto[],
): AnalyteHistoryDto[] {
    const map = new Map<Analyte, AnalyteHistoryDto>();

    for (const s of samples) {
        if (!map.has(s.analyte)) {
            map.set(s.analyte, { analyte: s.analyte, samples: [] });
        }
        map
            .get(s.analyte)!
            .samples.push({
                id: s.id,
                value: s.value,
                unit: s.unit,
                measuredAt: s.measuredAt,
            });
    }

    for (const hist of map.values()) {
        hist.samples.sort((a, b) =>
            a.measuredAt.localeCompare(b.measuredAt),
        );
    }

    return Array.from(map.values());
}

export const mockPatientLabSamples: GetPatientLabSamplesDto[] =
    mockPatients.map(p => {
        const samples = mockLabSamples.filter(
            s => s.patientId === p.id,
        );
        return {
            patient_id: p.id,
            samples,
            analytes: buildAnalyteHistory(samples),
        };
    });
