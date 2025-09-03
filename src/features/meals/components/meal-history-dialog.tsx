// src/features/meal/components/MealHistoryDialog.tsx
import { useTranslation } from 'react-i18next';
import { useMealsByPatientId } from '../api/get-meals-by-patientid';
import { MealDto } from '../types';
import { Dialog } from '@/components/ui/dialog';

interface Props {
  patientId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const MealHistoryDialog = ({ patientId, isOpen, onClose }: Props) => {
  const { t } = useTranslation('meals');
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

  return (
    <Dialog
      isOpen={isOpen}
      title={t('history.title', 'Meal History')}
      className="max-h-[80vh] w-[90%] max-w-3xl px-6"
      onClose={onClose}
      isLoading={isLoading}
      isEmpty={sorted.length == 0}
      emptyText={t('history.noMeals')}
    >
      <div className="mt-4 w-full flex-1 overflow-y-auto">
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
                        {t('notes', 'Notes')}:
                      </span>{' '}
                      {m.meal_notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Dialog>
  );
};
