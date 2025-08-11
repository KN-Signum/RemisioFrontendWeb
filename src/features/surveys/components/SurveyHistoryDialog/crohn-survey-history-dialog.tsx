import { useTranslation } from 'react-i18next';
import { formatDateDisplay } from '@/utils/format-date-display';
import { formatValue } from '@/utils/format_value';
import { CrohnSurveyDto, SurveyCategory, usePatientCrohnSurveys } from '../..';
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
        {surveys.map((s: CrohnSurveyDto) => (
          <div key={s.id} className="bg-background/10 rounded-sm p-4">
            {/* header */}
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-primary-accent text-lg font-semibold">
                {formatDateDisplay(new Date(s.survey_date))}
              </h3>
              <div className="flex items-center gap-2">
                <span className={`font-bold ${color(s.category)}`}>
                  {t(`category.${s.category}`)}
                </span>
                <span className="text-primary-accent font-semibold">
                  {t('totalScore')}:
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
                  {t('crohn.abdominalPain')}:
                </span>{' '}
                {s.abdominal_pain}
              </p>
              <p>
                <span className="font-semibold">{t('crohn.stools')}:</span>{' '}
                {s.stools}
              </p>
              <p>
                <span className="font-semibold">
                  {t('crohn.generalWellbeing')}:
                </span>{' '}
                {s.general_wellbeing}
              </p>
              <p>
                <span className="font-semibold">
                  {t('crohn.abdominalMass')}:
                </span>{' '}
                {s.abdominal_mass}
              </p>
              <p>
                <span className="font-semibold">
                  {t('crohn.extraintestinalManifestations')}:
                </span>{' '}
                {s.extraintestinal_manifestations}
              </p>
              <p>
                <span className="font-semibold">{t('crohn.hematocrit')}:</span>{' '}
                {s.hematocrit}
              </p>
              <p>
                <span className="font-semibold">
                  {t('crohn.antidiarrhealUse')}:
                </span>{' '}
                {t(s.antidiarrheal_use ? 'yes' : 'no')}
              </p>
              <p>
                <span className="font-semibold">{t('crohn.weight')}:</span>{' '}
                {s.weight}
              </p>
            </div>

            {/* notes */}
            {s.notes && (
              <div className="text-primary-accent mt-3 border-t border-gray-600 pt-2 text-sm">
                <span className="font-semibold">{t('notes')}:</span> {s.notes}
              </div>
            )}
          </div>
        ))}
      </div>
    </Dialog>
  );
};
