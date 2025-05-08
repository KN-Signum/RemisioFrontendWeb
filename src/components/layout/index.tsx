import { Header } from "./header";
import { Sidebar } from "./sidebar";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col bg-background h-screen">
      <Header />
      <div className="flex flex-row h-full overflow-hidden mb-2">
        <Sidebar />
        <div className={`flex-1 px-2 h-full max-h-full overflow-auto`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
