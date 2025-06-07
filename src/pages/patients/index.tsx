import { useState, useMemo } from 'react';
import Layout from '@/components/layout';

import { SearchBar, usePatients } from '@/features/patient';
import { FaCaretRight, FaCaretLeft } from 'react-icons/fa';
import { SmallPatientsTable } from '@/features/patient/components/small-patients-table/small-patients-table';

const PatientsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: patients, isLoading: patientsLoading } = usePatients();

  const ucPatients = useMemo(() => {
    return patients.filter((patient) => {
      const matchesSearch = patient.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const isUC =
        String(patient.disease_type).toLowerCase() === 'ulcerative_colitis';
      console.log(
        `${patient.name} - Search match: ${matchesSearch}, Is UC: ${isUC}, disease_type: ${patient.disease_type}`,
      );
      return matchesSearch && isUC;
    });
  }, [patients, searchQuery]);

  const crohnPatients = useMemo(() => {
    return patients.filter((patient) => {
      const matchesSearch = patient.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const isCrohn = String(patient.disease_type).toLowerCase() === 'crohn';
      console.log(
        `${patient.name} - Search match: ${matchesSearch}, Is Crohn: ${isCrohn}, disease_type: ${patient.disease_type}`,
      );
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
          <SmallPatientsTable patients={ucPatients} diesese="Mayo" />
          <div className="flex w-5 flex-col justify-center gap-2 align-middle">
            <FaCaretLeft className="bg-secondary h-10 w-full px-1" />
            <FaCaretRight className="bg-secondary h-10 w-full px-1" />
          </div>
          <SmallPatientsTable patients={crohnPatients} diesese="Cron" />
        </div>
      </div>
    </Layout>
  );
};

export default PatientsPage;
