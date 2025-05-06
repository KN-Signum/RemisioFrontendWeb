export const Header = () => {
  return (
    <header>
      <div className="flex w-full mt-4 mb-10 gap-20 h-12">
        <div className="flex gap-2 items-center ml-4">
          <div className="flex items-center justify-centerrounded-full">
            <img src="/logo.svg" alt="Logo" className="w-12 h-12" />
          </div>
          <span className="text-2xl font-bold text-primary-accent">
            GastroApp
          </span>
        </div>
        <div className="bg-foreground text-2xl text-primary-accent">
          Welcome to GastroApp! This is a simple application to manage your
        </div>
      </div>
    </header>
  );
};
