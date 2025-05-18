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
} from "react-icons/bi";

interface Props {
    patient: {
        name: string;
        hospital: string;
        phone_number: string;
        age: number;
        weight: number;
    };
}

export const PatientInfoCard: React.FC<Props> = ({ patient }) => (
    <div className="bg-white w-[35%] p-4 rounded-sm shadow-md flex gap-4 overflow-y-auto">
        {/* left column */}
        <div className="flex flex-col items-start gap-4 min-w-[120px] text-primary-accent">
            <span className="bg-primary text-white px-4 py-3 rounded-lg text-xl font-semibold leading-tight block">
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
                    <BiHealth className="text-xl" /> Crohn
                </li>
            </ul>
        </div>

        {/* right column */}
        <div className="flex-1 flex flex-col gap-4 pl-4 border-l-2 border-primary-accent">
            <div className="flex flex-col gap-1 text-primary-accent">
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
                        className="bg-secondary rounded-lg p-4 flex items-center justify-center hover:bg-primary-accent/80 transition"
                    >
                        <Icon className="text-white text-3xl" />
                    </button>
                ))}
            </div>
        </div>
    </div>
);
