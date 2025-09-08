import { useTranslation } from 'react-i18next';
import { formatDateDisplay } from '@/utils/common';
import { SymptomDto, useSymptomsByPatientId } from '..';
import { Dialog } from '@/components/ui/dialog';

interface Props {
  patientId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const SymptomHistoryDialog = ({ patientId, isOpen, onClose }: Props) => {
  const { t } = useTranslation('symptoms');
  const { data: symptoms, isLoading: loading } = useSymptomsByPatientId(
    isOpen ? patientId : '',
  );

  /* sortujemy przekazaną tablicę */
  const sorted = (symptoms ?? [])
    .slice()
    .sort(
      (a, b) =>
        (b.date_added ? Date.parse(b.date_added) : 0) -
        (a.date_added ? Date.parse(a.date_added) : 0),
    );

  if (!isOpen) return null;

  // Todo: Make better colors
  const PainlevelColor = (lvl: number) => {
    if (lvl <= 2) return 'text-gray-400';
    if (lvl <= 4) return 'text-green-500';
    if (lvl <= 6) return 'text-yellow-500';
    if (lvl <= 8) return 'text-orange-500';
    return 'text-red-500';
  };

  const PainLevelText = (lvl: number) => {
    if (lvl <= 2) return 'Mild';
    if (lvl <= 4) return 'Moderate';
    if (lvl <= 6) return 'Severe';
    if (lvl <= 8) return 'Very Severe';
    return 'Extreme';
  };

  return (
    <Dialog
      isOpen={isOpen}
      title={t('history.title', 'Symptoms History')}
      className="max-h-[80vh] w-[90%] max-w-3xl px-6"
      onClose={onClose}
      isLoading={loading}
      isEmpty={sorted.length == 0}
      emptyText={t('history.noSymptoms')}
    >
      <div className="mt-4 w-full flex-1 overflow-y-auto">
        <div className="flex flex-col gap-4">
          {sorted.map((symptom: SymptomDto) => (
            <div key={symptom.id} className="bg-background/10 rounded-sm p-4">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-primary-accent text-lg font-semibold">
                  {symptom.date_added
                    ? formatDateDisplay(new Date(symptom.date_added))
                    : 'Unknown date'}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-primary-accent font-semibold">
                    {t('type')}:
                  </span>
                  <span className="text-primary-accent">
                    {symptom.symptom_type}
                  </span>
                  <span
                    className={`ml-2 font-bold ${PainlevelColor(symptom.pain)}`}
                  >
                    {PainLevelText(symptom.pain)}
                  </span>
                </div>
              </div>

              <div className="text-primary-accent grid grid-cols-2 gap-y-1 text-sm">
                <p>
                  <span className="font-semibold">{t('duration')}:</span>{' '}
                  {symptom.duration}
                </p>
                <p>
                  <span className="font-semibold">{t('painLevel')}:</span>{' '}
                  {symptom.pain}
                </p>
              </div>

              {symptom.additional_description && (
                <div className="mt-2 border-t border-gray-600 pt-2 text-sm">
                  <span className="font-semibold">{t('description')}:</span>{' '}
                  {symptom.additional_description}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Dialog>
  );
};
