import { apiClient } from "@/lib/api-client";

export type CreatePatientPayload = {
    name: string;
    email: string;
    phone_number: string;
    password: string;
    weight: number;
    height: number;
    age: number;
    hospital: string;
};

export type CreatePatientResponse = {
    status: number;
    content: string;
};

export const createPatient = async (
    payload: CreatePatientPayload
): Promise<CreatePatientResponse> => {
    console.log("[createPatient] sending →", payload);

    try {
        const response = await apiClient.post<CreatePatientResponse>(
            "/api/create_patient",
            payload
        );

        if (response.status !== 201) {
            throw new Error(
                `Unexpected HTTP status ${response.status} while creating patient`
            );
        }

        console.log("[createPatient] success ←", response.data);
        return response.data;
    } catch (error: any) {
        const message =
            error.response?.data?.content ||
            error.response?.data?.message ||
            error.message;

        console.error("[createPatient] error ←", message);
        throw new Error(message);
    }
};
