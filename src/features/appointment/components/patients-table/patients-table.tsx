import { useTranslation } from 'react-i18next';
import { IoPersonOutline } from 'react-icons/io5';

type PatientNameProps = {
  name: string;
  male: boolean;
  age: number;
};

const PatientName = (props: PatientNameProps) => {
  const { t } = useTranslation();
  const { name, male, age } = props;
  return (
    <div className="flex w-full items-center gap-2">
      <IoPersonOutline className="bg-secondary-accent/30 size-8 rounded-full p-0.5" />
      <div className="flex flex-col">
        <span className="line-clamp-1">{name}</span>
        <span className="text-primary-accent/50 -mt-0.5 line-clamp-1 text-xs">
          {male ? t('dashboard.table.male') : t('dashboard.table.female')},{' '}
          {age} {t('dashboard.table.years')}
        </span>
      </div>
    </div>
  );
};

const TableRow = () => {
  return (
    <div className="bg-foreground flex gap-2 overflow-auto px-4 py-3">
      <div className="flex-1">
        <PatientName name="Jan Kowalski" male={true} age={10} />
      </div>
      <div className="flex-1">Wyleczony</div>
      <div className="flex-1">11.05.2025</div>
      <div className="flex-2">Lek X</div>
    </div>
  );
};

export const PatientsTable = () => {
  const { t } = useTranslation();
  return (
    <div className="max-h-full w-full overflow-y-scroll rounded-xs">
      <div className="bg-secondary flex items-center gap-2 px-4 py-3 text-left text-sm font-bold text-white/80">
        <div className="flex-1">{t('dashboard.table.full_name')}</div>
        <div className="flex-1">{t('dashboard.table.mayo_state')}</div>
        <div className="flex-1">{t('dashboard.table.last_visit')}</div>
        <div className="flex-2">{t('dashboard.table.drugs')}</div>
      </div>
      <div className="text-primary-accent text-sm">
        <TableRow />
        <TableRow />
        <TableRow />
        <TableRow />
        <TableRow />
        <TableRow />
        <TableRow />
        <TableRow />
      </div>
    </div>
  );
};
