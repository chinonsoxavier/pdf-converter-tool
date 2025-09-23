// import { IPagesToExtract } from "@/types/export";
import { create } from "zustand";

interface Item {
  number: number;
  selected: boolean;
}

interface ExtractPdfStore {
  extractMode: "all" | "selected";
  pagesToExtract: Item[];
  setExtractMode: (mode: "all" | "selected") => void;
  setPagesToExtract: (pages: Item[]) => void;
  togglePageSelection: (number: number) => void;
  updatePagesFromInput: (value: string, maxPages: number) => void;
  resetPagesToExtract: () => void;
  extractAllPages: () => void;
}

const useExtractPdfStore = create<ExtractPdfStore>((set) => ({
  extractMode: "all",
  pagesToExtract: [], // Initialize as empty; will be populated dynamically
  setExtractMode: (mode: "all" | "selected") =>
    set(() => ({ extractMode: mode })),
  setPagesToExtract: (pages: Item[]) => set(() => ({ pagesToExtract: pages })),
  togglePageSelection: (number: number) =>
    set((state) => {
      const newPages = state.pagesToExtract.map((item) =>
        item.number === number ? { ...item, selected: !item.selected } : item
      );
      return { pagesToExtract: newPages };
    }),
  extractAllPages: () =>
    set((state) => ({
      pagesToExtract: state.pagesToExtract.map((item) => ({
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
          pagesToExtract: state.pagesToExtract.map((item) => ({
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
        pagesToExtract: state.pagesToExtract.map((item) => ({
          ...item,
          selected: selectedNumbers.has(item.number),
        })),
      };
    }),
  resetPagesToExtract: () =>
    set((state) => ({
      pagesToExtract: state.pagesToExtract.map((item) => ({
        ...item,
        selected: true,
      })),
    })),
}));

export default useExtractPdfStore;
