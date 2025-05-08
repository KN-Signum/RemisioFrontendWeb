import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineDashboard,
  AiOutlineSetting,
  AiOutlineCalendar,
  AiOutlineQuestionCircle,
} from "react-icons/ai";
import { BsPeople } from "react-icons/bs";

type SidebarItemProps = {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
};

const iconSize = "size-8";

const SidebarItem = (props: SidebarItemProps) => {
  return (
    <div
      className="flex flex-col items-center text-primary-accent hover:bg-white/10 rounded-sm w-[80%] pt-0.5 cursor-pointer"
      onClick={props.onClick}
    >
      {props.icon}
      <span>{props.title}</span>
    </div>
  );
};

export const Sidebar = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <aside className="flex flex-col ml-4 h-full items-center justify-around bg-primary/85 w-30 rounded-sm shadow-primary-accent shadow-sm">
      <SidebarItem
        title={t("sidebar.dashboard")}
        icon={<AiOutlineDashboard className={iconSize} />}
        onClick={() => navigate("/dashboard")}
      />
      <SidebarItem
        title={t("sidebar.patients")}
        icon={<BsPeople className={iconSize} />}
        onClick={() => navigate("/patients")}
      />
      <SidebarItem
        title={t("sidebar.calendar")}
        icon={<AiOutlineCalendar className={iconSize} />}
        onClick={() => navigate("/calendar")}
      />
      <SidebarItem
        title={t("sidebar.help")}
        icon={<AiOutlineQuestionCircle className={iconSize} />}
        onClick={() => navigate("/help")}
      />
      <SidebarItem
        title={t("sidebar.settings")}
        icon={<AiOutlineSetting className={iconSize} />}
        onClick={() => navigate("/settings")}
      />
    </aside>
  );
};
