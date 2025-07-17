import * as React from 'react';
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';

interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
}) => {
  return (
    <div className="grid gap-1">
      <Label htmlFor={id} className="text-primary-accent ml-1">
        {label}
      </Label>
      <Input
        className="text-primary-accent"
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-invalid={!!error}
      />
      {error && (
        <span className="text-sm text-red-500 ml-1">
          {error}
        </span>
      )}
    </div>
  );
};
