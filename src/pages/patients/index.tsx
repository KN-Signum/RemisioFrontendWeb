import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout';

import { SearchBar, usePatients } from '@/features/patient';
import { PatientCard } from '@/features/patient/components/patient-card';

const PatientsPage = () => {
  const navigate = useNavigate();
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
  const handlePatientClick = (id: string) => navigate(`/patients/${id}`);

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
      <div className="bg-foreground border-primary-accent/60 shadow-primary-accent w-full overflow-y-visible rounded-sm border-2 px-4 pt-6 pb-4 shadow-xs">
        <div className="mb-4 flex items-center justify-center gap-4">
          <SearchBar placeholder="Search patients..." onSearch={handleSearch} />
          {/* 
          <BiPlus
            className="bg-primary-accent hover:bg-primary-accent/80 cursor-pointer rounded-full text-2xl text-white shadow-lg transition"
            onClick={() => setIsDialogOpen(true)}
          />
          */}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Column 1 – Ulcerative Colitis Patients */}
          <div className="flex flex-col gap-4">
            <span className="text-primary mb-2 text-lg font-semibold">
              Ulcerative Colitis Patients
            </span>
            {ucPatients.length === 0 ? (
              <span className="text-gray-500">
                No ulcerative colitis patients found
              </span>
            ) : (
              ucPatients.map((patient) => (
                <PatientCard
                  key={patient.id}
                  patient={patient}
                  onClick={() => handlePatientClick(patient.id)}
                />
              ))
            )}
          </div>

          {/* Column 2 – Crohn's Disease Patients */}
          <div className="flex flex-col gap-4">
            <span className="text-primary mb-2 text-lg font-semibold">
              Crohn's Disease Patients
            </span>
            {crohnPatients.length === 0 ? (
              <span className="text-gray-500">
                No Crohn's disease patients found
              </span>
            ) : (
              crohnPatients.map((patient) => (
                <PatientCard
                  key={patient.id}
                  patient={patient}
                  onClick={() => handlePatientClick(patient.id)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PatientsPage;
