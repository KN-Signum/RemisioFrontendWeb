import { PatientScoreDto } from '@/features/score';
import { mockPatients } from './patients';
import { v4 as uuidv4 } from 'uuid';

export const mockPatientScores: PatientScoreDto[] = (() => {
    const scores: PatientScoreDto[] = [];

    // Current date (using 2025-05-20 as the reference date from the mock data)
    const currentDate = new Date('2025-05-20T00:00:00Z');

    // Create sample scores for each patient
    mockPatients.forEach((patient) => {
        // Determine score range based on disease type
        const isUlcerativeColitis = patient.disease_type === 'ulcerative_colitis';

        // Generate dates for the past 3 years
        const dates: Date[] = [];

        // Last 8 weeks - weekly records
        for (let i = 0; i < 8; i++) {
            const date = new Date(currentDate);
            date.setDate(date.getDate() - (i * 7));
            dates.push(date);
        }

        // Previous 10 months - biweekly records
        for (let i = 2; i < 12; i++) {
            const date = new Date(currentDate);
            date.setDate(date.getDate() - (8 * 7) - (i * 14));
            dates.push(date);
        }

        // Remaining time to complete 3 years - monthly records
        for (let i = 0; i < 24; i++) {
            const date = new Date(currentDate);
            date.setDate(date.getDate() - (8 * 7) - (10 * 14) - (i * 30));
            dates.push(date);
        }

        // Generate scores for each date
        dates.forEach((date, index) => {
            // Generate appropriate score based on disease type
            let score: number;

            if (isUlcerativeColitis) {
                // UC scores range from 0-12 (Mayo score)
                // Create some patterns in the data - improvement over time
                if (index < 8) {
                    // Recent scores - better condition (remission to mild)
                    // For UC, remission is 0-2, mild is 3-5
                    score = Math.floor(Math.random() * 6);
                } else if (index < 20) {
                    // Mid-term scores - moderate condition
                    // For UC, moderate is 6-8
                    score = 6 + Math.floor(Math.random() * 3);
                } else {
                    // Older scores - worse condition
                    // For UC, severe is 9-12
                    score = 9 + Math.floor(Math.random() * 4);
                }
            } else {
                // Crohn's Disease scores range from 0-450 (CDAI score)
                // Create some patterns in the data - improvement over time
                if (index < 8) {
                    // Recent scores - better condition (remission to mild)
                    // For Crohn's, remission is <150, mild is 150-220
                    score = Math.floor(Math.random() * 220);
                } else if (index < 20) {
                    // Mid-term scores - moderate condition
                    // For Crohn's, moderate is 220-350
                    score = 220 + Math.floor(Math.random() * 130);
                } else {
                    // Older scores - worse condition
                    // For Crohn's, severe is >350
                    score = 350 + Math.floor(Math.random() * 100);
                }
            }

            const patientScore: PatientScoreDto = {
                id: uuidv4(),
                patient_id: patient.id,
                score_date: date.toISOString(),
                score: score,
                notes: `${patient.name}'s ${isUlcerativeColitis ? 'UC' : 'Crohn\'s'} assessment - Score: ${score}`,
                created_at: date.toISOString(),
                updated_at: date.toISOString()
            };

            scores.push(patientScore);
        });
    });

    // Sort all scores by date (newest first)
    scores.sort((a, b) => new Date(b.score_date).getTime() - new Date(a.score_date).getTime());

    return scores;
})();