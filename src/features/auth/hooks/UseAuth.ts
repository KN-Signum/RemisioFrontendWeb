import { ApiClient } from "@/shared/api/ApiClient"
import { useAuthStore } from "../store/AuthStore"
import { useEffect } from "react";

export const useAuth = () =>{
    const setAuth = useAuthStore(state => state.setIsAuthenticated);

    useEffect(() =>{
        const api = ApiClient.getInstance()
        api.setOnAuthFailure(() =>{
            setAuth(false);
        })

        setAuth(api.isAuthenticated())
    }, [setAuth])
}