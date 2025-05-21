import { AiOutlineSetting } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { BiWorld } from 'react-icons/bi';

export const Header = () => {
  return (
    <header>
      <div className="mt-2 mb-3.5 flex w-full gap-4 pr-2 pl-2">
        <div className="flex w-25 justify-center">
          <img
            src="/logo.svg"
            alt="Logo"
            className="size-18"
            style={{ transform: 'scaleX(1)' }}
          />
        </div>
        <div className="bg-foreground border-primary-accent/60 shadow-primary-accent text-primary-accent flex h-16 w-full items-center justify-end rounded-sm border px-2 py-1 text-2xl shadow-xs">
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
