import { type TFunction } from 'i18next';
import { Analyte } from '../types';

/**
 * Translates an analyte key using the i18n translation function
 *
 * @param t - The i18n translation function
 * @param analyte - The analyte key to translate
 * @returns The translated analyte name
 *
 * @example
 * // In a component:
 * const { t } = useTranslation();
 * const analyteLabel = translateAnalyte(t, 'hemoglobin');
 * // Returns "Hemoglobin" in English or "Hemoglobina" in Polish
 */
export const translateAnalyte = (t: TFunction, analyte: Analyte): string => {
  return t(`analytes.${analyte}`);
};

/**
 * Translates an array of analyte keys using the i18n translation function
 *
 * @param t - The i18n translation function
 * @param analytes - The array of analyte keys to translate
 * @returns An array of translated analyte names
 *
 * @example
 * // In a component:
 * const { t } = useTranslation();
 * const analyteLabels = translateAnalytes(t, ['hemoglobin', 'bilirubin']);
 * // Returns ["Hemoglobin", "Bilirubin"] in English
 */
export const translateAnalytes = (
  t: TFunction,
  analytes: Analyte[],
): string[] => {
  return analytes.map((analyte) => translateAnalyte(t, analyte));
};
