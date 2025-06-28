import { useTranslation } from 'react-i18next';
import { useNotifications } from '@/stores/notifications';
import { createPortal } from 'react-dom';
import { useState } from 'react';
import { FormInput } from '@/components/ui/form-input';
import { Button } from '@/components/ui/button';
import { FormDateInput } from '@/components/ui/form-date-input';
import { CreatePatientForm } from './create-patient-form';
import { validateFields } from './validate-fields';
import { useCreatePatient } from '@/features/patient';

interface NewPatientDialogProps {
  onClose: () => void;
}

export const NewPatientDialog = (props: NewPatientDialogProps) => {
  const { t } = useTranslation();
  const { showNotification } = useNotifications();
  const [formData, setFormData] = useState<CreatePatientForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone_number: '',
    password: '',
    height: '',
    weight: '',
    date_of_birth: undefined,
    hospital: '',
  });

  const [errors, setErrors] = useState<string[]>([]);

  const onSuccess = () => {
    showNotification({
      type: 'success',
      title: t('notifications.type.success'),
      duration: 5000,
      message: t('notifications.messages.patient_added'),
    });
    props.onClose();
  };

  const createPatient = useCreatePatient({ onSuccess });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateFields(formData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log('Form submitted:', formData);
    createPatient.create({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone_number: formData.phone_number,
      password: formData.password,
      height: Number(formData.height),
      weight: Number(formData.weight),
      date_of_birth: formData.date_of_birth!,
      hospital: formData.hospital,
    });
  };

  return (
    <>
      {createPortal(
        <div
          className="fixed inset-0 z-[9998] flex items-center justify-center backdrop-blur-xs"
          onClick={props.onClose}
        >
          <div
            className="bg-foreground/90 flex h-fit flex-col items-center rounded-sm px-10 pt-6 pb-10"
            onClick={(e) => e.stopPropagation()} // prevents clicks inside the dialog from bubbling to the backdrop
          >
            <div className="flex w-100 items-center justify-between">
              <div className="size-8"></div>
              <span className="text-3xl font-bold">
                {t('patients.new-patient.title')}
              </span>
              <div
                className="hover:bg-foreground flex size-8 items-center justify-center rounded-full text-3xl font-bold hover:cursor-pointer"
                onClick={props.onClose}
              >
                &times;
              </div>
            </div>
            <form>
              <div className="mt-10 flex h-full w-100 flex-col items-center gap-4 text-lg">
                <span className="text-md -mt-8 -mb-2 text-red-500">
                  {errors[0]}
                </span>
                <div className="flex w-full justify-between gap-4">
                  <FormInput
                    type="text"
                    name="first_name"
                    placeholder={t('patients.new-patient.form.first_name')}
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                  />
                  <FormInput
                    type="text"
                    name="last_name"
                    placeholder={t('patients.new-patient.form.last_name')}
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                  />
                </div>
                <FormInput
                  type="email"
                  name="email"
                  placeholder={t('patients.new-patient.form.email')}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <FormInput
                  type="tel"
                  name="phone_number"
                  placeholder={t('patients.new-patient.form.phone')}
                  value={formData.phone_number}
                  onChange={(e) =>
                    setFormData({ ...formData, phone_number: e.target.value })
                  }
                />
                <FormInput
                  type="password"
                  name="password"
                  placeholder={t('patients.new-patient.form.password')}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <div className="flex w-full justify-between gap-4">
                  <FormInput
                    type="number"
                    name="weight"
                    placeholder={t('patients.new-patient.form.weight')}
                    value={formData.weight}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        weight: e.target.value,
                      })
                    }
                  />
                  <FormInput
                    type="number"
                    name="height"
                    placeholder={t('patients.new-patient.form.height')}
                    value={String(formData.height)}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        height: e.target.value,
                      })
                    }
                  />
                </div>
                <FormDateInput
                  className="w-full"
                  textAlign="start"
                  name="date_of_birth"
                  placeholder={t('patients.new-patient.form.date_of_birth')}
                  value={formData.date_of_birth}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      date_of_birth: new Date(e.target.value),
                    })
                  }
                />
                <FormInput
                  type="text"
                  name="hospital"
                  placeholder={t('patients.new-patient.form.hospital')}
                  value={formData.hospital}
                  onChange={(e) =>
                    setFormData({ ...formData, hospital: e.target.value })
                  }
                />
                <div className="flex w-full justify-end">
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    isLoading={createPatient.isLoading}
                  >
                    {t('calendar.new_visit.submit')}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
};
