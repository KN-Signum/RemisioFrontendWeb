import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { BiFirstAid } from 'react-icons/bi';
import { Button } from '@/components/ui/button';
import { formatDateDisplay } from '@/utils/format-date-display';
import { CrohnSurveyDto, SurveyCategory, UcSurveyDto } from '../types';
import { usePatientCrohnSurveys } from '../api/crohn-survey-api';
import { usePatientUcSurveys } from '../api/uc-survey-api';

interface SurveyHistoryDialogProps {
    patientId: string;
    diseaseType: 'crohn' | 'ulcerative_colitis';
    iconOnly?: boolean;
}

export const SurveyHistoryDialog = ({ patientId, diseaseType, iconOnly = false }: SurveyHistoryDialogProps) => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    // Fetch surveys based on disease type
    const { data: crohnSurveys, isLoading: isLoadingCrohn } = usePatientCrohnSurveys(
        diseaseType === 'crohn' ? patientId : ''
    );

    const { data: ucSurveys, isLoading: isLoadingUc } = usePatientUcSurveys(
        diseaseType === 'ulcerative_colitis' ? patientId : ''
    );

    const isLoading = diseaseType === 'crohn' ? isLoadingCrohn : isLoadingUc;

    // Get the appropriate surveys based on disease type
    const surveys = diseaseType === 'crohn'
        ? crohnSurveys?.surveys || []
        : ucSurveys?.surveys || [];

    const openDialog = () => setIsOpen(true);
    const closeDialog = () => setIsOpen(false);

    // Helper function to get category color class
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

    // Render survey details based on disease type
    const renderSurveyDetails = (survey: CrohnSurveyDto | UcSurveyDto) => {
        if (diseaseType === 'crohn') {
            const crohnSurvey = survey as CrohnSurveyDto;
            return (
                <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                        <p><span className="font-semibold">{t('survey.crohn.abdominal_pain')}:</span> {crohnSurvey.abdominal_pain}</p>
                        <p><span className="font-semibold">{t('survey.crohn.stools')}:</span> {crohnSurvey.stools}</p>
                        <p><span className="font-semibold">{t('survey.crohn.general_wellbeing')}:</span> {crohnSurvey.general_wellbeing}</p>
                        <p><span className="font-semibold">{t('survey.crohn.extraintestinal_manifestations')}:</span> {crohnSurvey.extraintestinal_manifestations}</p>
                    </div>
                    <div>
                        <p><span className="font-semibold">{t('survey.crohn.abdominal_mass')}:</span> {crohnSurvey.abdominal_mass}</p>
                        <p><span className="font-semibold">{t('survey.crohn.hematocrit')}:</span> {crohnSurvey.hematocrit}</p>
                        <p><span className="font-semibold">{t('survey.crohn.weight_loss')}:</span> {crohnSurvey.weight_loss}</p>
                    </div>
                </div>
            );
        } else {
            const ucSurvey = survey as UcSurveyDto;
            return (
                <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                        <p><span className="font-semibold">{t('survey.uc.stool_frequency')}:</span> {ucSurvey.stool_frequency}</p>
                        <p><span className="font-semibold">{t('survey.uc.rectal_bleeding')}:</span> {ucSurvey.rectal_bleeding}</p>
                    </div>
                    <div>
                        <p><span className="font-semibold">{t('survey.uc.physician_global')}:</span> {ucSurvey.physician_global}</p>
                    </div>
                </div>
            );
        }
    };

    return (
        <>
            {iconOnly ? (
                <BiFirstAid className="text-3xl text-white cursor-pointer" onClick={openDialog} />
            ) : (
                <Button
                    onClick={openDialog}
                    className="flex items-center gap-2 bg-transparent border border-secondary hover:bg-secondary/10"
                >
                    <BiFirstAid className="text-xl" />
                    {t('survey.history.view_surveys')}
                </Button>
            )}

            {isOpen && createPortal(
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
                                {diseaseType === 'crohn'
                                    ? t('survey.history.crohn_title')
                                    : t('survey.history.uc_title')}
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
                                    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-white"></div>
                                </div>
                            ) : surveys.length === 0 ? (
                                <div className="flex h-40 items-center justify-center">
                                    <p className="text-lg">{t('survey.history.no_surveys')}</p>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    {surveys.map((survey) => (
                                        <div key={survey.id} className="rounded-sm bg-background/10 p-4">
                                            <div className="mb-2 flex items-center justify-between">
                                                <h3 className="text-lg font-semibold">
                                                    {formatDateDisplay(new Date(survey.survey_date))}
                                                </h3>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-semibold">{t('survey.total_score')}:</span>
                                                    <span>{survey.total_score}</span>
                                                    <span className={`ml-2 font-bold ${getCategoryColorClass(survey.category)}`}>
                                                        {t(`survey.category.${survey.category}`)}
                                                    </span>
                                                </div>
                                            </div>

                                            {renderSurveyDetails(survey)}

                                            {survey.notes && (
                                                <div className="mt-2 border-t border-gray-600 pt-2">
                                                    <p className="text-sm">
                                                        <span className="font-semibold">{t('survey.notes')}:</span> {survey.notes}
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
                                {t('common.close')}
                            </Button>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
};