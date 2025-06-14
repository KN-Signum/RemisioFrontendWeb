import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { BiFirstAid } from 'react-icons/bi';
import { Button } from '@/components/ui/button';
import { formatDateDisplay } from '@/utils/format-date-display';
import { CrohnSurveyDto, SurveyCategory, UcSurveyDto } from '../types';
import { usePatientCrohnSurveys } from '../api/get-all-crohn-surveys';
import { usePatientUcSurveys } from '../api/get-all-uc-surveys';
import { DialogTrigger } from '@/features/patient/components/details/DialogTrigger';
import { formatValue } from '@/lib/utils/format_value';

interface SurveyHistoryDialogProps {
  patientId: string;
  diseaseType: 'crohn' | 'ulcerative_colitis';
  iconOnly?: boolean;
  className?: string;
}

export const SurveyHistoryDialog = ({
  patientId,
  diseaseType,
  iconOnly = false,
  className = '',
}: SurveyHistoryDialogProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  /* ───── pobieranie danych ───── */
  const { data: crohnSurveys, isLoading: isLoadingCrohn } =
    usePatientCrohnSurveys(diseaseType === 'crohn' ? patientId : '');

  const { data: ucSurveys, isLoading: isLoadingUc } = usePatientUcSurveys(
    diseaseType === 'ulcerative_colitis' ? patientId : '',
  );

  const isLoading = diseaseType === 'crohn' ? isLoadingCrohn : isLoadingUc;
  const surveys =
    diseaseType === 'crohn'
      ? crohnSurveys?.surveys || []
      : ucSurveys?.surveys || [];

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  /* ───── pomocnicze ───── */
  const getCategoryColorClass = (category: SurveyCategory): string => {
    switch (category) {
      case 'remission':
        return 'text-green-500';
      case 'mild':
        return 'text-yellow-500';
      case 'moderate':
        return 'text-orange-500';
      case 'severe':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const renderSurveyDetails = (survey: CrohnSurveyDto | UcSurveyDto) => {
    if (diseaseType === 'crohn') {
      const s = survey as CrohnSurveyDto;
      return (
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p>
              <span className="font-semibold text-primary-accent">
                {t('survey.crohn.abdominal_pain', 'Abdominal Pain')}:
              </span>{' '}
              <span className="text-primary-accent">{s.abdominal_pain}</span>
            </p>
            <p>
              <span className="font-semibold text-primary-accent">
                {t('survey.crohn.stools', 'Stools')}:
              </span>{' '}
              <span className="text-primary-accent">{s.stools}</span>
            </p>
            <p>
              <span className="font-semibold text-primary-accent">
                {t('survey.crohn.general_wellbeing', 'General Wellbeing')}:
              </span>{' '}
              <span className="text-primary-accent">{s.general_wellbeing}</span>
            </p>
            <p>
              <span className="font-semibold text-primary-accent">
                {t(
                  'survey.crohn.extraintestinal_manifestations',
                  'Extraintestinal Manifestations',
                )}
                :
              </span>{' '}
              <span className="text-primary-accent">
                {s.extraintestinal_manifestations}
              </span>
            </p>
          </div>
          <div>
            <p>
              <span className="font-semibold text-primary-accent">
                {t('survey.crohn.abdominal_mass', 'Abdominal Mass')}:
              </span>{' '}
              <span className="text-primary-accent">{s.abdominal_mass}</span>
            </p>
            <p>
              <span className="font-semibold text-primary-accent">
                {t('survey.crohn.hematocrit', 'Hematocrit')}:
              </span>{' '}
              <span className="text-primary-accent">{s.hematocrit}</span>
            </p>
            <p>
              <span className="font-semibold text-primary-accent">
                {t('survey.crohn.antidiarrheal_use', 'Antidiarrheal Use')}:
              </span>{' '}
              <span className="text-primary-accent">
                {t(
                  s.antidiarrheal_use ? 'yes' : 'no',
                  s.antidiarrheal_use ? 'Yes' : 'No',
                )}
              </span>
            </p>
            <p>
              <span className="font-semibold text-primary-accent">
                {t('survey.crohn.weight', 'Weight')}:
              </span>{' '}
              <span className="text-primary-accent">{s.weight}</span>
            </p>
          </div>
        </div>
      );
    }

    /* UC */
    const s = survey as UcSurveyDto;
    return (
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <p>
            <span className="font-semibold text-primary-accent">
              {t('survey.uc.stool_frequency', 'Stool Frequency')}:
            </span>{' '}
            <span className="text-primary-accent">{s.stool_frequency}</span>
          </p>
          <p>
            <span className="font-semibold text-primary-accent">
              {t('survey.uc.rectal_bleeding', 'Rectal Bleeding')}:
            </span>{' '}
            <span className="text-primary-accent">{s.rectal_bleeding}</span>
          </p>
        </div>
        <div>
          <p>
            <span className="font-semibold text-primary-accent">
              {t('survey.uc.physician_global', 'Physician Global Assessment')}:
            </span>{' '}
            <span className="text-primary-accent">{s.physician_global}</span>
          </p>
        </div>
      </div>
    );
  };

  /* ───── JSX ───── */
  return (
    <>
      <DialogTrigger
        onClick={openDialog}
        icon={
          iconOnly ? (
            <BiFirstAid className="text-3xl text-white" />
          ) : (
            <BiFirstAid className="text-xl text-primary-accent" />
          )
        }
        label={t('survey.history.view_surveys', 'View Surveys')}
        iconOnly={iconOnly}
        className={className}
      />

      {isOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[9998] flex items-center justify-center backdrop-blur-xs"
            onClick={closeDialog}
          >
            <div
              className="bg-foreground/90 flex max-h-[80vh] w-[90%] max-w-3xl flex-col rounded-sm px-6 pt-6 pb-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* header */}
              <div className="flex w-full items-center justify-between">
                <div className="size-8" />
                <span className="text-2xl font-bold text-primary-accent">
                  {diseaseType === 'crohn'
                    ? t(
                      'survey.history.crohn_title',
                      "Crohn's Disease Survey History",
                    )
                    : t(
                      'survey.history.uc_title',
                      'Ulcerative Colitis Survey History',
                    )}
                </span>
                <div
                  className="hover:bg-foreground flex size-8 items-center justify-center rounded-full text-3xl font-bold hover:cursor-pointer"
                  onClick={closeDialog}
                >
                  &times;
                </div>
              </div>

              {/* body */}
              <div className="mt-4 flex-1 overflow-y-auto">
                {isLoading ? (
                  <div className="flex h-40 items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-t-2 border-b-2 border-white" />
                  </div>
                ) : surveys.length === 0 ? (
                  <div className="flex h-40 items-center justify-center">
                    <p className="text-lg text-primary-accent">
                      {t(
                        'survey.history.no_surveys',
                        'No surveys available for this patient',
                      )}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {surveys.map((survey) => (
                      <div
                        key={survey.id}
                        className="bg-background/10 rounded-sm p-4"
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-primary-accent">
                            {formatDateDisplay(new Date(survey.survey_date))}
                          </h3>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-primary-accent">
                              {t('survey.total_score', 'Total Score')}:
                            </span>
                            <span className="text-primary-accent">
                              {formatValue(survey.total_score.toString())}
                            </span>
                            <span
                              className={`ml-2 font-bold ${getCategoryColorClass(
                                survey.category,
                              )}`}
                            >
                              {t(
                                `survey.category.${survey.category}`,
                                survey.category,
                              )}
                            </span>
                          </div>
                        </div>

                        {renderSurveyDetails(survey)}

                        {survey.notes && (
                          <div className="mt-2 border-t border-gray-600 pt-2">
                            <p className="text-sm">
                              <span className="font-semibold text-primary-accent">
                                {t('survey.notes', 'Notes')}:
                              </span>{' '}
                              <span className="text-primary-accent">
                                {survey.notes}
                              </span>
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* footer */}
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
