import {
  BiBandAid,
  BiBody,
  BiClinic,
  BiFirstAid,
  BiHealth,
  BiPhone,
  BiPulse,
  BiRestaurant,
  BiTimeFive,
} from 'react-icons/bi';

interface PatientInfoCardProps {
  name: string;
  hospital: string;
  phone_number: string;
  age: number;
  weight: number;
}

export const PatientInfoCard = (props: PatientInfoCardProps) => {
  const { name, hospital, phone_number, age, weight } = props;
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
            <BiHealth className="text-xl" /> Crohn
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
          {[
            { Icon: BiPulse },
            { Icon: BiRestaurant },
            { Icon: BiBandAid },
            { Icon: BiFirstAid },
          ].map(({ Icon }, idx) => (
            <button
              key={idx}
              className="bg-secondary hover:bg-primary-accent/80 flex items-center justify-center rounded-lg p-4 transition"
            >
              <Icon className="text-3xl text-white" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
