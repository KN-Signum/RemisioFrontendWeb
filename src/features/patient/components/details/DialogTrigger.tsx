import { Button } from '@/components/ui/button';

interface DialogTriggerProps {
    onClick: () => void;
    icon: React.ReactElement;
    label?: string;
    iconOnly?: boolean;
    className?: string;
}

export const DialogTrigger = ({
    onClick,
    icon,
    label,
    iconOnly = false,
    className = '',
}: DialogTriggerProps) =>
    iconOnly ? (
        <div
            onClick={onClick}
            className={`flex h-full w-full cursor-pointer items-center justify-center ${className}`}
        >
            {icon}
        </div>
    ) : (
        <Button
            onClick={onClick}
            className={`border-secondary hover:bg-secondary/10 flex items-center gap-2 border bg-transparent ${className}`}
        >
            {icon}
            {label}
        </Button>
    );
