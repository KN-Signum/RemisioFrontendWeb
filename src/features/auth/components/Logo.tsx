export const Logo = () => {
    return (
        <div className="mx-auto flex max-w-sm items-center gap-x-4">
            <img
                src="/logo.svg"
                alt="Logo"
                className="h-16 w-16 object-cover"
            />
            <div className="text-primary-accent text-3xl font-bold color"> GastroApp </div>
        </div>
    );
}