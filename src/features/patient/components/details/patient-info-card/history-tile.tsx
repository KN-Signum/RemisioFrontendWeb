interface HistoryTileProps {
  icon: React.ReactNode;
  onClick: () => void;
}

export const HistoryTile = ({ icon, onClick }: HistoryTileProps) => (
  <button
    onClick={onClick}
    className="bg-secondary hover:bg-primary-accent/80 flex h-full w-full items-center justify-center rounded-lg p-4 text-3xl transition hover:cursor-pointer"
  >
    {icon}
  </button>
);
