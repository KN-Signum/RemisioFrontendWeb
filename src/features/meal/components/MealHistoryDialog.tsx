import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { BiRestaurant } from 'react-icons/bi';
import { Button } from '@/components/ui/button';
import { MealDto } from '../types';
import { useQuery } from '@tanstack/react-query';
import { getMealsByPatientId } from '../api';

interface MealHistoryDialogProps {
  patientId: string;
  iconOnly?: boolean;
  className?: string;
}

export const MealHistoryDialog = ({
  patientId,
  iconOnly = false,
  className = '',
}: MealHistoryDialogProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  // Fetch meals for this patient
  const { data: meals, isLoading } = useQuery({
    queryKey: ['meals', patientId],
    queryFn: () => getMealsByPatientId(patientId),
    // Only fetch when dialog is open to save unnecessary API calls
    enabled: isOpen,
  });

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  // Format time for display
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Sort meals by date, newest first
  const sortedMeals = meals
    ? [...meals].sort((a, b) => {
      const dateA = new Date(a.meal_date).getTime();
      const dateB = new Date(b.meal_date).getTime();
      return dateB - dateA;
    })
    : [];

  // Group meals by date
  const groupedMeals: Record<string, MealDto[]> = {};
  sortedMeals.forEach((meal) => {
    const dateKey = new Date(meal.meal_date).toLocaleDateString();
    if (!groupedMeals[dateKey]) {
      groupedMeals[dateKey] = [];
    }
    groupedMeals[dateKey].push(meal);
  });

  return (
    <>
      {iconOnly ? (
        <div
          onClick={openDialog}
          className={`flex h-full w-full cursor-pointer items-center justify-center ${className}`}
        >
          <BiRestaurant className="text-3xl text-white" />
        </div>
      ) : (
        <Button
          onClick={openDialog}
          className="border-secondary hover:bg-secondary/10 flex items-center gap-2 border bg-transparent"
        >
          <BiRestaurant className="text-xl text-primary-accent" />
          {t('meal.history.view_meals', 'View Meal History')}
        </Button>
      )}

      {isOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[9998] flex items-center justify-center backdrop-blur-xs"
            onClick={closeDialog}
          >
            <div
              className="bg-foreground/90 flex h-fit max-h-[80vh] w-[90%] max-w-3xl flex-col rounded-sm px-6 pt-6 pb-6"
              onClick={(e) => e.stopPropagation()} // prevents clicks inside the dialog from bubbling to the backdrop
            >
              <div className="flex w-full items-center justify-between">
                <div className="size-8"></div>
                <span className="text-2xl font-bold text-primary-accent">
                  {t('meal.history.title', 'Meal History')}
                </span>
                <div
                  className="hover:bg-foreground flex size-8 items-center justify-center rounded-full text-3xl font-bold hover:cursor-pointer"
                  onClick={closeDialog}
                >
                  &times;
                </div>
              </div>

              <div className="mt-4 flex-1 overflow-y-auto">
                {isLoading ? (
                  <div className="flex h-40 items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-t-2 border-b-2 border-white"></div>
                  </div>
                ) : !sortedMeals.length ? (
                  <div className="flex h-40 items-center justify-center">
                    <p className="text-lg text-primary-accent">
                      {t('meal.history.no_meals', 'No meals recorded')}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {Object.keys(groupedMeals).map((date) => (
                      <div key={date} className="mb-4">
                        <h3 className="mb-2 text-lg font-bold text-primary-accent">{date}</h3>
                        {groupedMeals[date].map((meal) => (
                          <div
                            key={meal.id}
                            className="bg-background/10 mb-3 rounded-sm p-4"
                          >
                            <div className="mb-2 flex items-center justify-between">
                              <h4 className="text-lg font-semibold text-primary-accent">
                                {meal.meal_name}
                              </h4>
                              <span className="text-sm font-medium text-primary-accent">
                                {formatTime(meal.meal_date)}
                              </span>
                            </div>

                            {meal.image_url && (
                              <div className="mt-2 mb-3 flex justify-center">
                                <img
                                  src={meal.image_url}
                                  alt={meal.meal_name}
                                  className="max-h-40 rounded-sm object-cover"
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                  }}
                                />
                              </div>
                            )}

                            {meal.ontology && (
                              <div className="mb-2 flex flex-wrap gap-1 text-primary-accent">
                                {meal.ontology.split(',').map((tag, idx) => (
                                  <span
                                    key={idx}
                                    className="bg-secondary/30 inline-block rounded-full px-2 py-1 text-xs"
                                  >
                                    {tag.trim()}
                                  </span>
                                ))}
                              </div>
                            )}

                            {meal.meal_notes && (
                              <div className="mt-2 border-t border-gray-600 pt-2">
                                <p className="text-sm">
                                  <span className="font-semibold text-primary-accent">
                                    {t('meal.notes', 'Notes')}:
                                  </span>{' '}
                                  {meal.meal_notes}
                                </p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-4 flex justify-end">
                <Button onClick={closeDialog}>
                  {t('common.close', 'Close')}
                </Button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};
