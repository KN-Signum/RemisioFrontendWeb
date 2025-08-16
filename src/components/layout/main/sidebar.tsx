import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  AiOutlineDashboard,
  AiOutlineSetting,
  AiOutlineCalendar,
  AiOutlineQuestionCircle,
} from 'react-icons/ai';
import { BsPeople } from 'react-icons/bs';

type SidebarItemProps = {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
};

const iconSize = 'size-8';

const SidebarItem = (props: SidebarItemProps) => {
  return (
    <div
      className="text-primary-accent flex w-[80%] cursor-pointer flex-col items-center rounded-sm pt-0.5 hover:bg-white/10"
      onClick={props.onClick}
    >
      {props.icon}
      <span>{props.title}</span>
    </div>
  );
};

export const Sidebar = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('', { keyPrefix: 'layout.sidebar' });

  return (
    <aside
      className="bg-primary/22 border-primary-accent/60 ml-2 flex h-full w-23 flex-col items-center justify-around rounded-sm border"
      style={{
        boxShadow: '0.05rem 0.08rem 3px var(--color-primary-accent)',
      }}
    >
      <SidebarItem
        title={t('dashboard')}
        icon={<AiOutlineDashboard className={iconSize} />}
        onClick={() => navigate('/dashboard')}
      />
      <SidebarItem
        title={t('patients')}
        icon={<BsPeople className={iconSize} />}
        onClick={() => navigate('/patients')}
      />
      <SidebarItem
        title={t('calendar')}
        icon={<AiOutlineCalendar className={iconSize} />}
        onClick={() => navigate('/calendar')}
      />
      <SidebarItem
        title={t('help')}
        icon={<AiOutlineQuestionCircle className={iconSize} />}
        onClick={() => navigate('/help')}
      />
      <SidebarItem
        title={t('settings')}
        icon={<AiOutlineSetting className={iconSize} />}
        onClick={() => navigate('/settings')}
      />
    </aside>
  );
};
