import { cn } from '@/utils/cn';
import { createPortal } from 'react-dom';
import { Button } from './button';
import { useTranslation } from 'react-i18next';
import { Loading } from './loading';

type DialogProps = {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  closeButton?: boolean;
  className?: string;
  isOpen: boolean;
  isLoading?: boolean;
  isEmpty?: boolean;
  emptyText?: string;
};

export const Dialog = ({
  title,
  onClose,
  closeButton = true,
  className,
  children,
  isOpen,
  isLoading = false,
  isEmpty = false,
  emptyText,
}: DialogProps) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <>
      {createPortal(
        <div
          className="fixed inset-0 z-[9998] flex items-center justify-center backdrop-blur-xs"
          onClick={onClose}
        >
          <div
            className={cn(
              'bg-foreground/90 text-primary-accent flex h-fit flex-col items-center rounded-sm px-10 py-6',
              className,
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex w-full items-center justify-between">
              <div className="size-8"></div>
              <span className="text-3xl font-bold">{title}</span>
              <div
                className="hover:bg-foreground flex size-8 items-center justify-center rounded-full text-3xl font-bold hover:cursor-pointer"
                onClick={onClose}
              >
                &times;
              </div>
            </div>
            {isLoading ? (
              <Loading size={50} className="mt-5 overflow-hidden" />
            ) : isEmpty ? (
              <div className="flex h-40 items-center justify-center">
                <p className="text-primary-accent text-lg">{emptyText}</p>
              </div>
            ) : (
              children
            )}
            {closeButton ? (
              <div className="mt-4 flex w-full justify-end">
                <Button onClick={onClose}>{t('common.close', 'Close')}</Button>
              </div>
            ) : null}
          </div>
        </div>,
        document.body,
      )}
    </>
  );
};
