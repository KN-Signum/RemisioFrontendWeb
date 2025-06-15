import { useState, useMemo } from 'react';
import Layout from '@/components/layout';

import {
  SearchBar,
  useGetPatients,
  SmallPatientsTable,
  BigPatientsTable,
} from '@/features/patient';
import { FaCaretRight, FaCaretLeft } from 'react-icons/fa';

const PatientsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: patients, isLoading: patientsLoading } = useGetPatients();
  const [view, setView] = useState<'both' | 'uc' | 'crohn'>('both');

  const ucPatients = useMemo(() => {
    return patients.filter((patient) => {
      const matchesSearch = patient.full_name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const isUC = patient.disease === 'ulcerative_colitis';
      return matchesSearch && isUC;
    });
  }, [patients, searchQuery]);

  const crohnPatients = useMemo(() => {
    return patients.filter((patient) => {
      const matchesSearch = patient.full_name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const isCrohn = patient.disease === 'crohn';
      return matchesSearch && isCrohn;
    });
  }, [patients, searchQuery]);

  const handleSearch = (q: string) => setSearchQuery(q);

  if (patientsLoading) {
    return (
      <Layout>
        <div className="flex h-full w-full items-center justify-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-foreground border-primary-accent/60 shadow-primary-accent h-full w-full overflow-hidden rounded-sm border-2 px-4 pt-6 pb-4 shadow-xs">
        <div className="mb-4 flex items-center justify-center gap-4">
          <SearchBar placeholder="Search patients..." onSearch={handleSearch} />
        </div>
        <div className="flex h-full gap-1">
          {view === 'both' && (
            <SmallPatientsTable patients={ucPatients} diesese="Mayo" />
          )}
          {view === 'uc' && (
            <BigPatientsTable patients={ucPatients} diesese="Mayo" />
          )}
          <div className="justify-top mt-3 flex w-5 flex-col gap-2">
            {view !== 'uc' && (
              <FaCaretLeft
                className="bg-secondary h-8 w-full rounded-xl pr-1 hover:cursor-pointer hover:opacity-70"
                onClick={() => {
                  if (view === 'both') {
                    setView('uc');
                  } else {
                    setView('both');
                  }
                }}
              />
            )}
            {view !== 'crohn' && (
              <FaCaretRight
                className="bg-secondary h-8 w-full rounded-xl pl-1 hover:cursor-pointer hover:opacity-70"
                onClick={() => {
                  if (view === 'both') {
                    setView('crohn');
                  } else {
                    setView('both');
                  }
                }}
              />
            )}
          </div>
          {view === 'both' && (
            <SmallPatientsTable patients={crohnPatients} diesese="CDAI" />
          )}
          {view === 'crohn' && (
            <BigPatientsTable patients={crohnPatients} diesese="CDAI" />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PatientsPage;
