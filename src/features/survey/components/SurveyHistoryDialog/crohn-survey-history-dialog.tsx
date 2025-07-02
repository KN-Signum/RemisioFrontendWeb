import { useTranslation } from 'react-i18next';
import { formatDateDisplay } from '@/utils/format-date-display';
import { formatValue } from '@/lib/utils/format_value';
import { CrohnSurveyDto, SurveyCategory, usePatientCrohnSurveys } from '../..';
import { BaseSurveyHistoryDialog } from './base-survey-history-dialog';

interface Props {
  patientId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const CrohnSurveyHistoryDialog = ({
  patientId,
  isOpen,
  onClose,
}: Props) => {
  const { t } = useTranslation();
  const { data, isLoading } = usePatientCrohnSurveys(isOpen ? patientId : '');
  const surveys = data?.surveys ?? [];

  const color = (c: SurveyCategory) =>
    ({
      remission: 'text-green-500',
      mild: 'text-yellow-500',
      moderate: 'text-orange-500',
      severe: 'text-red-500',
    })[c];

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
            {/* header */}
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-primary-accent text-lg font-semibold">
                {formatDateDisplay(new Date(s.survey_date))}
              </h3>
              <div className="flex items-center gap-2">
                <span className={`font-bold ${color(s.category)}`}>
                  {t(`survey.category.${s.category}`)}
                </span>
                <span className="text-primary-accent font-semibold">
                  {t('survey.total_score')}:
                </span>
                <span className="text-primary-accent">
                  {formatValue(s.total_score.toString())}
                </span>
              </div>
            </div>

            {/* details */}
            <div className="text-primary-accent grid grid-cols-2 gap-y-1 text-sm">
              <p>
                <span className="font-semibold">
                  {t('survey.crohn.abdominal_pain')}:
                </span>{' '}
                {s.abdominal_pain}
              </p>
              <p>
                <span className="font-semibold">
                  {t('survey.crohn.stools')}:
                </span>{' '}
                {s.stools}
              </p>
              <p>
                <span className="font-semibold">
                  {t('survey.crohn.general_wellbeing')}:
                </span>{' '}
                {s.general_wellbeing}
              </p>
              <p>
                <span className="font-semibold">
                  {t('survey.crohn.abdominal_mass')}:
                </span>{' '}
                {s.abdominal_mass}
              </p>
              <p>
                <span className="font-semibold">
                  {t('survey.crohn.extraintestinal_manifestations')}:
                </span>{' '}
                {s.extraintestinal_manifestations}
              </p>
              <p>
                <span className="font-semibold">
                  {t('survey.crohn.hematocrit')}:
                </span>{' '}
                {s.hematocrit}
              </p>
              <p>
                <span className="font-semibold">
                  {t('survey.crohn.antidiarrheal_use')}:
                </span>{' '}
                {t(s.antidiarrheal_use ? 'yes' : 'no')}
              </p>
              <p>
                <span className="font-semibold">
                  {t('survey.crohn.weight')}:
                </span>{' '}
                {s.weight}
              </p>
            </div>

            {/* notes */}
            {s.notes && (
              <div className="text-primary-accent mt-3 border-t border-gray-600 pt-2 text-sm">
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
