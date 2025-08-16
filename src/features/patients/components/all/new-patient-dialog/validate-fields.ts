import { t } from 'i18next';
import { CreatePatientForm } from './create-patient-form';

export function validateFields(formData: CreatePatientForm): string[] {
  const newErrors: string[] = [];
  if (!formData.firstName) {
    newErrors.push(t('patients.new-patient.form.errors.name_required'));
  }
  if (!formData.lastName) {
    newErrors.push(t('patients.new-patient.form.errors.surname_required'));
  }
  if (!formData.email) {
    newErrors.push(t('patients.new-patient.form.errors.email_required'));
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.push(t('patients.new-patient.form.errors.email_invalid'));
  }
  if (!formData.phone_number) {
    newErrors.push(t('patients.new-patient.form.errors.phone_required'));
  } else if (!/^\d{10}$/.test(formData.phone_number)) {
    newErrors.push(t('patients.new-patient.form.errors.phone_invalid'));
  }
  if (!formData.password) {
    newErrors.push(t('patients.new-patient.form.errors.password_required'));
  } else if (formData.password.length < 8) {
    newErrors.push(t('patients.new-patient.form.errors.password_length'));
  } else if (!/[A-Z]/.test(formData.password)) {
    newErrors.push(t('patients.new-patient.form.errors.password_uppercase'));
  } else if (!/[a-z]/.test(formData.password)) {
    newErrors.push(t('patients.new-patient.form.errors.password_lowercase'));
  } else if (!/\d/.test(formData.password)) {
    newErrors.push(t('patients.new-patient.form.errors.password_number'));
  } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
    newErrors.push(t('patients.new-patient.form.errors.password_special'));
  }
  if (!formData.height) {
    newErrors.push(t('patients.new-patient.form.errors.height_required'));
  } else if (isNaN(Number(formData.height)) || Number(formData.height) <= 0) {
    newErrors.push(t('patients.new-patient.form.errors.height_invalid'));
  }
  if (!formData.weight) {
    newErrors.push(t('patients.new-patient.form.errors.weight_required'));
  } else if (isNaN(Number(formData.weight)) || Number(formData.weight) <= 0) {
    newErrors.push(t('patients.new-patient.form.errors.weight_invalid'));
  }
  if (!formData.date_of_birth) {
    newErrors.push(
      t('patients.new-patient.form.errors.date_of_birth_required'),
    );
  } else if (isNaN(formData.date_of_birth.getTime())) {
    newErrors.push(t('patients.new-patient.form.errors.date_of_birth_invalid'));
  }
  if (!formData.hospital) {
    newErrors.push(t('patients.new-patient.form.errors.hospital_required'));
  }
  return newErrors;
}
