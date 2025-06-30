// src/features/meal/components/MealHistoryDialog.tsx
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { useMealsByPatientId } from '../api/get-meals-by-patientid';
import { MealDto } from '../types';
import { Loading } from '@/components/ui/loading';

interface Props {
  patientId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const MealHistoryDialog = ({ patientId, isOpen, onClose }: Props) => {
  const { t } = useTranslation();
  const { data: meals, isLoading } = useMealsByPatientId(
    isOpen ? patientId : '',
  );
  const formatTime = (d: string) =>
    new Date(d).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const sorted = (meals ?? [])
    .slice()
    .sort((a, b) => Date.parse(b.meal_date) - Date.parse(a.meal_date));

  const grouped: Record<string, MealDto[]> = {};
  sorted.forEach((m) => {
    const key = new Date(m.meal_date).toLocaleDateString();
    (grouped[key] ??= []).push(m);
  });

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
          <span className="text-primary-accent text-2xl font-bold">
            {t('meal.history.title', 'Meal History')}
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
          {isLoading ? (
            <Loading size={50} className="mt-5 overflow-hidden" />
          ) : sorted.length == 0 ? (
            <EmptyState msg={t('meal.history.no_meals')} />
          ) : (
            <div className="flex flex-col gap-4">
              {Object.entries(grouped).map(([date, list]) => (
                <div key={date} className="mb-4">
                  <h3 className="text-primary-accent mb-2 text-lg font-bold">
                    {date}
                  </h3>
                  {list.map((m) => (
                    <div
                      key={m.id}
                      className="bg-background/10 mb-3 rounded-sm p-4"
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <h4 className="text-primary-accent text-lg font-semibold">
                          {m.meal_name}
                        </h4>
                        <span className="text-primary-accent text-sm font-medium">
                          {formatTime(m.meal_date)}
                        </span>
                      </div>

                      {m.image_url && (
                        <div className="mt-2 mb-3 flex justify-center">
                          <img
                            src={m.image_url}
                            alt={m.meal_name}
                            className="max-h-40 rounded-sm object-cover"
                            onError={(e) =>
                              (e.currentTarget.style.display = 'none')
                            }
                          />
                        </div>
                      )}

                      {m.ontology && (
                        <div className="text-primary-accent mb-2 flex flex-wrap gap-1">
                          {m.ontology.split(',').map((tag) => (
                            <span
                              key={tag}
                              className="bg-secondary/30 inline-block rounded-full px-2 py-1 text-xs"
                            >
                              {tag.trim()}
                            </span>
                          ))}
                        </div>
                      )}

                      {m.meal_notes && (
                        <div className="mt-2 border-t border-gray-600 pt-2 text-sm">
                          <span className="font-semibold">
                            {t('meal.notes', 'Notes')}:
                          </span>{' '}
                          {m.meal_notes}
                        </div>
                      )}
                    </div>
                  ))}
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

const EmptyState = ({ msg }: { msg: string }) => (
  <div className="flex h-40 items-center justify-center">
    <p className="text-primary-accent text-lg">{msg}</p>
  </div>
);
