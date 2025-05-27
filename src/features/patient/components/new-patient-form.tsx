import { useState } from 'react';
import { InputField } from '@/components/ui/input-field';
import { useTranslation } from 'react-i18next';
import { CreatePatientDto } from '../types';
import { Button } from '@/components/ui/button';

interface Props {
  onSubmit: (payload: CreatePatientDto) => void;
  isLoading?: boolean;
  error?: string;
}

const initialData: CreatePatientDto = {
  name: '',
  email: '',
  phone_number: '',
  password: '',
  height: 0,
  weight: 0,
  age: 0,
  hospital: '',
};

export const NewPatientForm: React.FC<Props> = ({
  onSubmit,
  isLoading,
  error,
}) => {
  const { t } = useTranslation();

  const [form, setForm] = useState<CreatePatientDto>(initialData);

  const handleChange =
    (field: keyof CreatePatientDto) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({
        ...prev,
        [field]:
          field === 'age' || field === 'weight' || field === 'height'
            ? +e.target.value
            : e.target.value,
      }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {error && <p className="text-red-500">{error}</p>}

      <InputField
        id="name"
        label={t('patients.form.name')}
        value={form.name}
        onChange={handleChange('name')}
      />
      <InputField
        id="email"
        type="email"
        label={t('patients.form.email')}
        value={form.email}
        onChange={handleChange('email')}
      />
      <InputField
        id="phone"
        label={t('patients.form.phone')}
        value={form.phone_number}
        onChange={handleChange('phone_number')}
      />
      <InputField
        id="password"
        type="password"
        label={t('patients.form.password')}
        value={form.password}
        onChange={handleChange('password')}
      />
      <InputField
        id="weight"
        type="number"
        label={t('patients.form.weight')}
        value={String(form.weight)}
        onChange={handleChange('weight')}
      />
      <InputField
        id="height"
        type="number"
        label={t('patients.form.height')}
        value={String(form.height)}
        onChange={handleChange('height')}
      />
      <InputField
        id="age"
        type="number"
        label={t('patients.form.age')}
        value={String(form.age)}
        onChange={handleChange('age')}
      />
      <InputField
        id="hospital"
        label={t('patients.form.hospital')}
        value={form.hospital}
        onChange={handleChange('hospital')}
      />

      <Button
        type="submit"
        className="bg-primary-accent mt-2 rounded-xl text-center"
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="flex justify-center gap-1">
            <span className="animate-dot-flash h-1.5 w-1.5 rounded-full bg-white [animation-delay:0s]" />
            <span className="animate-dot-flash h-1.5 w-1.5 rounded-full bg-white [animation-delay:0.2s]" />
            <span className="animate-dot-flash h-1.5 w-1.5 rounded-full bg-white [animation-delay:0.4s]" />
          </span>
        ) : (
          t('patients.form.create')
        )}
      </Button>
    </form>
  );
};
