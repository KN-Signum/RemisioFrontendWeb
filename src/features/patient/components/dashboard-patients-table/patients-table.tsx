import { useTranslation } from 'react-i18next';
import { IoPersonOutline } from 'react-icons/io5';
import { SimpleTablePatientDto } from '../../types';
import { useTablePatients } from '../../api/get-table-patients';
import { useNavigate } from 'react-router-dom';

type PatientNameProps = {
  name: string;
};

const PatientName = (props: PatientNameProps) => {
  const { name } = props;

  return (
    <div className="flex w-full items-center gap-2">
      <IoPersonOutline className="bg-secondary-accent/30 size-8 rounded-full p-0.5" />
      <div className="flex flex-col">
        <span className="line-clamp-1">{name}</span>
      </div>
    </div>
  );
};

// Function to get state color based on patient state
const getStateColor = (state: string): string => {
  switch (state.toLowerCase()) {
    case 'remission':
      return 'text-green-600';
    case 'mild':
      return 'text-yellow-600';
    case 'moderate':
      return 'text-orange-600';
    case 'severe':
      return 'text-red-600';
    default:
      return '';
  }
};

const TableRow = ({ patient }: { patient: SimpleTablePatientDto }) => {
  const stateColor = getStateColor(patient.state);
  const navigate = useNavigate();

  const handleRowClick = () => {
    navigate(`/patients/${patient.id}`);
  };

  return (
    <div
      className="bg-foreground flex cursor-pointer gap-2 overflow-auto px-4 py-3 hover:bg-gray-100"
      onClick={handleRowClick}
    >
      <div className="flex-1">
        <PatientName name={patient.name} />
      </div>
      <div className="flex-1">{patient.disease}</div>
      <div className="flex-1">
        <span className={stateColor}>{patient.state}</span>
      </div>
      <div className="flex-1">{patient.last_visit}</div>
      <div className="flex-2">{patient.drugs}</div>
    </div>
  );
};

export const DashboardPatientsTable = () => {
  const { t } = useTranslation();
  const { data: patients, isLoading } = useTablePatients();

  if (isLoading) {
    return <div className="p-4">Loading patients...</div>;
  }

  return (
    <div className="max-h-full w-full overflow-y-scroll rounded-xs">
      <div className="bg-secondary flex items-center gap-2 px-4 py-3 text-left text-sm font-bold text-white/80">
        <div className="flex-1">{t('dashboard.table.full_name')}</div>
        <div className="flex-1">{t('dashboard.table.disease')}</div>
        <div className="flex-1">{t('dashboard.table.state')}</div>
        <div className="flex-1">{t('dashboard.table.last_visit')}</div>
        <div className="flex-2">{t('dashboard.table.drugs')}</div>
      </div>
      <div className="text-primary-accent text-sm">
        {patients.map((patient) => (
          <TableRow key={patient.id} patient={patient} />
        ))}
      </div>
    </div>
  );
};
