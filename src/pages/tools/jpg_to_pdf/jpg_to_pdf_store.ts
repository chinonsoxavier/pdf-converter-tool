import { create } from "zustand";


interface JpgToPdfStore {
  margin: string;
  orientation: string;
  size: string;
  setMargin: (margin: "none" | "small" | 'big') => void;
  setOrientation: (orientation: "portrait" | "landscape") => void;
  setSize: (orientation: "default" | "letter" | 'a4') => void;
}

const useJpgToPdfStore = create<JpgToPdfStore>((set) => ({
  margin: "none",
  orientation: "portrait",
  size: "default",
  setMargin: (margin) => set({margin}),
  setOrientation: (orientation) => set({ orientation }),
  setSize: (size) => set(() => ({ size })),
}));

export default useJpgToPdfStore;