import { AiOutlineSetting } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { BiWorld } from 'react-icons/bi';

export const Header = () => {
  return (
    <header>
      <div className="mt-4 mb-1.5 flex w-full gap-14 pr-2 pl-10">
        <div className="flex items-center justify-center gap-2">
          <img src="/logo.svg" alt="Logo" className="size-12" />
          <span className="text-primary-accent text-3xl font-bold">
            GastroApp
          </span>
        </div>
        <div className="bg-foreground border-primary-accent/60 shadow-primary-accent text-primary-accent flex h-14 w-full items-center justify-end rounded-sm border px-2 py-1 text-2xl shadow-xs">
          <div className="mr-6 flex h-14 w-[16%] items-center justify-between">
            <AiOutlineSetting className="size-8" />
            <BsFillPersonFill className="size-8" />
            <BiWorld className="size-8" />
          </div>
        </div>
      </div>
    </header>
  );
};
