import { NewVisitForm } from './new-visit-form';

export function validateFields(formData: NewVisitForm): string[] {
  const newErrors: string[] = [];
  if (!formData.name) {
    newErrors.push('errors.nameRequired');
  }
  if (!formData.patientId) {
    newErrors.push('errors.patientRequired');
  }
  if (!formData.timeStart) {
    newErrors.push('errors.startTimeRequired');
  }
  if (!formData.timeEnd) {
    newErrors.push('errors.endTimeRequired');
  }
  if (formData.timeStart >= formData.timeEnd) {
    newErrors.push('errors.invalidTimeRange');
  }
  return newErrors;
}
