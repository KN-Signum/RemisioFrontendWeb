import { GenderType } from '@/types';
import { useTranslation } from 'react-i18next';
import { IoPersonOutline } from 'react-icons/io5';

export const PatientDetail = ({
  name,
  gender,
  age,
}: {
  name: string;
  gender: GenderType;
  age: number;
}) => {
  const { t } = useTranslation('patients');
  return (
    <div className="flex w-full items-center gap-2">
      <IoPersonOutline className="bg-secondary-accent/30 size-8 rounded-full p-0.5" />
      <div className="flex flex-col">
        <span className="line-clamp-1">{name}</span>
        <span className="text-primary-accent/50 -mt-0.5 line-clamp-1 text-xs">
          {t(`${gender}`)}, {age}
          {t('years')}
        </span>
      </div>
    </div>
  );
};
