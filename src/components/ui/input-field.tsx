import * as React from 'react';

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
  value,
  onChange,
  error,
}) => {
  return (
  <div className="relative w-full">
      <input
        className="peer block w-full bg-transparent px-0 py-2.5 text-sm text-gray-900
                   border-0 border-b-2 border-solid border-gray-300
                   focus:border-secondary focus:outline-none focus:ring-0
                   transition-colors duration-200"
        aria-label={label}
        id={id}
        type={type}
        placeholder=" "// nie usuwaj tego bo animacja się zepsuej.
        value={value}
        onChange={onChange}
        aria-invalid={!!error}
      />

      <label
        htmlFor={id}
        className="absolute left-0 top-2.5 text-gray-500 text-sm pointer-events-none
                   origin-left transition-all duration-200
                   peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100
                   peer-focus:-translate-y-6 peer-focus:scale-90 peer-focus:text-secondary
                   peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-90"
      >
        {label}
      </label>

      {error && <span className="block mt-1 text-sm text-red-500">{error}</span>}
    </div>)
};
