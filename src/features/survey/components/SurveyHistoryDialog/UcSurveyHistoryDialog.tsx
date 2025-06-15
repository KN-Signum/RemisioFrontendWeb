import { useTranslation } from 'react-i18next';

import { formatDateDisplay } from '@/utils/format-date-display';
import { usePatientUcSurveys } from '../../api/get-all-uc-surveys';
import { SurveyCategory, UcSurveyDto } from '../../types';
import { BaseSurveyHistoryDialog } from './BaseSurveyHistoryDialog';

interface Props {
    patientId: string;
    isOpen: boolean;
    onClose: () => void;
}

export const UcSurveyHistoryDialog = ({ patientId, isOpen, onClose }: Props) => {
    const { t } = useTranslation();
    const { data, isLoading } = usePatientUcSurveys(isOpen ? patientId : '');
    const surveys = data?.surveys ?? [];

    const getColor = (c: SurveyCategory) =>
    ({ remission: 'text-green-500', mild: 'text-yellow-500', moderate: 'text-orange-500', severe: 'text-red-500' }[
        c
    ]);

    return (
        <BaseSurveyHistoryDialog
            isOpen={isOpen}
            onClose={onClose}
            title={t('survey.history.uc_title', 'Ulcerative Colitis Survey History')}
            isLoading={isLoading}
            empty={surveys.length === 0}
        >
            <div className="flex flex-col gap-4">
                {surveys.map((s: UcSurveyDto) => (
                    <div key={s.id} className="bg-background/10 rounded-sm p-4">
                        <div className="mb-2 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-primary-accent">
                                {formatDateDisplay(new Date(s.survey_date))}
                            </h3>
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-primary-accent">
                                    {t('survey.total_score')}:
                                </span>
                                <span className="text-primary-accent">{s.total_score}</span>
                                <span className={`ml-2 font-bold ${getColor(s.category)}`}>
                                    {t(`survey.category.${s.category}`)}
                                </span>
                            </div>
                        </div>
                        <p className="text-sm">
                            {t('survey.uc.stool_frequency')}: {s.stool_frequency} ·{' '}
                            {t('survey.uc.rectal_bleeding')}: {s.rectal_bleeding}
                        </p>
                    </div>
                ))}
            </div>
        </BaseSurveyHistoryDialog>
    );
};
