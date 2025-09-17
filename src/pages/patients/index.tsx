import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '@/components/layout/main';

import {
  SearchBar,
  useGetPatients,
  SmallPatientsTable,
  BigPatientsTable,
} from '@/features/patients';
import { FaCaretRight, FaCaretLeft } from 'react-icons/fa';
import { DISEASE_TYPES } from '@/utils/types';

const PatientsPage = () => {
  const { t } = useTranslation('', { keyPrefix: 'general' });
  const [searchQuery, setSearchQuery] = useState('');
  const { data: patients, isLoading: patientsLoading } = useGetPatients();
  const [view, setView] = useState<'both' | 'uc' | 'crohn'>('both');

  const ucPatients = useMemo(() => {
    return patients.filter((patient) => {
      const matchesSearch = `${patient.first_name} ${patient.last_name}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const isUC = patient.disease_type === DISEASE_TYPES.ulcerative_colitis;
      return matchesSearch && isUC;
    });
  }, [patients, searchQuery]);

  const crohnPatients = useMemo(() => {
    return patients.filter((patient) => {
      const matchesSearch = `${patient.first_name} ${patient.last_name}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const isCrohn = patient.disease_type === DISEASE_TYPES.crohn;
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
          <SearchBar
            placeholder={t('searchPatients')}
            onSearch={handleSearch}
          />
        </div>
        <div className="flex h-full gap-1">
          {(view === 'both' || view === 'uc') && (
            <div className="flex flex-1 flex-col">
              <h2 className="text-primary-accent mb-3 text-center text-lg font-semibold">
                {t('disease.ulcerative_colitis')}
              </h2>
              {view === 'both' && (
                <SmallPatientsTable
                  patients={ucPatients}
                  disease={DISEASE_TYPES.ulcerative_colitis}
                />
              )}
              {view === 'uc' && (
                <BigPatientsTable
                  patients={ucPatients}
                  disease={DISEASE_TYPES.ulcerative_colitis}
                />
              )}
            </div>
          )}
          <div className="justify-top mt-8 flex w-5 flex-col gap-2">
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
          {(view === 'both' || view === 'crohn') && (
            <div className="flex flex-1 flex-col">
              <h2 className="text-primary-accent mb-3 text-center text-lg font-semibold">
                {t('disease.crohn')}
              </h2>
              {view === 'both' && (
                <SmallPatientsTable
                  patients={crohnPatients}
                  disease={DISEASE_TYPES.crohn}
                />
              )}
              {view === 'crohn' && (
                <BigPatientsTable
                  patients={crohnPatients}
                  disease={DISEASE_TYPES.crohn}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PatientsPage;
