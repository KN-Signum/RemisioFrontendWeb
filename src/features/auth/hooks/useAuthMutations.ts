import { ApiClient } from "@/shared/api/ApiClient";
import { logout } from "../api/logout";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/updatedLogin";
import { LoginRequestDto, UseLoginOptions, UseLogoutOptions } from "../types/types";
import { useAuthStore } from "../store/AuthStore";

export const useAuthMutations = () => {
    const api = ApiClient.getInstance();
    const setAuth = useAuthStore(state => state.setIsAuthenticated);

    const useLogin = ({ onSuccess, onError }: UseLoginOptions = {}) =>
        useMutation({
        mutationFn: (credentials: LoginRequestDto) => login(credentials),
        onSuccess: ({ data }) => {
          api.setAccessToken(data.access_token);
          setAuth(true);
          onSuccess?.(data);
        },
        onError: (error) => {
          api.removeAccessToken();
          setAuth(false);
          onError?.(error);
        },
    });
    const useLogout = ({ onSuccess, onError }: UseLogoutOptions = {}) =>
        useMutation({
          mutationFn: logout,
          onSuccess: ({ data }) => {
            api.removeAccessToken();
            setAuth(false);
            onSuccess?.(data);
          },
          onError: (error) => {
            api.removeAccessToken();
            setAuth(false);
            onError?.(error);
          },
    });

    return {
        useLogin,
        useLogout
    };
};

