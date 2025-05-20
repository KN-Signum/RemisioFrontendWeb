import { apiClient } from "@/lib/api-client";
import Cookies from "universal-cookie";

const cookies = new Cookies();

type LoginResponse = {
    id: string;
    email: string;
    role: string;
    access_token: string;
    refresh_token: string;
};

export const loginUser = async (
    credentials: { email: string; password: string }
): Promise<LoginResponse> => {
    try {
        const response = await apiClient.post<LoginResponse>("/login/", credentials);

        cookies.set("access_token", response.data.access_token, { path: "/" });
        cookies.set("refresh_token", response.data.refresh_token, { path: "/" });

        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Login failed");
    }
};
