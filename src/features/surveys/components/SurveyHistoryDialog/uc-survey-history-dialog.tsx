import { useTranslation } from 'react-i18next';
import { formatDateDisplay } from '@/utils/common';
import { isUcSurvey, SurveyCategory, usePatientSurveys } from '../..';
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
  const { t } = useTranslation('surveys');
  const { data: surveys, isLoading } = usePatientSurveys(
    isOpen ? patientId : '',
  );

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
      title={t('history.ucTitle', 'Ulcerative Colitis Survey History')}
      className="max-h-[80vh] w-[90%] max-w-3xl px-6"
      isLoading={isLoading}
      isEmpty={surveys.length === 0}
      emptyText={t('noSurveys', 'No surveys available for this patient')}
    >
      <div className="mt-4 w-full flex-1 overflow-y-auto">
        {surveys.map(
          (survey) =>
            isUcSurvey(survey) && (
              <div key={survey.id} className="bg-background/10 rounded-sm p-4">
                {/* nagłówek karty */}
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-primary-accent text-lg font-semibold">
                    {formatDateDisplay(
                      new Date(
                        survey.updated_at
                          ? survey.updated_at
                          : survey.created_at,
                      ),
                    )}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-primary-accent font-semibold">
                      {t('totalScore')}:
                    </span>
                    <span className="text-primary-accent">
                      {survey.total_score}
                    </span>
                    <span
                      className={`ml-2 font-bold ${getColor(survey.category)}`}
                    >
                      {t(`category.${survey.category}`)}
                    </span>
                  </div>
                </div>

                {/* szczegóły pomiarów */}
                <div className="text-primary-accent grid grid-cols-2 gap-y-1 text-sm">
                  <p>
                    <span className="font-semibold">
                      {t('uc.stoolFrequency')}:
                    </span>{' '}
                    {survey.stool_frequency}
                  </p>
                  <p>
                    <span className="font-semibold">
                      {t('uc.rectalBleeding')}:
                    </span>{' '}
                    {survey.rectal_bleeding}
                  </p>
                  <p>
                    <span className="font-semibold">
                      {t('uc.physicianGlobal')}:
                    </span>{' '}
                    {survey.physician_global}
                  </p>
                </div>

                {/* notatki */}
                {survey.notes && (
                  <div className="text-primary-accent mt-3 border-t border-gray-600 pt-2 text-sm">
                    <span className="font-semibold">{t('notes')}:</span>{' '}
                    {survey.notes}
                  </div>
                )}
              </div>
            ),
        )}
      </div>
    </Dialog>
  );
};
