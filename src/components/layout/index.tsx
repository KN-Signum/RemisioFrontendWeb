import { Header } from "./header";
import { Sidebar } from "./sidebar";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col bg-background max-h-screen overflow-auto">
      <Header />
      <div className="flex flex-row">
        <Sidebar />
        <div
          className={`flex-1 2xl:px-30 xl:px-15 pt-15 mb-10 overflow-visible h-screen`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
