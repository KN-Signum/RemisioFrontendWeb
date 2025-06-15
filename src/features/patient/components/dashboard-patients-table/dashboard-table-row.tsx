import { DiseaseType, GenderType, PatientState } from '@/types';
import { formatDiseaseName } from '@/utils/format-disease-name';
import { formatDateDisplay } from '@/utils/format-date-display';
import { useTranslation } from 'react-i18next';
import { IoPersonOutline } from 'react-icons/io5';

const PatientName = ({
  name,
  gender,
  age,
}: {
  name: string;
  gender: GenderType;
  age: number;
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex w-full items-center gap-2">
      <IoPersonOutline className="bg-secondary-accent/30 size-8 rounded-full p-0.5" />
      <div className="flex flex-col">
        <span className="line-clamp-1">{name}</span>
        <span className="text-primary-accent/50 -mt-0.5 line-clamp-1 text-xs">
          {t(`dashboard.table.${gender}`)}, {age}
          {t('dashboard.table.years')}
        </span>
      </div>
    </div>
  );
};

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
  name: string;
  gender: GenderType;
  age: number;
  disease: DiseaseType;
  state: PatientState;
  last_visit: Date;
  drugs: string[];
}

export const DashboardTableRow = (props: DashboardTablePatientDto) => {
  const { t } = useTranslation();
  const { name, gender, age, disease, state, last_visit, drugs } = props;
  const stateColor = getStateColor(state);

  return (
    <div className="bg-foreground flex cursor-pointer gap-2 overflow-auto px-4 py-3 hover:bg-gray-100">
      <div className="flex-2">
        <PatientName name={name} gender={gender} age={age} />
      </div>
      <div className="flex-2">{formatDiseaseName(disease)}</div>
      <div className="flex-1">
        <span className={stateColor}>{state}</span>
      </div>
      <div className="flex-1">{formatDateDisplay(last_visit)}</div>
      <div className="flex-2">
        {drugs.length > 0 ? drugs.join(', ') : t('general.none')}
      </div>
    </div>
  );
};
