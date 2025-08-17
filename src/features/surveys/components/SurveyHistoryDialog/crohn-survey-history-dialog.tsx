import { useTranslation } from 'react-i18next';
import { formatDateDisplay } from '@/utils/format-date-display';
import { formatValue } from '@/utils/format_value';
import { isCrohnSurvey, SurveyCategory, usePatientSurveys } from '../..';
import { Dialog } from '@/components/ui/dialog';

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
  const { t } = useTranslation('surveys');
  const { data, isLoading } = usePatientSurveys(isOpen ? patientId : '');
  const surveys = data?.surveys ?? [];

  const color = (c: SurveyCategory) =>
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
      title={t('history.crohnTitle', "Crohn's Disease Survey History")}
      className="max-h-[80vh] w-[90%] max-w-3xl px-6"
      isLoading={isLoading}
      isEmpty={surveys.length === 0}
      emptyText={t(
        'history.noSurveys',
        'No surveys available for this patient',
      )}
    >
      <div className="mt-4 w-full flex-1 overflow-y-auto">
        {surveys.map(
          (survey) =>
            isCrohnSurvey(survey) && (
              <div key={survey.id} className="bg-background/10 rounded-sm p-4">
                {/* header */}
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-primary-accent text-lg font-semibold">
                    {formatDateDisplay(new Date(survey.survey_date))}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className={`font-bold ${color(survey.category)}`}>
                      {t(`category.${survey.category}`)}
                    </span>
                    <span className="text-primary-accent font-semibold">
                      {t('totalScore')}:
                    </span>
                    <span className="text-primary-accent">
                      {formatValue(survey.total_score.toString())}
                    </span>
                  </div>
                </div>

                {/* details */}
                <div className="text-primary-accent grid grid-cols-2 gap-y-1 text-sm">
                  <p>
                    <span className="font-semibold">
                      {t('crohn.abdominalPain')}:
                    </span>{' '}
                    {survey.abdominal_pain}
                  </p>
                  <p>
                    <span className="font-semibold">{t('crohn.stools')}:</span>{' '}
                    {survey.stools}
                  </p>
                  <p>
                    <span className="font-semibold">
                      {t('crohn.generalWellbeing')}:
                    </span>{' '}
                    {survey.general_wellbeing}
                  </p>
                  <p>
                    <span className="font-semibold">
                      {t('crohn.abdominalMass')}:
                    </span>{' '}
                    {survey.abdominal_mass}
                  </p>
                  <p>
                    <span className="font-semibold">
                      {t('crohn.extraintestinalManifestations')}:
                    </span>{' '}
                    {survey.extraintestinal_manifestations}
                  </p>
                  <p>
                    <span className="font-semibold">
                      {t('crohn.hematocrit')}:
                    </span>{' '}
                    {survey.hematocrit}
                  </p>
                  <p>
                    <span className="font-semibold">
                      {t('crohn.antidiarrhealUse')}:
                    </span>{' '}
                    {t(survey.antidiarrheal_use ? 'yes' : 'no')}
                  </p>
                  <p>
                    <span className="font-semibold">{t('crohn.weight')}:</span>{' '}
                    {survey.weight}
                  </p>
                </div>

                {/* notes */}
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
