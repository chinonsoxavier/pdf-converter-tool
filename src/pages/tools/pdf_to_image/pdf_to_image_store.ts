import { create } from "zustand";

interface Item {
  number: number;
  selected: boolean;
}

interface PdfToImageStore {
  orientation: string;
  convertAllPages: boolean;
  pagesToConvert: Item[];
  setOrientation: (orientation: "portrait" | "landscape") => void;
  setPagesToConvert: (convertAllPages: string, maxPages: number) => void;
  setConvertAllPages: (value:true | false) => void;
}

const usePdfToImageStore = create<PdfToImageStore>((set) => ({
  orientation: "portrait",
  convertAllPages: false,
  pagesToConvert: [],
  setOrientation: (orientation) => set({ orientation }),
  setConvertAllPages: (convertAllPages) => set({ convertAllPages }),
  setPagesToConvert: (value: string, maxPages: number) =>
    set((state) => {
      const selectedNumbers = new Set<number>();
      if (!value.trim()) {
        // Clear selections if input is empty
        return {
          pagesToConvert: state.pagesToConvert.map((item) => ({
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
        pagesToConvert: state.pagesToConvert.map((item) => ({
          ...item,
          selected: selectedNumbers.has(item.number),
        })),
      };
    }),
}));

export default usePdfToImageStore;