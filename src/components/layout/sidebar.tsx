import { useTranslation } from 'react-i18next';

interface SidebarItemProps {
  icon: string;
  label: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label }) => (
  <div className="flex flex-col items-center justify-center gap-1 cursor-pointer p-2 hover rounded-md">
    <span className="material-icons text-xl text-primary-accent">{icon}</span>
    <span className="text-xs text-primary-accent">{label}</span>
  </div>
);

export const Sidebar = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col ml-4 items-center justify-around gap-4 bg-primary/60 w-35 h-full py-30  rounded-sm">
      <SidebarItem icon="dashboard" label={t("sidebar.dashboard")} />
      <SidebarItem icon="people" label={t("sidebar.patients")} />
      <SidebarItem icon="calendar_today" label={t("sidebar.calendar")} />
      <SidebarItem icon="help_outline" label={t("sidebar.help")} />
      <SidebarItem icon="settings" label={t("sidebar.settings")} />
    </div>
  );
};
