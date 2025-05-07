import { mockPatients } from "@/assets/mock_data/patients";
import Layout from "@/components/layout";
import { SearchBar } from "@/features/patient/components/searchBar";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { BiWorld } from "react-icons/bi";

const PatientsPage = () => {
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        console.log("Szukaj:", query);
    };

    return (
        <Layout>
            <div className="flex flex-col w-full h-full bg-white rounded-sm shadow-2xl overflow-hidden p-8">
                <div className="mb-6 flex justify-center">
                    <SearchBar placeholder="Search patients..." onSearch={handleSearch} />
                </div>

                <div className="flex-1 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
                    {mockPatients.map((patient) => (
                        <div
                            key={patient.email}
                            className="bg-primary-accent/10 border border-gray-300 rounded-lg p-4 flex flex-col gap-2"
                        >
                            <h3 className="text-lg font-semibold text-primary-accent">
                                {patient.name}
                            </h3>
                            <div className="text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                    <span className="material-icons text-primary-accent">location_on</span>
                                    {patient.hospital}
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="material-icons text-primary-accent">medication</span>
                                    Crohn
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="material-icons text-primary-accent">bar_chart</span>
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
