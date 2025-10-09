import { create } from "zustand";

export const useAuthStore = create<{
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
}>((set) => ({
    isAuthenticated: false,
    setIsAuthenticated: (value: boolean) => set({ isAuthenticated: value }),
}));

