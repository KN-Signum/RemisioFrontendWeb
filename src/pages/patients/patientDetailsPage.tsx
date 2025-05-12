import { useParams } from "react-router-dom";
import { mockPatients } from "@/assets/mock_data/patients";
import Layout from "@/components/layout";
import { BiPhone } from "react-icons/bi";
import { cn } from "@/lib/utils";

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

    const borderClasses = "flex w-full border-2 border-white/50 rounded-sm py-2";

    return (
        <Layout>
            <div className="flex w-full flex-col gap-1 overflow-y-visible" style={{ height: "100vh" }}>
                <div className={cn(borderClasses, "h-[40vh] gap-3 px-1.5")}>

                    <div className="bg-white w-[35%] p-4 rounded-sm shadow-md flex gap-3 overflow-y-auto">
                        <div className="bg-primary-accent text-white px-4 py-2 rounded-lg text-sm flex items-top justify-center min-w-[100px]">
                            {patient.name}
                        </div>

                        <div className="flex-1 flex flex-col gap-2">
                            <div className="flex items-center">
                                <BiPhone className="text-primary-accent" />
                                <span className="text-primary-accent font-semibold text-lg">{patient.phone_number}</span>
                            </div>

                            <div className="border-l-2 border-primary-accent pl-3 flex flex-col gap-1 text-sm text-primary-accent">
                                <p>Hospital: {patient.hospital}</p>
                                <p>Score: {patient.score}%</p>
                                <p>Age: {patient.age} years</p>
                                <p>Weight: {patient.weight} kg</p>
                                <p>Height: {patient.height} cm</p>
                                <p>Diagnosis: Crohn's Disease</p>
                                <p>Smoking Status: Non-smoker</p>
                                <p>Last Visit: 2025-05-10</p>
                                <p>Next Appointment: 2025-06-15</p>
                                <p>Allergies: None reported</p>
                                <p>Medications: Prednisone, Azathioprine</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white w-[65%] p-4 rounded-sm shadow-md overflow-y-auto">
                        <h2 className="text-lg font-bold text-primary mb-2">Testy diagnostyczne</h2>
                        <div className="grid grid-cols-3 gap-2">
                            {Array(12).fill(0).map((_, index) => (
                                <div
                                    key={index}
                                    className="bg-primary-accent/10 p-2 rounded-md shadow-sm flex justify-between"
                                >
                                    <span className="text-gray-700 text-xs">Test {index + 1}</span>
                                    <span className="font-semibold text-primary-accent text-xs">
                                        {Math.random().toFixed(2)} mg/dL
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={cn(borderClasses, "h-[50.5vh] px-1.5")}>
                    <div className="bg-white w-full p-4 rounded-sm shadow-md">
                        <h2 className="text-lg font-bold text-primary mb-2">Oś czasu pacjenta</h2>
                        <div className="flex flex-col gap-2 overflow-y-auto">
                            {Array(4).fill(0).map((_, index) => (
                                <div key={index} className="flex items-center gap-4">
                                    <span className="text-sm text-primary-accent w-[100px]">2025-05-0{index + 1}</span>
                                    <div className="bg-primary-accent/10 p-2 rounded-md flex-1">
                                        Event {index + 1}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default PatientDetailsPage;
