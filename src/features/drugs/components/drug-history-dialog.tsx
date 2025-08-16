import { useTranslation } from 'react-i18next';
import { DrugDto } from '../types';
import { Loading } from '@/components/ui/loading';
import { Dialog } from '@/components/ui/dialog';

interface Props {
  drugs?: DrugDto[];
  loading: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export const DrugHistoryDialog = ({
  drugs,
  loading,
  isOpen,
  onClose,
}: Props) => {
  const { t } = useTranslation('drugs');
  const format = (d: string) => new Date(d).toLocaleDateString();

  // sortujemy to co dostaliśmy
  const sorted = (drugs ?? [])
    .slice()
    .sort((a, b) => Date.parse(b.dateFrom) - Date.parse(a.dateFrom));

  return (
    <Dialog
      isOpen={isOpen}
      title={t('history.title', 'Medications History')}
      className="max-h-[80vh] w-[90%] max-w-3xl px-6"
      onClose={onClose}
      isLoading={loading}
      isEmpty={sorted.length == 0}
      emptyText={t('history.noDrugs', 'No medications recorded')}
    >
      <div className="mt-4 w-full flex-1 overflow-y-auto">
        {loading ? (
          <Loading size={50} className="mt-5 overflow-hidden" />
        ) : sorted.length == 0 ? (
          <div className="flex h-40 items-center justify-center">
            <p className="text-primary-accent text-lg">
              {t('history.noDrugs', 'No medications recorded')}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {sorted.map((d: DrugDto) => (
              <div key={d.id} className="bg-background/10 rounded-sm p-4">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-primary-accent text-lg font-semibold">
                    {d.name}
                  </h3>
                  <span className="text-primary-accent">{d.dosage}</span>
                </div>

                <div className="text-primary-accent grid grid-cols-2 gap-y-1 text-sm">
                  <p>
                    <span className="font-semibold">
                      {t('dateFrom', 'Start Date')}:
                    </span>{' '}
                    {format(d.dateFrom)}
                  </p>
                  <p>
                    <span className="font-semibold">
                      {t('dateTo', 'End Date')}:
                    </span>{' '}
                    {format(d.dateTo)}
                  </p>
                  <p className="col-span-2">
                    <span className="font-semibold">
                      {t('times', 'Schedule')}:
                    </span>{' '}
                    {d.times.join(', ')}
                  </p>
                </div>

                {d.additionalInfo && (
                  <div className="mt-2 border-t border-gray-600 pt-2 text-sm">
                    <span className="font-semibold">
                      {t('additionalInfo', 'Notes')}:
                    </span>{' '}
                    {d.additionalInfo}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Dialog>
  );
};
