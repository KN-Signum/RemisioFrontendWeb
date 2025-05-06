import { AiOutlineSetting } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { BiWorld } from "react-icons/bi";

export const Header = () => {
  return (
    <header>
      <div className="flex w-full mt-4 mb-10 gap-14 h-12">
        <div className="flex gap-3 items-center ml-4">
          <div className="flex items-center justify-centerrounded-full">
            <img src="/logo.svg" alt="Logo" className="size-16" />
          </div>
          <span className="text-3xl font-bold text-primary-accent">
            GastroApp
          </span>
        </div>
        <div className="flex justify-between w-full mr-4 items-center px-12 bg-foreground text-2xl text-primary-accent rounded-sm">
          <span className="font-bold">Welcome John</span>
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
