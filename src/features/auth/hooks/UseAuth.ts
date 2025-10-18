import { eventBus } from "@/shared/events/EventBus";
import { useAuthStore } from "../store/AuthStore"
import { useEffect } from "react";


export const useAuth = () =>{
    const setAuth = useAuthStore(state => state.setIsAuthenticated);

    useEffect(()=>{
        const onSucces = eventBus.on('refreshTokenSuccess',() => {
            setAuth(true);
        })
        const onFailure = eventBus.on('refreshTokenFailure',() => {
            setAuth(false);
        })
        return ()=>{
            onSucces();
            onFailure();
        }
    },[setAuth])
    
}