import { Header } from "./header";
import { Sidebar } from "./sidebar";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col bg-background max-h-screen overflow-auto h-screen">
      <Header />
      <div className="flex flex-row h-full mb-4">
        <Sidebar />
        <div
          className={`flex-1 2xl:px-4 xl:px-15 mb-10 overflow-visible h-max`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
