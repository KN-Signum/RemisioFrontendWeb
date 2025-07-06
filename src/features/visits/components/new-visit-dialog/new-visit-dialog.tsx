import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsDash } from 'react-icons/bs';
import { useCreateVisit } from '../../api/create-visit';
import { Button } from '@/components/ui/button';
import { useNotifications } from '@/stores/notifications';
import { FormInput } from '@/components/ui/form-input';
import { FormDateInput } from '@/components/ui/form-date-input';
import { NewVisitForm } from './new-visit-form';
import { validateFields } from './validate-fields';
import { Dialog } from '@/components/ui/dialog';

export interface NewVisitDialogProps {
  isOpen: boolean;
  onClose: () => void;
  startDate: Date;
  endDate: Date;
}

export const NewVisitDialog = ({
  isOpen,
  onClose,
  startDate,
  endDate,
}: NewVisitDialogProps) => {
  const { t } = useTranslation();
  const { showNotification } = useNotifications();
  const timeStartRef = useRef<HTMLInputElement>(null);
  const timeEndRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<NewVisitForm>({
    name: '',
    patientId: '',
    timeStart: startDate.toISOString().substring(11, 16),
    timeEnd: endDate.toISOString().substring(11, 16),
    date: startDate,
    additionalInfo: '',
  });

  const [errors, setErrors] = useState<string[]>([]);

  const onSuccess = () => {
    showNotification({
      type: 'success',
      title: t('notifications.type.success'),
      duration: 5000,
      message: t('notifications.messages.visit_created'),
    });
    onClose();
  };

  const createVisit = useCreateVisit({ onSuccess });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateFields(formData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log('Form submitted:', formData);
    createVisit.create({
      name: formData.name,
      patient_id: formData.patientId,
      time_start: new Date(
        `${formData.date.toISOString().substring(0, 10)}T${formData.timeStart}`,
      ),
      time_end: new Date(
        `${formData.date.toISOString().substring(0, 10)}T${formData.timeEnd}`,
      ),
      additional_info: formData.additionalInfo,
    });
  };

  return (
    <Dialog
      isOpen={isOpen}
      closeButton={false}
      title={t('calendar.new_visit.title')}
      onClose={onClose}
    >
      <form>
        <div className="mt-10 flex h-full w-full flex-col items-center gap-4 text-lg">
          <span className="text-md -my-4 text-red-500">{errors[0]}</span>
          <FormInput
            type="text"
            name="visitName"
            placeholder={t('calendar.new_visit.visit_name')}
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
          />
          <FormInput
            type="text"
            name="patientName"
            placeholder={t('calendar.new_visit.choose_patient')}
            value={formData.patientId}
            onChange={(e) =>
              setFormData({
                ...formData,
                patientId: e.target.value,
              })
            }
          />
          <div className="flex items-center gap-3">
            <div
              onClick={() =>
                timeStartRef.current?.showPicker
                  ? timeStartRef.current.showPicker()
                  : timeStartRef.current?.click()
              }
              className="relative flex h-12 w-25 cursor-pointer rounded-sm ring-1"
            >
              <input
                ref={timeStartRef}
                type="time"
                name="timeStart"
                className="absolute inset-0 size-0"
                value={formData.timeStart}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    timeStart: e.target.value,
                  })
                }
              />
              <span className="z-1 flex w-full items-center justify-center">
                {formData.timeStart}
              </span>
            </div>
            <BsDash className="size-12" />
            <div
              onClick={() =>
                timeEndRef.current?.showPicker
                  ? timeEndRef.current.showPicker()
                  : timeEndRef.current?.click()
              }
              className="relative flex h-12 w-25 cursor-pointer rounded-sm ring-1"
            >
              <input
                ref={timeEndRef}
                type="time"
                name="timeEnd"
                className="absolute inset-0 size-0"
                value={formData.timeEnd}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    timeEnd: e.target.value,
                  })
                }
              />
              <span className="z-1 flex w-full items-center justify-center">
                {formData.timeEnd}
              </span>
            </div>
            <FormDateInput
              className="w-40"
              name="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  date: new Date(e.target.value),
                })
              }
            />
          </div>
          <div className="h-fit w-full rounded-sm px-2 ring-1 focus-within:ring-3">
            <textarea
              placeholder={t('calendar.new_visit.additional_info')}
              className="h-24 w-full text-start focus:outline-none"
              value={formData.additionalInfo}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  additionalInfo: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <Button
            type="submit"
            onClick={handleSubmit}
            isLoading={createVisit.isPending}
          >
            {t('calendar.new_visit.submit')}
          </Button>
        </div>
      </form>
    </Dialog>
  );
};
