import { cn, formatDateDisplay } from '@/utils/common';
import { useRef } from 'react';

interface FormDateInputProps {
  name: string;
  placeholder?: string;
  value?: Date;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  textAlign?: 'start' | 'center' | 'end';
}

export const FormDateInput = (props: FormDateInputProps) => {
  const { name, placeholder, value, onChange, className } = props;
  const dateRef = useRef<HTMLInputElement>(null);
  return (
    <div
      onClick={() =>
        dateRef.current?.showPicker
          ? dateRef.current.showPicker()
          : dateRef.current?.click()
      }
      className={cn(
        'relative flex h-12 cursor-pointer rounded-sm ring-1',
        className,
      )}
    >
      <input
        ref={dateRef}
        type="date"
        name={name}
        placeholder={placeholder}
        className="absolute inset-0 size-0"
        value={value?.toISOString().substring(0, 10) || ''}
        onChange={onChange}
      />
      <span
        className={cn(
          'z-1 flex w-full items-center justify-center px-2',
          value === undefined && 'text-gray-500',
          `justify-${props.textAlign || 'center'}`,
        )}
      >
        {value === undefined ? placeholder : formatDateDisplay(value)}
      </span>
    </div>
  );
};
