import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { BiBandAid } from 'react-icons/bi';
import { Button } from '@/components/ui/button';
import { DrugDto } from '../types';
import { useQuery } from '@tanstack/react-query';
import { getDrugsByPatientId } from '../api';

interface DrugHistoryDialogProps {
    patientId: string;
    iconOnly?: boolean;
    className?: string;
}

export const DrugHistoryDialog = ({ patientId, iconOnly = false, className = '' }: DrugHistoryDialogProps) => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    // Fetch drugs for this patient
    const { data: drugs, isLoading } = useQuery({
        queryKey: ['drugs', patientId],
        queryFn: () => getDrugsByPatientId(patientId),
        // Only fetch when dialog is open to save unnecessary API calls
        enabled: isOpen,
    });

    const openDialog = () => setIsOpen(true);
    const closeDialog = () => setIsOpen(false);

    // Format dates for display
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    // Sort drugs by dateFrom, most recent first
    const sortedDrugs = drugs ? [...drugs].sort((a, b) => {
        const dateA = new Date(a.dateFrom).getTime();
        const dateB = new Date(b.dateFrom).getTime();
        return dateB - dateA;
    }) : [];

    return (
        <>
            {iconOnly ? (
                <div onClick={openDialog} className={`flex items-center justify-center w-full h-full cursor-pointer ${className}`}>
                    <BiBandAid className="text-3xl text-white" />
                </div>
            ) : (
                <Button
                    onClick={openDialog}
                    className="flex items-center gap-2 bg-transparent border border-secondary hover:bg-secondary/10"
                >
                    <BiBandAid className="text-xl" />
                    {t('drug.history.view_drugs', 'View Medications')}
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
                                {t('drug.history.title', 'Medications History')}
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
                            ) : !sortedDrugs.length ? (
                                <div className="flex h-40 items-center justify-center">
                                    <p className="text-lg">{t('drug.history.no_drugs', 'No medications recorded')}</p>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    {sortedDrugs.map((drug: DrugDto) => (
                                        <div key={drug.id} className="rounded-sm bg-background/10 p-4">
                                            <div className="mb-2 flex items-center justify-between">
                                                <h3 className="text-lg font-semibold">
                                                    {drug.name}
                                                </h3>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-semibold">{t('drug.dosage', 'Dosage')}:</span>
                                                    <span>{drug.dosage}</span>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-2 text-sm">
                                                <div>
                                                    <p>
                                                        <span className="font-semibold">{t('drug.dateFrom', 'Start Date')}:</span> {formatDate(drug.dateFrom)}
                                                    </p>
                                                    <p>
                                                        <span className="font-semibold">{t('drug.dateTo', 'End Date')}:</span> {formatDate(drug.dateTo)}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p>
                                                        <span className="font-semibold">{t('drug.times', 'Schedule')}:</span> {drug.times.join(', ')}
                                                    </p>
                                                </div>
                                            </div>

                                            {drug.additionalInfo && (
                                                <div className="mt-2 border-t border-gray-600 pt-2">
                                                    <p className="text-sm">
                                                        <span className="font-semibold">{t('drug.additionalInfo', 'Notes')}:</span> {drug.additionalInfo}
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
                document.body
            )}
        </>
    );
};