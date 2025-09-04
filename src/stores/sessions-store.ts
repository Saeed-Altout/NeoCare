import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { toast } from "sonner";

interface SessionsStore {
  sessions: Session[];
  activeSessions: Session[];
  selectedSession: Session | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setSessions: (sessions: Session[]) => void;
  addSession: (session: Session) => void;
  updateSession: (id: string, updates: Partial<Session>) => void;
  removeSession: (id: string) => void;
  selectSession: (session: Session | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;

  // Computed getters
  getActiveSessionsCount: () => number;
  getSessionsByPatient: (patientId: string) => Session[];
}

export const useSessionsStore = create<SessionsStore>()(
  persist(
    (set, get) => ({
      sessions: [],
      activeSessions: [],
      selectedSession: null,
      isLoading: false,
      error: null,

      setSessions: (sessions) => {
        const activeSessions = sessions.filter(
          (session) => session.status === "running"
        );
        set({ sessions, activeSessions, error: null });
      },

      addSession: (session) => {
        set((state) => {
          const newSessions = [...state.sessions, session];
          const newActiveSessions =
            session.status === "running"
              ? [...state.activeSessions, session]
              : state.activeSessions;

          return {
            sessions: newSessions,
            activeSessions: newActiveSessions,
            error: null,
          };
        });
        toast.success("Session created successfully");
      },

      updateSession: (id, updates) => {
        set((state) => {
          const updatedSessions = state.sessions.map((session) =>
            session.id === id ? { ...session, ...updates } : session
          );

          const updatedActiveSessions = updatedSessions.filter(
            (session) => session.status === "running"
          );

          return {
            sessions: updatedSessions,
            activeSessions: updatedActiveSessions,
            selectedSession:
              state.selectedSession?.id === id
                ? { ...state.selectedSession, ...updates }
                : state.selectedSession,
            error: null,
          };
        });

        if (updates.status === "stopped") {
          toast.success("Session stopped successfully");
        } else if (updates.status === "completed") {
          toast.success("Session completed successfully");
        }
      },

      removeSession: (id) => {
        set((state) => ({
          sessions: state.sessions.filter((session) => session.id !== id),
          activeSessions: state.activeSessions.filter(
            (session) => session.id !== id
          ),
          selectedSession:
            state.selectedSession?.id === id ? null : state.selectedSession,
          error: null,
        }));
        toast.success("Session removed successfully");
      },

      selectSession: (session) => set({ selectedSession: session }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),

      getActiveSessionsCount: () => get().activeSessions.length,

      getSessionsByPatient: (patientId) =>
        get().sessions.filter((session) => session.patientId === patientId),
    }),
    {
      name: "sessions-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        sessions: state.sessions,
        selectedSession: state.selectedSession,
      }),
    }
  )
);
