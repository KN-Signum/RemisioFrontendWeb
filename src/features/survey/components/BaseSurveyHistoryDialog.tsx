import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/button';

interface BaseProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    isLoading: boolean;
    empty: boolean;
    children: React.ReactNode;
}

export const BaseSurveyHistoryDialog = ({
    isOpen,
    onClose,
    title,
    isLoading,
    empty,
    children,
}: BaseProps) =>
    isOpen
        ? createPortal(
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
                        <span className="text-2xl font-bold text-primary-accent">{title}</span>
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
                            <div className="flex h-40 items-center justify-center">
                                <div className="h-8 w-8 animate-spin rounded-full border-t-2 border-b-2 border-white" />
                            </div>
                        ) : empty ? (
                            <div className="flex h-40 items-center justify-center">
                                <p className="text-lg text-primary-accent">No surveys available</p>
                            </div>
                        ) : (
                            children
                        )}
                    </div>

                    {/* footer */}
                    <div className="mt-4 flex justify-end">
                        <Button onClick={onClose}>Close</Button>
                    </div>
                </div>
            </div>,
            document.body,
        )
        : null;
