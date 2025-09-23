// import { IPagesToExtract } from "@/types/export";
import { create } from "zustand";

interface Item {
  number: number;
  selected: boolean;
}

interface DeletePdfStore {
  deleteMode: "all" | "selected";
  pagesToDelete: Item[];
  setDeleteMode: (mode: "all" | "selected") => void;
  setPagesToDelete: (pages: Item[]) => void;
  togglePageDeleteSelection: (number: number) => void;
  updatePagesFromInput: (value: string, maxPages: number) => void;
  deleteAllPages: () => void;
}

const useDeletePdfStore = create<DeletePdfStore>((set) => ({
  deleteMode: "all",
  pagesToDelete: [], // Initialize as empty; will be populated dynamically
  setDeleteMode: (mode: "all" | "selected") =>
    set(() => ({ deleteMode: mode })),
  setPagesToDelete: (pages: Item[]) => set(() => ({ pagesToDelete: pages })),
  togglePageDeleteSelection: (number: number) =>
    set((state) => {
      const newPages = state.pagesToDelete.map((item) =>
        item.number === number ? { ...item, selected: !item.selected } : item
      );
      return { pagesToDelete: newPages };
    }),
  deleteAllPages: () =>
    set((state) => ({
      pagesToDelete: state.pagesToDelete.map((item) => ({
        ...item,
        selected: true,
      })),
    })),

  updatePagesFromInput: (value: string, maxPages: number) =>
    set((state) => {
      const selectedNumbers = new Set<number>();
      if (!value.trim()) {
        // Clear selections if input is empty
        return {
          pagesToDelete: state.pagesToDelete.map((item) => ({
            ...item,
            selected: false,
          })),
        };
      }

      // Parse input (e.g., "1-5,7,10-12")
      const parts = value.split(",").map((part) => part.trim());
      parts.forEach((part) => {
        if (part.includes("-")) {
          // Handle range (e.g., "1-5")
          const [start, end] = part
            .split("-")
            .map((num) => Number.parseInt(num.trim()));
          if (!isNaN(start) && !isNaN(end)) {
            for (let i = Math.min(start, end); i <= Math.max(start, end); i++) {
              if (i >= 1 && i <= maxPages) {
                selectedNumbers.add(i);
              }
            }
          }
        } else {
          // Handle individual number
          const num = Number.parseInt(part);
          if (!isNaN(num) && num >= 1 && num <= maxPages) {
            selectedNumbers.add(num);
          }
        }
      });

      // Update pages based on selected numbers
      return {
        pagesToDelete: state.pagesToDelete.map((item) => ({
          ...item,
          selected: selectedNumbers.has(item.number),
        })),
      };
    }),
}));

export default useDeletePdfStore;
