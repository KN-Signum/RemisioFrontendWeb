import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { BiPulse } from 'react-icons/bi';
import { Button } from '@/components/ui/button';
import { formatDateDisplay } from '@/utils/format-date-display';
import { SymptomDto } from '../types';
import { useQuery } from '@tanstack/react-query';
import { getSymptomsByPatientId } from '../api';

interface SymptomHistoryDialogProps {
  patientId: string;
  iconOnly?: boolean;
  className?: string;
}

export const SymptomHistoryDialog = ({
  patientId,
  iconOnly = false,
  className = '',
}: SymptomHistoryDialogProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  // Fetch symptoms for this patient
  const { data: symptoms, isLoading } = useQuery({
    queryKey: ['symptoms', patientId],
    queryFn: () => getSymptomsByPatientId(patientId),
    // Only fetch when dialog is open to save unnecessary API calls
    enabled: isOpen,
  });

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  // Helper function to get pain level color class
  const getPainLevelColorClass = (level: string): string => {
    switch (level) {
      case 'None':
        return 'text-gray-400';
      case 'Mild':
        return 'text-green-500';
      case 'Moderate':
        return 'text-yellow-500';
      case 'Severe':
        return 'text-orange-500';
      case 'Very Severe':
        return 'text-red-500';
      default:
        return 'text-gray-400';
    }
  };

  // Sort symptoms by creation date, newest first
  const sortedSymptoms = symptoms
    ? [...symptoms].sort((a, b) => {
        const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
        const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
        return dateB - dateA;
      })
    : [];

  return (
    <>
      {iconOnly ? (
        <div
          onClick={openDialog}
          className={`flex h-full w-full cursor-pointer items-center justify-center ${className}`}
        >
          <BiPulse className="text-3xl text-white" />
        </div>
      ) : (
        <Button
          onClick={openDialog}
          className="border-secondary hover:bg-secondary/10 flex items-center gap-2 border bg-transparent"
        >
          <BiPulse className="text-xl" />
          {t('symptoms.history.view_symptoms', 'View Symptoms History')}
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
                <span className="text-2xl font-bold">
                  {t('symptoms.history.title', 'Symptoms History')}
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
                ) : !sortedSymptoms.length ? (
                  <div className="flex h-40 items-center justify-center">
                    <p className="text-lg">
                      {t(
                        'symptoms.history.no_symptoms',
                        'No symptoms recorded',
                      )}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {sortedSymptoms.map((symptom: SymptomDto) => (
                      <div
                        key={symptom.id}
                        className="bg-background/10 rounded-sm p-4"
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <h3 className="text-lg font-semibold">
                            {symptom.created_at
                              ? formatDateDisplay(new Date(symptom.created_at))
                              : 'Unknown date'}
                          </h3>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">
                              {t('symptoms.type', 'Type')}:
                            </span>
                            <span>{symptom.symptom_type}</span>
                            <span
                              className={`ml-2 font-bold ${getPainLevelColorClass(symptom.pain_level)}`}
                            >
                              {symptom.pain_level}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p>
                              <span className="font-semibold">
                                {t('symptoms.duration', 'Duration')}:
                              </span>{' '}
                              {symptom.duration}
                            </p>
                          </div>
                          <div>
                            <p>
                              <span className="font-semibold">
                                {t('symptoms.pain_level', 'Pain Level')}:
                              </span>{' '}
                              {symptom.pain_level}
                            </p>
                          </div>
                        </div>

                        {symptom.symptom_description && (
                          <div className="mt-2 border-t border-gray-600 pt-2">
                            <p className="text-sm">
                              <span className="font-semibold">
                                {t('symptoms.description', 'Description')}:
                              </span>{' '}
                              {symptom.symptom_description}
                            </p>
                          </div>
                        )}
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
