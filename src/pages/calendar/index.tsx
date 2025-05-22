import Layout from '@/components/layout';
import { Calendar, useGetVisits } from '@/features/visits';
import { Loading } from '@/components/ui/loading';

export const CalendarPage = () => {
  const { data: visits, isLoading } = useGetVisits();

  return (
    <Layout>
      <div className="bg-foreground border-primary-accent/60 shadow-primary-accent h-full w-full rounded-sm border-2 px-4 py-2 shadow-xs">
        {isLoading ? <Loading size={100} /> : <Calendar visits={visits} />}
      </div>
    </Layout>
  );
};
