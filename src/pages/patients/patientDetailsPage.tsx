import Layout from "@/components/layout";
import { useTranslation } from "react-i18next";

const PatientDetailsPage = (

) => {
    const { t } = useTranslation();

    return (
        <Layout>
            <div className="flex flex-col w-full h-full bg-white rounded-sm shadow-2xl overflow-hidden p-8">
                <div className="mb-6 flex justify-center">
                    <h1 className="text-2xl font-bold">{t("patientDetails.title")}</h1>
                </div>

                <div className="flex-1 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
                    {/* Patient details content goes here */}
                </div>
            </div>
        </Layout>
    )
};

export default PatientDetailsPage;