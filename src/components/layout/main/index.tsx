import { Header } from './header';
import { Sidebar } from './sidebar';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="bg-background flex h-screen flex-col">
      <Header />
      <div className="flex h-full flex-row overflow-hidden pt-3.5 pb-2">
        <div className="sticky pb-1">
          <Sidebar />
        </div>
        <div className="h-full max-h-full flex-1 overflow-auto pr-2 pb-1 pl-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
