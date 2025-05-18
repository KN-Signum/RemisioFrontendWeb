import { mockPatients } from "@/assets/mock_data/patients";
import Layout from "@/components/layout";
import { SearchBar } from "@/features/patient/components/SearchBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import * as Dialog from "@radix-ui/react-dialog";
import { BiPlus } from "react-icons/bi";
import { NewPatientForm } from "@/features/patient/components/NewPatientForm";

const PatientsPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleSearch = (q: string) => setSearchQuery(q);
    const handlePatientClick = (id: number) => navigate(`/patients/${id}`);

    return (
        <Layout>
            <div className="flex flex-col w-full h-full bg-white rounded-sm shadow-2xl overflow-hidden p-8">

                {/* --- SearchBar + IconButton ------------------------------------ */}
                <div className="mb-6 flex items-center justify-center gap-4">
                    <SearchBar placeholder="Search patients..." onSearch={handleSearch} />

                    <Dialog.Root open={open} onOpenChange={setOpen}>
                        <Dialog.Trigger asChild>
                            <button
                                aria-label="Add patient"
                                className="rounded-full bg-primary-accent p-3 text-white shadow-lg hover:bg-primary-accent/80 transition cursor-pointer"
                            >
                                <BiPlus className="text-2xl" />
                            </button>
                        </Dialog.Trigger>

                        <Dialog.Portal>
                            <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
                            <Dialog.Content
                                className="fixed top-1/2 left-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2
                 rounded-xl bg-white p-6 shadow-xl flex flex-col gap-4"
                            >
                                <Dialog.Title className="text-xl font-bold text-primary">
                                    Nowy pacjent
                                </Dialog.Title>

                                <NewPatientForm
                                    onSubmit={(data) => {
                                        console.log("send to API", data);
                                        setOpen(false);
                                    }}
                                />

                                <Dialog.Close asChild>
                                    <button
                                        aria-label="Close"
                                        className="absolute top-3 right-3 text-2xl text-gray-400 hover:text-primary-accent"
                                    >
                                        &times;
                                    </button>
                                </Dialog.Close>
                            </Dialog.Content>
                        </Dialog.Portal>
                    </Dialog.Root>
                </div>

                <div className="flex-1 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
                    {mockPatients
                        .filter((p) =>
                            p.name.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((patient) => (
                            <div
                                key={patient.id}
                                onClick={() => handlePatientClick(patient.id)}
                                className="bg-primary-accent/10 border border-gray-300 rounded-lg p-4 flex flex-col gap-2 cursor-pointer transition-transform duration-200 hover:shadow-lg hover:scale-105"
                            >
                                <h3 className="text-lg font-semibold text-primary-accent line-clamp-1">
                                    {patient.name}
                                </h3>
                                <div className="text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <span className="material-icons text-primary-accent">
                                            location_on
                                        </span>
                                        {patient.hospital}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="material-icons text-primary-accent">
                                            medication
                                        </span>
                                        Crohn
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="material-icons text-primary-accent">
                                            bar_chart
                                        </span>
                                        {patient.score}%
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </Layout>
    );
};

export default PatientsPage;
