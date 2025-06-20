import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { DrugDto } from '../types';

interface Props {
  drugs?: DrugDto[];
  loading: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export const DrugHistoryDialog = ({ drugs, loading, isOpen, onClose }: Props) => {
  const { t } = useTranslation();
  const format = (d: string) => new Date(d).toLocaleDateString();

  // sortujemy to co dostaliśmy
  const sorted = (drugs ?? []).slice().sort(
    (a, b) => Date.parse(b.dateFrom) - Date.parse(a.dateFrom),
  );

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9998] flex items-center justify-center backdrop-blur-xs"
      onClick={onClose}>
      <div className="bg-foreground/90 flex max-h-[80vh] w-[90%] max-w-3xl flex-col rounded-sm px-6 pt-6 pb-6" onClick={(e) => e.stopPropagation()}>
        {/* header */}
        <div className="flex w-full items-center justify-between">
          <div className="size-8" />
          <span className="text-2xl font-bold text-primary-accent">
            {t('drug.history.title', 'Medications History')}
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
            <div className="flex h-40 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-t-2 border-b-2 border-white" />
            </div>
          ) : sorted.length === 0 ? (
            <div className="flex h-40 items-center justify-center">
              <p className="text-lg text-primary-accent">
                {t('drug.history.no_drugs', 'No medications recorded')}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {sorted.map((d: DrugDto) => (
                <div key={d.id} className="bg-background/10 rounded-sm p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-primary-accent">{d.name}</h3>
                    <span className="text-primary-accent">{d.dosage}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-y-1 text-sm text-primary-accent">
                    <p>
                      <span className="font-semibold">
                        {t('drug.dateFrom', 'Start Date')}:
                      </span>{' '}
                      {format(d.dateFrom)}
                    </p>
                    <p>
                      <span className="font-semibold">
                        {t('drug.dateTo', 'End Date')}:
                      </span>{' '}
                      {format(d.dateTo)}
                    </p>
                    <p className="col-span-2">
                      <span className="font-semibold">
                        {t('drug.times', 'Schedule')}:
                      </span>{' '}
                      {d.times.join(', ')}
                    </p>
                  </div>

                  {d.additionalInfo && (
                    <div className="mt-2 border-t border-gray-600 pt-2 text-sm">
                      <span className="font-semibold">
                        {t('drug.additionalInfo', 'Notes')}:
                      </span>{' '}
                      {d.additionalInfo}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* footer */}
        <div className="mt-4 flex justify-end text-primary-accent">
          <Button onClick={onClose}>{t('common.close', 'Close')}</Button>
        </div>
      </div>
    </div>,
    document.body,
  );
};
