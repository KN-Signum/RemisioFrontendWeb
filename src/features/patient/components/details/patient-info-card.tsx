import {
  BiBody,
  BiClinic,
  BiHealth,
  BiPhone,
  BiRestaurant,
  BiTimeFive,
} from 'react-icons/bi';
import { SurveyHistoryDialog } from '@/features/survey';
import { SymptomHistoryDialog } from '@/features/symptoms';
import { DrugHistoryDialog } from '@/features/drug';

interface Props {
  patient: {
    id: string;
    name: string;
    hospital: string;
    phone_number: string;
    age: number;
    weight: number;
    disease_type: string;
  };
}

export const PatientInfoCard: React.FC<Props> = ({ patient }) => (
  <div className="flex w-[35%] gap-4 overflow-y-auto rounded-sm bg-white p-4 shadow-md">
    {/* left column */}
    <div className="text-primary-accent flex min-w-[120px] flex-col items-start gap-4">
      <span className="bg-primary block rounded-lg px-4 py-3 text-xl leading-tight font-semibold text-white">
        {patient.name}
      </span>

      <ul className="flex flex-col gap-2 text-base">
        <li className="flex items-center gap-2">
          <BiClinic className="text-xl" /> {patient.hospital}
        </li>
        <li className="flex items-center gap-2">
          <BiPhone className="text-xl" /> {patient.phone_number}
        </li>
        <li className="flex items-center gap-2">
          <BiTimeFive className="text-xl" /> {patient.age} years
        </li>
        <li className="flex items-center gap-2">
          <BiBody className="text-xl" /> {patient.weight} kg
        </li>
        <li className="flex items-center gap-2">
          <BiHealth className="text-xl" /> {patient.disease_type === 'crohn' ? 'Crohn' : 'Ulcerative Colitis'}
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
        {/* Symptom History Button */}
        <div className="bg-secondary hover:bg-primary-accent/80 rounded-lg p-4 transition">
          <SymptomHistoryDialog
            patientId={patient.id}
            iconOnly={true}
          />
        </div>

        {/* Drug History Button */}
        <div className="bg-secondary hover:bg-primary-accent/80 rounded-lg p-4 transition">
          <DrugHistoryDialog
            patientId={patient.id}
            iconOnly={true}
          />
        </div>

        {/* Placeholder button for future functionality */}
        <div
          className="bg-secondary hover:bg-primary-accent/80 flex items-center justify-center rounded-lg p-4 transition cursor-pointer"
        >
          <BiRestaurant className="text-3xl text-white" />
        </div>

        {/* Survey History Button */}
        <div className="bg-secondary hover:bg-primary-accent/80 rounded-lg p-4 transition">
          <SurveyHistoryDialog
            patientId={patient.id}
            diseaseType={patient.disease_type as 'crohn' | 'ulcerative_colitis'}
            iconOnly={true}
          />
        </div>
      </div>
    </div>
  </div>
);
