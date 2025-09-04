import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  signOut: () => void;
  checkAuth: () => boolean;
  checkAdmin: () => boolean;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isAdmin: false,
      isLoading: false,

      setUser: (user) => {
        const token = user?.token || get().token;
        set({
          user,
          isAuthenticated: !!user,
          isAdmin: user?.role === "admin",
          token: user?.token || token,
        });
      },

      setToken: (token) => set({ token }),

      signOut: () => {
        // Clear localStorage items
        localStorage.removeItem("auth-token");
        localStorage.removeItem("user-data");

        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isAdmin: false,
        });
      },

      checkAuth: () => {
        const state = get();
        const token = state.token || localStorage.getItem("auth-token");
        return !!(state.user && token);
      },

      checkAdmin: () => {
        const state = get();
        return state.checkAuth() && state.user?.role === "admin";
      },

      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        isAdmin: state.isAdmin,
      }),
    }
  )
);
