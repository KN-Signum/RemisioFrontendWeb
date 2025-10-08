import { ApiClient } from "@/shared/api/ApiClient";
import { logout } from "../api/logout";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/updatedLogin";
import { UseLoginOptions, UseLogoutOptions } from "../types";

export const useAuth = () => {
    const api = ApiClient.getInstance();

    const useLogin = ({ onSuccess, onError }: UseLoginOptions = {}) =>
        useMutation({
        mutationFn: login,
        onSuccess: ({ data }) => {
          ApiClient.getInstance().setAccessToken(data.access_token);
          onSuccess?.(data);
        },
        onError: (error) => {
          ApiClient.getInstance().removeAccessToken();
          onError?.(error);
        },
    });
    const useLogout = ({ onSuccess, onError }: UseLogoutOptions = {}) =>
        useMutation({
          mutationFn: logout,
          onSuccess: ({ data }) => {
            ApiClient.getInstance().removeAccessToken();
            onSuccess?.(data);
          },
          onError: (error) => {
            ApiClient.getInstance().removeAccessToken();
            onError?.(error);
          },
    });

    return {
        isAuthenticated: api.isAuthenticated(),

        useLogin,
        useLogout
    };
};

