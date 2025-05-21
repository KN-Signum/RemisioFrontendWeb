import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout';
import { SearchBar } from '@/features/patient/components/SearchBar';
import {
  NewPatientForm,
  PatientPayload,
} from '@/features/patient/components/NewPatientForm';
// import { createPatient } from '@/features/patient/api/create-patient';

import * as Dialog from '@radix-ui/react-dialog';
import { BiPlus } from 'react-icons/bi';
// import { toast } from 'react-hot-toast';

import { usePatients } from '@/features/patient';
import { PatientCard } from '@/features/patient/components/patient-card';

const PatientsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = useState(false);

  const { data: patients, isLoading: patientsLoading } = usePatients();
  console.log('Patients', patients);

  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string>();

  const navigate = useNavigate();

  const handleSearch = (q: string) => setSearchQuery(q);
  const handlePatientClick = (id: string) => navigate(`/patients/${id}`);

  const handleFormSubmit = async (data: PatientPayload) => {
    setFormLoading(true);
    setFormError(undefined);
    console.log('Form data', data);
  };

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
      <div className="flex h-full w-full flex-col overflow-hidden rounded-sm bg-white p-8 shadow-2xl">
        <div className="mb-6 flex items-center justify-center gap-4">
          <SearchBar placeholder="Search patients..." onSearch={handleSearch} />

          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <button
                aria-label="Add patient"
                className="bg-primary-accent hover:bg-primary-accent/80 cursor-pointer rounded-full p-3 text-white shadow-lg transition"
              >
                <BiPlus className="text-2xl" />
              </button>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
              <Dialog.Content className="fixed top-1/2 left-1/2 flex w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 flex-col gap-4 rounded-xl bg-white p-6 shadow-xl">
                <Dialog.Title className="text-primary text-xl font-bold">
                  Nowy pacjent
                </Dialog.Title>

                <NewPatientForm
                  onSubmit={handleFormSubmit}
                  isLoading={formLoading}
                  error={formError}
                />

                <Dialog.Close asChild>
                  <button
                    aria-label="Close"
                    className="hover:text-primary-accent absolute top-3 right-3 text-2xl text-gray-400"
                  >
                    &times;
                  </button>
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>

        <div className="grid grid-cols-1 gap-4 overflow-y-auto p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {patients
            .filter((p) =>
              p.name.toLowerCase().includes(searchQuery.toLowerCase()),
            )
            .map((patient) => (
              <PatientCard
                patient={patient}
                onClick={() => handlePatientClick(patient.id)}
              />
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default PatientsPage;
