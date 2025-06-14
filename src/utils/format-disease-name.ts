import { DiseaseType } from '@/types';

export function formatDiseaseName(disease: DiseaseType): string {
  switch (disease) {
    case 'crohn':
      return "Crohn's Disease";
    case 'ulcerative_colitis':
      return 'Ulcerative Colitis';
    default:
      return 'Unknown Disease';
  }
}
