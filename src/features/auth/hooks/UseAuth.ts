import { eventBus } from "@/shared/events/EventBus";
import { useAuthStore } from "../store/AuthStore"


export const useAuth = () =>{
    const setAuth = useAuthStore(state => state.setIsAuthenticated);

    eventBus.on('refreshTokenSuccess',() => {
        setAuth(true);
    })
    eventBus.on('refreshTokenFailure',() => {
        setAuth(false);
    })
    
}