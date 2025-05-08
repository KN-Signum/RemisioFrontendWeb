import { AiOutlineSetting } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { BiWorld } from "react-icons/bi";
import { useTranslation } from "react-i18next";

export const Header = () => {
  const { t } = useTranslation();

  return (
    <header>
      <div className="flex pl-10 pr-2 w-full mt-4 mb-5 gap-14 h-12">
        <div className="flex items-center">
          <div className="flex gap-2 items-center justify-center">
            <img src="/logo.svg" alt="Logo" className="size-12" />
            <span className="text-3xl font-bold text-primary-accent">
              GastroApp
            </span>
          </div>
        </div>
        <div className="flex justify-between w-full items-center px-12 bg-foreground text-2xl text-primary-accent rounded-sm">
          <span className="font-bold">{t("navbar.welcome")} John</span>
          <div className="flex gap-20 items-center">
            <AiOutlineSetting />
            <BsFillPersonFill />
            <BiWorld />
          </div>
        </div>
      </div>
    </header>
  );
};
