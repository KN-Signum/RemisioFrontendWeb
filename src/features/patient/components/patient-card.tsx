import { GetPatientDto } from '../types';

type PatientCardProps = {
  patient: GetPatientDto;
  onClick: () => void;
};

export const PatientCard = (props: PatientCardProps) => {
  const { patient, onClick } = props;
  return (
    <div
      onClick={onClick}
      className="bg-primary-accent/10 flex h-fit cursor-pointer flex-col gap-2 rounded-lg border border-gray-300 p-4 transition-transform duration-200 hover:scale-105 hover:shadow-lg"
    >
      <span className="text-primary-accent line-clamp-1 text-lg font-semibold">
        {patient.name}
      </span>
      <div className="text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <span className="material-icons text-primary-accent">
            location_on
          </span>
          {'Borowska'}
        </div>
        <div className="flex items-center gap-2">
          <span className="material-icons text-primary-accent">medication</span>
          {patient.disease_type}
        </div>
        <div className="flex items-center gap-2">
          <span className="material-icons text-primary-accent">bar_chart</span>
          {'0'}%
        </div>
      </div>
    </div>
  );
};
