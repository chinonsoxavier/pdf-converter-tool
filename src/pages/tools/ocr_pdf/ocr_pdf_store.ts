import { create } from "zustand";

interface Option {
  id: string;
  label: string;
  value: string;
}

interface OCRPdfStore {
  selectedLanguages: Option[];
  setselectedLanguages: (newLanguage: Option[]) => void;

}

const useOCRPdfStore = create<OCRPdfStore>((set) => ({
  selectedLanguages: [],
  setselectedLanguages: (newLanguage: Option[]) =>
    set((state) => ({
      selectedLanguages: [...state.selectedLanguages,... newLanguage],
    })),
}));

export default useOCRPdfStore;
