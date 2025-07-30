import { useTranslation } from 'react-i18next';
import { formatDateDisplay } from '@/utils/format-date-display';
import { SurveyCategory, UcSurveyDto, usePatientUcSurveys } from '../..';
import { Dialog } from '@/components/ui/dialog';

interface Props {
  patientId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const UcSurveyHistoryDialog = ({
  patientId,
  isOpen,
  onClose,
}: Props) => {
  const { t } = useTranslation();
  const { data, isLoading } = usePatientUcSurveys(isOpen ? patientId : '');
  const surveys = data?.surveys ?? [];

  const getColor = (c: SurveyCategory) =>
    ({
      remission: 'text-green-500',
      mild: 'text-yellow-500',
      moderate: 'text-orange-500',
      severe: 'text-red-500',
    })[c];

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={t('survey.history.uc_title', 'Ulcerative Colitis Survey History')}
      className="max-h-[80vh] w-[90%] max-w-3xl px-6"
      isLoading={isLoading}
      isEmpty={surveys.length === 0}
      emptyText="No surveys available"
    >
      <div className="mt-4 w-full flex-1 overflow-y-auto">
        {surveys.map((s: UcSurveyDto) => (
          <div key={s.id} className="bg-background/10 rounded-sm p-4">
            {/* nagłówek karty */}
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-primary-accent text-lg font-semibold">
                {formatDateDisplay(new Date(s.survey_date))}
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-primary-accent font-semibold">
                  {t('survey.total_score')}:
                </span>
                <span className="text-primary-accent">{s.total_score}</span>
                <span className={`ml-2 font-bold ${getColor(s.category)}`}>
                  {t(`survey.category.${s.category}`)}
                </span>
              </div>
            </div>

            {/* szczegóły pomiarów */}
            <div className="text-primary-accent grid grid-cols-2 gap-y-1 text-sm">
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
              <div className="text-primary-accent mt-3 border-t border-gray-600 pt-2 text-sm">
                <span className="font-semibold">{t('survey.notes')}:</span>{' '}
                {s.notes}
              </div>
            )}
          </div>
        ))}
      </div>
    </Dialog>
  );
};
