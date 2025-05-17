import { Header } from './header';
import { Sidebar } from './sidebar';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="bg-background flex h-screen flex-col">
      <Header />
      <div className="mb-2 flex h-full flex-row overflow-hidden">
        <Sidebar />
        <div className="h-full max-h-full flex-1 overflow-auto pr-2 pl-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
