import { t } from 'i18next';
import { NewVisitForm } from './new-visit-form';

export function validateFields(formData: NewVisitForm): string[] {
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
}
