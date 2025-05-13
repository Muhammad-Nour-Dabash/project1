import { create } from "zustand";

type MemoryFormState = {
  isOpen: boolean;
  mode: "create" | "edit";
  selectedId: string | null;
  openForm: (mode: "create" | "edit", id?: string | null) => void;
  closeForm: () => void;
};

export const useMemoryFormStore = create<MemoryFormState>((set) => ({
  isOpen: false,
  mode: "create",
  selectedId: null,
  openForm: (mode, id = null) => set({ isOpen: true, mode, selectedId: id }),
  closeForm: () => set({ isOpen: false, mode: "create", selectedId: null }),
}));
