import { create } from "zustand";

interface Item {
  number: number;
}
interface JpgToPdfStore {
  margin: string;
  fontSize: string;
  fontColor: string;
  pagesToNumber: Item[];
  startPosition: number;
  setStartPosition: (position: number) => void;
  setFontSize: (size: string) => void;
  setFontColor: (color: string) => void;
  setpagesToNumber: (pagesToNumber: Item[]) => void;
  updatePagesFromInput: (value: string, maxPages: number) => void;

  numberPosition:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";

  setMargin: (margin: "Small" | "Recommended" | "Big") => void;
  setNumberPosition: (
    newPosition:
      | "top-left"
      | "top-center"
      | "top-right"
      | "bottom-left"
      | "bottom-center"
      | "bottom-right"
  ) => void;
}

const useAddPdfPageNumberStore = create<JpgToPdfStore>((set) => ({
  margin: "Recommended",
  fontSize: "12",
  fontColor: "#000000",
  numberPosition: "top-center",
  startPosition: 1,
  setFontColor: (color: string) => set({ fontColor: color }),
  setFontSize: (size: string) => set({ fontSize: size }),
  setStartPosition: (position: number) => set({ startPosition: position }),
  pagesToNumber: [],
  setpagesToNumber: (pages: Item[]) => set(() => ({ pagesToNumber: pages })),

  setMargin: (margin) => set({ margin }),
  setNumberPosition: (
    orientation:
      | "top-left"
      | "top-center"
      | "top-right"
      | "bottom-left"
      | "bottom-center"
      | "bottom-right"
  ) => set({ numberPosition: orientation }),
  updatePagesFromInput: (value: string, maxPages: number) =>
    set((state) => {
      const selectedNumbers = new Set<number>();
      if (!value.trim()) {
        // Clear selections if input is empty
        return {
          pagesToNumber: state.pagesToNumber.map((item) => ({
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
        pagesToDelete: state.pagesToNumber.map((item) => ({
          ...item,
          selected: selectedNumbers.has(item.number),
        })),
      };
    }),
}));

export default useAddPdfPageNumberStore;