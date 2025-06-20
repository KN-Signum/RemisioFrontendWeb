import {
  BiBody,
  BiClinic,
  BiHealth,
  BiPhone,
  BiTimeFive,
  BiFirstAid,
  BiPulse,
  BiBandAid,
  BiRestaurant,
} from 'react-icons/bi';
import { SymptomDto, SymptomHistoryDialog } from '@/features/symptoms';
import { DrugDto, DrugHistoryDialog } from '@/features/drug';
import { MealHistoryDialog } from '@/features/meal';

import { Button } from '@/components/ui/button';

import { useState } from 'react';
import { CrohnSurveyHistoryDialog, UcSurveyHistoryDialog } from '@/features/survey';

interface PatientInfoCardProps {
  id: string;
  name: string;
  hospital: string;
  phone_number: string;
  age: number;
  weight: number;
  disease_type: string;
  drugs?: DrugDto[];
  drugsLoading: boolean;
  symptoms?: SymptomDto[];
  symptomsLoading: boolean;
  symptomsError?: unknown;
}

export const PatientInfoCard = ({
  id,
  name,
  hospital,
  phone_number,
  age,
  weight,
  disease_type,
  drugs,
  drugsLoading,
  symptoms,
  symptomsLoading,
  symptomsError,
}: PatientInfoCardProps) => {
  /* lokalny stan do otwierania okienek */
  const [openSurvey, setOpenSurvey] = useState(false);
  const [openSymptoms, setOpenSymptoms] = useState(false);
  const [openDrugs, setOpenDrugs] = useState(false);
  const [openMeals, setOpenMeals] = useState(false);
  const SurveyDialog =
    disease_type === 'crohn'
      ? CrohnSurveyHistoryDialog
      : UcSurveyHistoryDialog;

  return (
    <div className="flex w-[35%] gap-4 overflow-y-auto rounded-sm bg-white p-4 shadow-md">
      {/* left column */}
      <div className="text-primary-accent flex min-w-[120px] flex-col items-start gap-4">
        <span className="bg-primary block rounded-lg px-4 py-3 text-xl leading-tight font-semibold text-white">
          {name}
        </span>

        <ul className="flex flex-col gap-2 text-base">
          <li className="flex items-center gap-2">
            <BiClinic className="text-xl" /> {hospital}
          </li>
          <li className="flex items-center gap-2">
            <BiPhone className="text-xl" /> {phone_number}
          </li>
          <li className="flex items-center gap-2">
            <BiTimeFive className="text-xl" /> {age} years
          </li>
          <li className="flex items-center gap-2">
            <BiBody className="text-xl" /> {weight} kg
          </li>
          <li className="flex items-center gap-2">
            <BiHealth className="text-xl" />{' '}
            {disease_type === 'crohn' ? 'Crohn' : 'Ulcerative Colitis'}
          </li>
        </ul>
      </div>

      {/* right column */}
      <div className="border-primary-accent flex flex-1 flex-col gap-4 border-l-2 pl-4">
        <div className="text-primary-accent flex flex-col gap-1">
          <span>Status: good</span>
          <span>Zmiana: -2%</span>
          <span>Dieta: zdrowa</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Symptoms */}
          <HistoryTile
            icon={<BiPulse className="text-3xl text-white" />}
            onClick={() => setOpenSymptoms(true)}
          />
          {/* Drugs */}
          <HistoryTile
            icon={<BiBandAid className="text-3xl text-white" />}
            onClick={() => setOpenDrugs(true)}
          />
          {/* Meals */}
          <HistoryTile
            icon={<BiRestaurant className="text-3xl text-white" />}
            onClick={() => setOpenMeals(true)}
          />
          {/* Surveys */}
          <HistoryTile
            icon={<BiFirstAid className="text-3xl text-white" />}
            onClick={() => setOpenSurvey(true)}
          />
        </div>
      </div>

      {/* właściwy dialog (Crohn lub UC) */}
      <SurveyDialog
        patientId={id}
        isOpen={openSurvey}
        onClose={() => setOpenSurvey(false)}
      />
      <SymptomHistoryDialog
        isOpen={openSymptoms}
        onClose={() => setOpenSymptoms(false)}
        symptoms={symptoms}
        loading={symptomsLoading}
        error={symptomsError}
      />
      <DrugHistoryDialog
        isOpen={openDrugs}
        onClose={() => setOpenDrugs(false)}
        drugs={drugs}
        loading={drugsLoading}
      />
      <MealHistoryDialog
        patientId={id}
        isOpen={openMeals}
        onClose={() => setOpenMeals(false)}
      />
    </div>
  );
};

const HistoryTile = ({
  icon,
  onClick,
}: {
  icon: React.ReactNode;
  onClick: () => void;
}) => (
  <div className="bg-secondary hover:bg-primary-accent/80 rounded-lg p-4 transition">
    <Button
      onClick={onClick}
      className="flex h-full w-full items-center justify-center bg-transparent p-0"
    >
      {icon}
    </Button>
  </div>
);
