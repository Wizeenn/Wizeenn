"use client";

import { create } from "zustand";

export type DateRange = {
  from: Date | null;
  to: Date | null;
};

type FiltersState = {
  dateRange: DateRange;
  clientId: string | null;
  teamId: string | null;
  setDateRange: (range: DateRange) => void;
  setClientId: (id: string | null) => void;
  setTeamId: (id: string | null) => void;
  reset: () => void;
};

const defaultState = {
  dateRange: { from: null, to: null },
  clientId: null,
  teamId: null,
};

export const useFiltersStore = create<FiltersState>((set) => ({
  ...defaultState,
  setDateRange: (dateRange) => set({ dateRange }),
  setClientId: (clientId) => set({ clientId }),
  setTeamId: (teamId) => set({ teamId }),
  reset: () => set(defaultState),
}));

