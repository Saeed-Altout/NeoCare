import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { toast } from "sonner";

interface PatientsStore {
  patients: Patient[];
  selectedPatient: Patient | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setPatients: (patients: Patient[]) => void;
  addPatient: (patient: Patient) => void;
  updatePatient: (id: string, updates: Partial<Patient>) => void;
  removePatient: (id: string) => void;
  selectPatient: (patient: Patient | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const usePatientsStore = create<PatientsStore>()(
  persist(
    (set) => ({
      patients: [],
      selectedPatient: null,
      isLoading: false,
      error: null,

      setPatients: (patients) => set({ patients, error: null }),

      addPatient: (patient) => {
        set((state) => ({
          patients: [...state.patients, patient],
          error: null,
        }));
        toast.success("Patient added successfully");
      },

      updatePatient: (id, updates) => {
        set((state) => ({
          patients: state.patients.map((patient) =>
            patient.id === id ? { ...patient, ...updates } : patient
          ),
          selectedPatient:
            state.selectedPatient?.id === id
              ? { ...state.selectedPatient, ...updates }
              : state.selectedPatient,
          error: null,
        }));
        toast.success("Patient updated successfully");
      },

      removePatient: (id) => {
        set((state) => ({
          patients: state.patients.filter((patient) => patient.id !== id),
          selectedPatient:
            state.selectedPatient?.id === id ? null : state.selectedPatient,
          error: null,
        }));
        toast.success("Patient removed successfully");
      },

      selectPatient: (patient) => set({ selectedPatient: patient }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),
    }),
    {
      name: "patients-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        patients: state.patients,
        selectedPatient: state.selectedPatient,
      }),
    }
  )
);
