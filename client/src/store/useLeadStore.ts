import { create } from "zustand";
import { mockLeads } from "../utils/mockLeads";
import type { Lead } from "../types/lead";

interface LeadStore {
  leads: Lead[];
  search: string;
  status: string;
  source: string;
  sort: string;

  setSearch: (value: string) => void;
  setStatus: (value: string) => void;
  setSource: (value: string) => void;
  setSort: (value: string) => void;
}

export const useLeadStore = create<LeadStore>((set) => ({
  leads: mockLeads,

  search: "",
  status: "",
  source: "",
  sort: "latest",

  setSearch: (value) => set({ search: value }),
  setStatus: (value) => set({ status: value }),
  setSource: (value) => set({ source: value }),
  setSort: (value) => set({ sort: value }),
}));