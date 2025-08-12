import { create } from "zustand";


interface JpgToPdfStore {
  margin: string;
  numberPosition: number;
  setMargin: (margin: "Small" | "Recommended" | "Big") => void;
  setNumberPosition: (newPosition:number) => void;
}

const useAddPdfPageNumberStore = create<JpgToPdfStore>((set) => ({
  margin: "Recommended",
  numberPosition: 1,
  setMargin: (margin) => set({ margin }),
  setNumberPosition: (orientation) => set({numberPosition: orientation }),
}));

export default useAddPdfPageNumberStore;