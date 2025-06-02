import { http, HttpResponse } from 'msw';
import { API_URL } from '@/config/constants';
import { db } from '..';

export const getPatientLabSamples = http.get(
    `${API_URL}/api/get_patient_lab_samples/:patientId`,
    ({ params }) => {
        console.log('[MSW] handler hit', params);
        const { patientId } = params as { patientId: string };

        const samplesRaw = db.labSample
            .getAll()
            .filter((s) => s.patientId === patientId);

        const samples = samplesRaw.map(({ patientId, measuredAt, ...rest }) => ({
            ...rest,
            patientId: patientId,
            measuredAt: measuredAt,
        }));

        const analyteMap = new Map<string, any>();

        samples.forEach((s) => {
            if (!analyteMap.has(s.analyte)) {
                analyteMap.set(s.analyte, { analyte: s.analyte, samples: [] });
            }
            analyteMap.get(s.analyte).samples.push({
                id: s.id,
                value: s.value,
                unit: s.unit,
                measuredAt: s.measuredAt,
            });
        });

        analyteMap.forEach((hist) =>
            hist.samples.sort((a: any, b: any) =>
                a.measuredAt.localeCompare(b.measuredAt),
            ),
        );

        const dto = {
            patient_id: patientId,
            samples,
            analytes: [...analyteMap.values()],
        };

        return HttpResponse.json({ status: 200, content: dto });
    },
);

export const handlers = [getPatientLabSamples];
