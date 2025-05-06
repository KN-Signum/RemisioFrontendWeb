export const Logo = () => {
    return (
        <div className="mx-auto flex max-w-sm items-center gap-x-4">
            <img
                src="/logo.svg"
                alt="Logo"
                className="h-16 w-16 rounded-full object-cover"
            />
            <div className="text-3xl font-bold"> GastroApp </div>
        </div>
    );
}