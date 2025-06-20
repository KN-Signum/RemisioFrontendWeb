import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { formatDateDisplay } from '@/utils/format-date-display';
import { SymptomDto } from '../types';

interface Props {
  symptoms?: SymptomDto[];
  loading: boolean;
  error?: unknown;
  isOpen: boolean;
  onClose: () => void;
}


export const SymptomHistoryDialog = ({
  symptoms,
  loading,
  isOpen,
  onClose,
}: Props) => {
  const { t } = useTranslation();

  /* sortujemy przekazaną tablicę */
  const sorted = (symptoms ?? []).slice().sort(
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
  }[lvl] ?? 'text-gray-400');

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="bg-foreground/90 flex max-h-[80vh] w-[90%] max-w-3xl flex-col rounded-sm px-6 pt-6 pb-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="flex w-full items-center justify-between">
          <div className="size-8" />
          <span className="text-2xl font-bold">
            {t('symptoms.history.title', 'Symptoms History')}
          </span>
          <div
            className="hover:bg-foreground flex size-8 items-center justify-center rounded-full text-3xl font-bold hover:cursor-pointer"
            onClick={onClose}
          >
            &times;
          </div>
        </div>

        {/* body */}
        <div className="mt-4 flex-1 overflow-y-auto">
          {loading ? (
            <Spinner />
          ) : sorted.length === 0 ? (
            <EmptyState msg={t('symptoms.history.no_symptoms')} />
          ) : (
            <div className="flex flex-col gap-4">
              {sorted.map((s: SymptomDto) => (
                <div key={s.id} className="bg-background/10 rounded-sm p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-primary-accent">
                      {s.created_at
                        ? formatDateDisplay(new Date(s.created_at))
                        : 'Unknown date'}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-primary-accent">
                        {t('symptoms.type')}:
                      </span>
                      <span className="text-primary-accent">{s.symptom_type}</span>
                      <span className={`ml-2 font-bold ${levelColor(s.pain_level)}`}>
                        {s.pain_level}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-y-1 text-sm text-primary-accent">
                    <p>
                      <span className="font-semibold">
                        {t('symptoms.duration')}:
                      </span>{' '}
                      {s.duration}
                    </p>
                    <p>
                      <span className="font-semibold">
                        {t('symptoms.pain_level')}:
                      </span>{' '}
                      {s.pain_level}
                    </p>
                  </div>

                  {s.symptom_description && (
                    <div className="mt-2 border-t border-gray-600 pt-2 text-sm">
                      <span className="font-semibold">
                        {t('symptoms.description')}:
                      </span>{' '}
                      {s.symptom_description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* footer */}
        <div className="mt-4 flex justify-end">
          <Button onClick={onClose}>{t('common.close', 'Close')}</Button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

const Spinner = () => (
  <div className="flex h-40 items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-t-2 border-b-2 border-white" />
  </div>
);

const EmptyState = ({ msg }: { msg: string }) => (
  <div className="flex h-40 items-center justify-center">
    <p className="text-lg text-primary-accent">{msg}</p>
  </div>
);
