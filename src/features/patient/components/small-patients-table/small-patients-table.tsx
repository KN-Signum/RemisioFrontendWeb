import { useTranslation } from 'react-i18next';
import { GetPatientDto } from '../../types';
import { TableRow, paddings } from './table-row';

export { TableRow } from './table-row';

interface SmallPatientsTableProps {
  diesese: string;
  patients: GetPatientDto[];
}

export const SmallPatientsTable = ({
  diesese,
  patients,
}: SmallPatientsTableProps) => {
  const { t } = useTranslation();
  return (
    <div className="h-max max-h-full flex-1 overflow-y-auto">
      <div className="border-primary-accent divide-primary-accent bg-secondary-accent text-primary-accent flex items-center gap-2 divide-x rounded-t-sm border-1 border-b-2 text-center text-sm font-bold">
        <div className={`flex-3 ${paddings}`}>
          {t('patients-tables.full_name')}
        </div>
        <div className={`flex-2 ${paddings}`}>{t('patients-tables.age')}</div>
        <div className={`flex-2 ${paddings}`}>{t('patients-tables.state')}</div>
        <div className={`flex-2 ${paddings}`}>{diesese}</div>
      </div>
      <div className="text-primary-accent text-sm">
        {patients.length === 0 ? (
          <div className="flex justify-center py-3 text-gray-500">
            {t('patients-tables.no_patients')}
          </div>
        ) : (
          <>
            {patients.map((patient, idx) => {
              const isPreLast = idx === patients.length - 1;
              return (
                <TableRow
                  key={patient.id}
                  id={patient.id}
                  name={patient.full_name}
                  age={patient.age}
                  state={patient.state}
                  score={patient.score}
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
