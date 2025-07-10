import { useTranslation } from 'react-i18next';
import { GetPatientDto } from '@/features/patient/types';
import { DashboardTableRow } from './dashboard-table-row';
import { calculateState } from '@/utils/calculate-state';

export const DashboardPatientsTable = ({
  patients,
}: {
  patients: GetPatientDto[];
}) => {
  const { t } = useTranslation();

  return (
    <div className="max-h-full w-full overflow-y-scroll rounded-xs">
      <div className="bg-secondary flex items-center gap-2 px-4 py-3 text-left text-sm font-bold text-white/80">
        <div className="flex-2">{t('dashboard.table.full_name')}</div>
        <div className="flex-2">{t('dashboard.table.disease')}</div>
        <div className="flex-1">{t('dashboard.table.state')}</div>
        <div className="flex-1">{t('dashboard.table.last_visit')}</div>
        <div className="flex-2">{t('dashboard.table.drugs')}</div>
      </div>
      <div className="text-primary-accent text-sm">
        {patients.map((patient) => (
          <DashboardTableRow
            key={patient.id}
            id={patient.id}
            name={patient.first_name + ' ' + patient.last_name}
            gender={patient.gender}
            age={patient.age}
            disease={patient.disease_type}
            state={calculateState(patient.last_score)}
            last_visit={patient.last_visit}
            drugs={patient.drugs}
          />
        ))}
      </div>
    </div>
  );
};
