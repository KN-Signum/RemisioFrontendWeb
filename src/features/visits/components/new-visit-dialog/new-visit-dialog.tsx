import { Input } from '@/components/ui/input';
import { formatDateDisplay } from '@/utils/format-date-display';
import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { BsDash } from 'react-icons/bs';
import { useCreateVisit } from '../../api/create-visit';
import { Button } from '@/components/ui/button';

export interface NewVisitDialogProps {
  onClose: () => void;
  startDate: Date;
  endDate: Date;
}

interface NewVisitFormData {
  name: string;
  patientId: string;
  timeStart: string;
  timeEnd: string;
  date: Date;
  additionalInfo?: string;
}

export const NewVisitDialog = (props: NewVisitDialogProps) => {
  const { t } = useTranslation();
  const timeStartRef = useRef<HTMLInputElement>(null);
  const timeEndRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<NewVisitFormData>({
    name: '',
    patientId: '',
    timeStart: props.startDate.toISOString().substring(11, 16),
    timeEnd: props.endDate.toISOString().substring(11, 16),
    date: props.startDate,
    additionalInfo: '',
  });

  const [errors, setErrors] = useState<string[]>([]);

  const validateFields = () => {
    const newErrors: string[] = [];
    if (!formData.name) {
      newErrors.push(t('calendar.new_visit.errors.name_required'));
    }
    if (!formData.patientId) {
      newErrors.push(t('calendar.new_visit.errors.patient_required'));
    }
    if (!formData.timeStart) {
      newErrors.push(t('calendar.new_visit.errors.start_time_required'));
    }
    if (!formData.timeEnd) {
      newErrors.push(t('calendar.new_visit.errors.end_time_required'));
    }
    if (formData.timeStart >= formData.timeEnd) {
      newErrors.push(t('calendar.new_visit.errors.invalid_time_range'));
    }
    return newErrors;
  };

  const onSuccess = () => {
    props.onClose();
    console.log('Visit created successfully');
  };

  const createVisit = useCreateVisit({ onSuccess });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateFields();
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
      additional_info: formData.additionalInfo || '',
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
                {t('calendar.new_visit.title')}
              </span>
              <div
                className="hover:bg-foreground flex size-8 items-center justify-center rounded-full text-3xl font-bold hover:cursor-pointer"
                onClick={props.onClose}
              >
                &times;
              </div>
            </div>
            <form>
              <div className="mt-10 flex h-full w-full flex-col items-center gap-4 text-lg">
                <span className="text-md -my-4 text-red-500">{errors[0]}</span>
                <div className="h-12 w-full rounded-sm px-2 ring-1 focus-within:ring-3">
                  <Input
                    type="text"
                    name="visitName"
                    placeholder={t('calendar.new_visit.visit_name')}
                    className="h-full focus-visible:ring-0"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="h-12 w-full rounded-sm px-2 ring-1 focus-within:ring-3">
                  <Input
                    type="text"
                    name="patientName"
                    placeholder={t('calendar.new_visit.choose_patient')}
                    className="h-full focus-visible:ring-0"
                    value={formData.patientId}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        patientId: e.target.value,
                      })
                    }
                  />
                </div>
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
                  <div
                    onClick={() =>
                      dateRef.current?.showPicker
                        ? dateRef.current.showPicker()
                        : dateRef.current?.click()
                    }
                    className="relative flex h-12 w-40 cursor-pointer rounded-sm ring-1"
                  >
                    <input
                      ref={dateRef}
                      type="date"
                      name="date"
                      className="absolute inset-0 size-0"
                      value={formData.date.toISOString().substring(0, 10)}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          date: new Date(e.target.value),
                        })
                      }
                    />
                    <span className="z-1 flex w-full items-center justify-center">
                      {formatDateDisplay(formData.date)}
                    </span>
                  </div>
                </div>
                <div className="h-fit w-full rounded-sm px-2 ring-1 focus-within:ring-3">
                  <textarea
                    placeholder={t('calendar.new_visit.additional_info')}
                    className="h-24 w-full text-start focus:outline-none"
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
          </div>
        </div>,
        document.body,
      )}
    </>
  );
};
