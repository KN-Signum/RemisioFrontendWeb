import { useTranslation } from 'react-i18next';
import { GetPatientDto } from '../../types';
import { BigTableRow, paddings } from './big-table-row';

interface SmallPatientsTableProps {
  diesese: string;
  patients: GetPatientDto[];
}

export const BigPatientsTable = ({
  diesese,
  patients,
}: SmallPatientsTableProps) => {
  const { t } = useTranslation();
  return (
    <div className="h-max max-h-full w-full flex-1 overflow-y-auto">
      <div className="border-primary-accent divide-primary-accent bg-secondary-accent text-primary-accent flex items-center gap-2 divide-x rounded-t-sm border-1 border-b-2 text-center text-sm font-bold">
        <div className={`flex-2 ${paddings}`}>
          {t('patients-tables.full_name')}
        </div>
        <div className={`flex-1 ${paddings}`}>{t('patients-tables.age')}</div>
        <div className={`flex-1 ${paddings}`}>{t('patients-tables.state')}</div>
        <div className={`flex-1 ${paddings}`}>{diesese}</div>
        <div className={`flex-1 ${paddings}`}>
          {t('patients-tables.surveys')}
        </div>
        <div className={`flex-4 ${paddings}`}>{t('patients-tables.drugs')}</div>
        <div className={`flex-2 ${paddings}`}>{t('patients-tables.diet')}</div>
        <div className={`flex-1 ${paddings}`}>BMI</div>
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
                <BigTableRow
                  key={patient.id}
                  id={patient.id}
                  name={patient.name}
                  age={patient.age}
                  state={patient.state}
                  score={patient.score}
                  surveys={30} // Placeholder for surveys count
                  drugs={['ibuphrophen', 'stoperan', 'lorem', 'lipsum']} // Assuming drugs is an array
                  diet="Gluten Free" // Placeholder for diet
                  bmi={20} // Assuming bmi is a number
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
