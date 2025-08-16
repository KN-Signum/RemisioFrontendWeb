import { useTranslation } from 'react-i18next';
import { BigTableRow, paddings } from './big-table-row';
import { GetPatientDto } from '@/features/patients/types';
import { calculateState } from '@/utils/calculate-state';

interface SmallPatientsTableProps {
  disease: 'CDAI' | 'Mayo';
  patients: GetPatientDto[];
}

export const BigPatientsTable = ({
  disease,
  patients,
}: SmallPatientsTableProps) => {
  const { t } = useTranslation('patients');
  return (
    <div className="h-max max-h-full w-full flex-1 overflow-y-auto">
      <div className="border-primary-accent divide-primary-accent bg-secondary-accent text-primary-accent flex items-center gap-2 divide-x rounded-t-sm border-1 border-b-2 text-center text-sm font-bold">
        <div className={`flex-2 ${paddings}`}>{t('fullName')}</div>
        <div className={`flex-1 ${paddings}`}>{t('age')}</div>
        <div className={`flex-1 ${paddings}`}>{t('state')}</div>
        <div className={`flex-1 ${paddings}`}>{disease}</div>
        <div className={`flex-1 ${paddings}`}>{t('surveys')}</div>
        <div className={`flex-4 ${paddings}`}>{t('drugs')}</div>
        <div className={`flex-2 ${paddings}`}>{t('diet')}</div>
        <div className={`flex-1 ${paddings}`}>{t('weight')}</div>
      </div>
      <div className="text-primary-accent text-sm">
        {patients.length === 0 ? (
          <div className="flex justify-center py-3 text-gray-500">
            {t('no_patients')}
          </div>
        ) : (
          <>
            {patients.map((patient, idx) => {
              const isPreLast = idx === patients.length - 1;
              return (
                <BigTableRow
                  key={patient.id}
                  id={patient.id}
                  name={patient.first_name + ' ' + patient.last_name}
                  age={patient.age}
                  state={calculateState(patient.last_score)}
                  score={patient.last_score}
                  surveys={patient.surveys}
                  drugs={patient.drugs}
                  diet={patient.diet}
                  weight={patient.weight}
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
