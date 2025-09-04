import { create } from "zustand";

interface MeasurementsStore {
  measurements: Measurement[];
  sessionMeasurements: Record<string, Measurement[]>;
  latestMeasurements: Record<string, Measurement>;
  isLoading: boolean;
  error: string | null;

  // Actions
  setMeasurements: (measurements: Measurement[]) => void;
  setSessionMeasurements: (
    sessionId: string,
    measurements: Measurement[]
  ) => void;
  addMeasurement: (measurement: Measurement) => void;
  updateLatestMeasurement: (
    sessionId: string,
    measurement: Measurement
  ) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;

  // Computed getters
  getSessionMeasurements: (sessionId: string) => Measurement[];
  getLatestMeasurement: (sessionId: string) => Measurement | null;
  getMeasurementStats: (sessionId: string) => {
    avgTemperature: number;
    avgHumidity: number;
    fanOnTime: number;
    totalReadings: number;
  } | null;
}

export const useMeasurementsStore = create<MeasurementsStore>((set, get) => ({
  measurements: [],
  sessionMeasurements: {},
  latestMeasurements: {},
  isLoading: false,
  error: null,

  setMeasurements: (measurements) => set({ measurements, error: null }),

  setSessionMeasurements: (sessionId, measurements) => {
    set((state) => ({
      sessionMeasurements: {
        ...state.sessionMeasurements,
        [sessionId]: measurements,
      },
      error: null,
    }));
  },

  addMeasurement: (measurement) => {
    set((state) => ({
      measurements: [...state.measurements, measurement],
      sessionMeasurements: {
        ...state.sessionMeasurements,
        [measurement.sessionId]: [
          ...(state.sessionMeasurements[measurement.sessionId] || []),
          measurement,
        ],
      },
      latestMeasurements: {
        ...state.latestMeasurements,
        [measurement.sessionId]: measurement,
      },
      error: null,
    }));
  },

  updateLatestMeasurement: (sessionId, measurement) => {
    set((state) => ({
      latestMeasurements: {
        ...state.latestMeasurements,
        [sessionId]: measurement,
      },
      error: null,
    }));
  },

  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),

  getSessionMeasurements: (sessionId) =>
    get().sessionMeasurements[sessionId] || [],

  getLatestMeasurement: (sessionId) =>
    get().latestMeasurements[sessionId] || null,

  getMeasurementStats: (sessionId) => {
    const measurements = get().sessionMeasurements[sessionId];
    if (!measurements || measurements.length === 0) return null;

    const totalReadings = measurements.length;
    const avgTemperature =
      measurements.reduce((sum, m) => sum + m.temperature, 0) / totalReadings;
    const avgHumidity =
      measurements.reduce((sum, m) => sum + m.humidity, 0) / totalReadings;
    const fanOnTime =
      (measurements.filter((m) => m.fan).length / totalReadings) * 100;

    return {
      avgTemperature: Math.round(avgTemperature * 10) / 10,
      avgHumidity: Math.round(avgHumidity * 10) / 10,
      fanOnTime: Math.round(fanOnTime * 10) / 10,
      totalReadings,
    };
  },
}));
