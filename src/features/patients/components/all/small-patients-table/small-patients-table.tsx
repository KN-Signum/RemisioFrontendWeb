import { useTranslation } from 'react-i18next';
import { GetPatientDto } from '@/features/patients/types';
import { TableRow, paddings } from './table-row';
import { calculateState } from '@/utils/calculate-state';

export { TableRow } from './table-row';

interface SmallPatientsTableProps {
  disease: 'CDAI' | 'Mayo';
  patients: GetPatientDto[];
}

export const SmallPatientsTable = ({
  disease,
  patients,
}: SmallPatientsTableProps) => {
  const { t } = useTranslation('patients');
  return (
    <div className="h-max max-h-full flex-1 overflow-y-auto">
      <div className="border-primary-accent divide-primary-accent bg-secondary-accent text-primary-accent flex items-center gap-2 divide-x rounded-t-sm border-1 border-b-2 text-center text-sm font-bold">
        <div className={`flex-3 ${paddings}`}>{t('fullName')}</div>
        <div className={`flex-2 ${paddings}`}>{t('age')}</div>
        <div className={`flex-2 ${paddings}`}>{t('state')}</div>
        <div className={`flex-2 ${paddings}`}>{disease}</div>
      </div>
      <div className="text-primary-accent text-sm">
        {patients.length === 0 ? (
          <div className="flex justify-center py-3 text-gray-500">
            {t('noPatients')}
          </div>
        ) : (
          <>
            {patients.map((patient, idx) => {
              const isPreLast = idx === patients.length - 1;
              return (
                <TableRow
                  key={patient.id}
                  id={patient.id}
                  name={patient.first_name + ' ' + patient.last_name}
                  age={patient.age}
                  state={calculateState(patient.last_score)}
                  score={patient.last_score}
                  roundedBottom={isPreLast}
                />
              );
            })}
            <div className="h-13" />
          </>
        )}
      </div>
    </div>
  );
};
