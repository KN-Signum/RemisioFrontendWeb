import { useTranslation } from 'react-i18next';
import { formatDateDisplay } from '@/utils/format-date-display';
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
        (b.created_at ? Date.parse(b.created_at) : 0) -
        (a.created_at ? Date.parse(a.created_at) : 0),
    );

  if (!isOpen) return null;

  const levelColor = (lvl: string) =>
    ({
      None: 'text-gray-400',
      Mild: 'text-green-500',
      Moderate: 'text-yellow-500',
      Severe: 'text-orange-500',
      'Very Severe': 'text-red-500',
    })[lvl] ?? 'text-gray-400';

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
          {sorted.map((s: SymptomDto) => (
            <div key={s.id} className="bg-background/10 rounded-sm p-4">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-primary-accent text-lg font-semibold">
                  {s.created_at
                    ? formatDateDisplay(new Date(s.created_at))
                    : 'Unknown date'}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-primary-accent font-semibold">
                    {t('type')}:
                  </span>
                  <span className="text-primary-accent">{s.symptom_type}</span>
                  <span
                    className={`ml-2 font-bold ${levelColor(s.pain_level)}`}
                  >
                    {s.pain_level}
                  </span>
                </div>
              </div>

              <div className="text-primary-accent grid grid-cols-2 gap-y-1 text-sm">
                <p>
                  <span className="font-semibold">{t('duration')}:</span>{' '}
                  {s.duration}
                </p>
                <p>
                  <span className="font-semibold">{t('painLevel')}:</span>{' '}
                  {s.pain_level}
                </p>
              </div>

              {s.symptom_description && (
                <div className="mt-2 border-t border-gray-600 pt-2 text-sm">
                  <span className="font-semibold">{t('description')}:</span>{' '}
                  {s.symptom_description}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Dialog>
  );
};
