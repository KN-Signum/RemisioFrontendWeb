import { Button } from '@/components/ui/button';

interface HistoryTileProps {
  icon: React.ReactNode;
  onClick: () => void;
}

export const HistoryTile = ({ icon, onClick }: HistoryTileProps) => (
  <div className="bg-secondary hover:bg-primary-accent/80 rounded-lg p-4 transition">
    <Button
      onClick={onClick}
      className="flex h-full w-full items-center justify-center bg-transparent p-0"
    >
      {icon}
    </Button>
  </div>
);
