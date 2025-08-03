import { DiseaseType, GenderType, PatientState } from '@/types';
import { formatDiseaseName } from '@/utils/format-disease-name';
import { formatDateDisplay } from '@/utils/format-date-display';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { PatientDetail } from './patient-detail';

// Function to get state color based on patient state
const getStateColor = (state: PatientState): string => {
  switch (state) {
    case 'Remission':
      return 'text-green-600';
    case 'Mild':
      return 'text-yellow-600';
    case 'Moderate':
      return 'text-orange-600';
    case 'Severe':
      return 'text-red-600';
    default:
      return '';
  }
};

interface DashboardTablePatientDto {
  id: string;
  name: string;
  gender: GenderType;
  age: number;
  disease: DiseaseType;
  state: PatientState;
  last_visit: Date;
  drugs: string[];
}

export const DashboardTableRow = (props: DashboardTablePatientDto) => {
  const { t } = useTranslation('', { keyPrefix: 'general' });
  const navigate = useNavigate();
  const { id, name, gender, age, disease, state, last_visit, drugs } = props;
  const stateColor = getStateColor(state);

  return (
    <div
      className="bg-foreground hover:bg-secondary/20 flex cursor-pointer gap-2 overflow-auto px-4 py-3"
      onClick={() => navigate(`/patients/${id}`)}
    >
      <div className="flex-2">
        <PatientDetail name={name} gender={gender} age={age} />
      </div>
      <div className="flex-2">{formatDiseaseName(disease)}</div>
      <div className="flex-1">
        <span className={stateColor}>{state}</span>
      </div>
      <div className="flex-1">{formatDateDisplay(last_visit)}</div>
      <div className="flex-2">
        {drugs.length > 0 ? drugs.join(', ') : t('none')}
      </div>
    </div>
  );
};
