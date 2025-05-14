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
    <tr className="bg-foreground overflow-auto">
      <td className="py-2 pl-4">
        <PatientName name="Jan Kowalski" male={true} age={10} />
      </td>
      <td>Wyleczony</td>
      <td>11.05.2025</td>
      <td className="py-2 pr-4">
        Lek XLekLek XLekLek XLekLek XLekLek XLekLek XLek Lek XLekLek XLek
      </td>
    </tr>
  );
};

export const PatientsTable = () => {
  const { t } = useTranslation();
  return (
    <div className="max-h-full w-[65%] overflow-y-scroll rounded-xs">
      <table className="w-full table-fixed">
        <thead className="bg-secondary text-left text-sm font-bold text-white/80">
          <th className="py-3 pl-4">{t('dashboard.table.full_name')}</th>
          <th>{t('dashboard.table.mayo_state')}</th>
          <th>{t('dashboard.table.last_visit')}</th>
          <th className="py-3 pr-4">{t('dashboard.table.drugs')}</th>
        </thead>
        <tbody className="text-primary-accent text-sm">
          <TableRow />
          <TableRow />
          <TableRow />
          <TableRow />
          <TableRow />
          <TableRow />
          <TableRow />
          <TableRow />
        </tbody>
      </table>
    </div>
  );
};
