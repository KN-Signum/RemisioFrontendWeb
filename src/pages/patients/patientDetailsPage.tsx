import { useParams } from "react-router-dom";
import { mockPatients } from "@/assets/mock_data/patients";
import Layout from "@/components/layout";
import { BiPhone } from "react-icons/bi";

const PatientDetailsPage = () => {
    const { id } = useParams();
    const patient = mockPatients.find((p) => p.id === parseInt(id || "", 10));

    if (!patient) {
        return (
            <Layout>
                <div className="flex items-center justify-center h-full text-red-500">
                    Patient not found.
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-4 h-full bg-white rounded-l">

                {/* Kafelek z danymi pacjenta */}
                <div className="bg-primary-accent/10 border border-gray-300 rounded-lg p-6 flex flex-col gap-4">
                    <h2 className="text-2xl font-bold text-primary">{patient.name}</h2>

                    <div className="flex items-center gap-2">
                        <BiPhone className="text-primary-accent" size={20} />
                        <span className="text-primary-accent">{patient.phone_number}</span>
                    </div>

                    <div className="border-l-2 border-primary-accent mt-4 pl-4">
                        <div className="text-sm text-gray-600">
                            <p>Hospital: {patient.hospital}</p>
                            <p>Score: {patient.score}%</p>
                            <p>Age: {patient.age} years</p>
                            <p>Weight: {patient.weight} kg</p>
                            <p>Height: {patient.height} cm</p>
                        </div>
                    </div>
                </div>

                {/* Kafelek z testami diagnostycznymi */}
                <div className="bg-primary-accent/10 border border-gray-300 rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-primary">Testy diagnostyczne</h2>
                </div>

                {/* Kafelek poniżej */}
                <div className="bg-primary-accent/10 border border-gray-300 rounded-lg p-6 lg:col-span-2">
                    <h2 className="text-2xl font-bold text-primary">Dodatkowe informacje</h2>
                </div>
            </div>
        </Layout>
    );
};

export default PatientDetailsPage;
