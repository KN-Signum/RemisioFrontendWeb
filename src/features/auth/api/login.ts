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
    console.log("[loginUser] sending →", credentials.email);

    try {
        const data = await apiClient.post<LoginResponse>("/login/", credentials);

        console.log("[loginUser] data →", data);
        console.log("[loginUser] access_token →", data.data.access_token);

        const { access_token, refresh_token } = data.data;

        if (!access_token || !refresh_token) {
            console.warn("[loginUser] missing tokens →", data);
            throw new Error("Back-end nie zwrócił tokenów");
        }

        cookies.set("access_token", access_token, { path: "/", sameSite: "lax" });
        cookies.set("refresh_token", refresh_token, { path: "/", sameSite: "lax" });

        return data.data;
    } catch (error: any) {
        console.error("[loginUser] error →", error);
        throw new Error(error?.message || "Login failed");
    }
};

