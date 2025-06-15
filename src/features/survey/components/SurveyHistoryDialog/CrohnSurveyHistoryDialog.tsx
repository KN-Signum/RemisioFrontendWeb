import { useTranslation } from 'react-i18next';

import { formatDateDisplay } from '@/utils/format-date-display';
import { formatValue } from '@/lib/utils/format_value';
import { usePatientCrohnSurveys } from '../../api/get-all-crohn-surveys';
import { CrohnSurveyDto, SurveyCategory } from '../../types';
import { BaseSurveyHistoryDialog } from './BaseSurveyHistoryDialog';

interface Props {
    patientId: string;
    isOpen: boolean;
    onClose: () => void;
}

export const CrohnSurveyHistoryDialog = ({ patientId, isOpen, onClose }: Props) => {
    const { t } = useTranslation();
    const { data, isLoading } = usePatientCrohnSurveys(isOpen ? patientId : '');
    const surveys = data?.surveys ?? [];

    const getColor = (c: SurveyCategory) =>
    ({ remission: 'text-green-500', mild: 'text-yellow-500', moderate: 'text-orange-500', severe: 'text-red-500' }[
        c
    ]);

    return (
        <BaseSurveyHistoryDialog
            isOpen={isOpen}
            onClose={onClose}
            title={t('survey.history.crohn_title', "Crohn's Disease Survey History")}
            isLoading={isLoading}
            empty={surveys.length === 0}
        >
            <div className="flex flex-col gap-4">
                {surveys.map((s: CrohnSurveyDto) => (
                    <div key={s.id} className="bg-background/10 rounded-sm p-4">
                        <div className="mb-2 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-primary-accent">
                                {formatDateDisplay(new Date(s.survey_date))}
                            </h3>
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-primary-accent">
                                    {t('survey.total_score')}:
                                </span>
                                <span className="text-primary-accent">{formatValue(s.total_score.toString())}</span>
                                <span className={`ml-2 font-bold ${getColor(s.category)}`}>
                                    {t(`survey.category.${s.category}`)}
                                </span>
                            </div>
                        </div>
                        <p className="text-sm">
                            {t('survey.crohn.abdominal_pain')}: {s.abdominal_pain} ·{' '}
                            {t('survey.crohn.stools')}: {s.stools}
                        </p>
                    </div>
                ))}
            </div>
        </BaseSurveyHistoryDialog>
    );
};
