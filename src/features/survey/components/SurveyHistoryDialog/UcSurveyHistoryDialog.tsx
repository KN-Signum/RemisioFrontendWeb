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
                        {/* nagłówek karty */}
                        <div className="mb-3 flex items-center justify-between">
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

                        {/* szczegóły pomiarów */}
                        <div className="grid grid-cols-2 gap-y-1 text-sm text-primary-accent">
                            <p>
                                <span className="font-semibold">
                                    {t('survey.uc.stool_frequency')}:
                                </span>{' '}
                                {s.stool_frequency}
                            </p>
                            <p>
                                <span className="font-semibold">
                                    {t('survey.uc.rectal_bleeding')}:
                                </span>{' '}
                                {s.rectal_bleeding}
                            </p>
                            <p>
                                <span className="font-semibold">
                                    {t('survey.uc.physician_global')}:
                                </span>{' '}
                                {s.physician_global}
                            </p>
                        </div>

                        {/* notatki */}
                        {s.notes && (
                            <div className="mt-3 border-t border-gray-600 pt-2 text-sm text-primary-accent">
                                <span className="font-semibold">{t('survey.notes')}:</span>{' '}
                                {s.notes}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </BaseSurveyHistoryDialog>
    );
};
