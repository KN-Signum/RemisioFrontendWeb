import React from 'react';
import { Input } from './input';

interface FormInputProps {
  type: React.HTMLInputTypeAttribute;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormInput = (props: FormInputProps) => {
  const { type, name, placeholder, value, onChange } = props;
  return (
    <div className="h-12 w-full rounded-sm px-2 ring-1 focus-within:ring-3">
      <Input
        className="h-full border-transparent focus-visible:ring-0"
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
