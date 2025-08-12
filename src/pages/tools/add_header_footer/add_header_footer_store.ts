import { create } from "zustand";


interface AddHeaderFooterStore {
  margin: string;
  pagesToApply: number[];
  startFrom: number;
  customText: string;
  customizationStyle:
    | "Page 1,Page 2,Page 3"
    | "Page I,Page II,Page III"
    | "Page 1 of 20,Page 2 of 20,Page 3,Page 20"
    | "Filename on each page"
    | "Custom Text";
  HeaderFooterPosition: number;
  setMargin: (margin: "Small" | "Recommended" | "Big") => void;
  setCustomText: (text:string) => void;
  setCustomizationStyle: (
    style:
      | "Page 1,Page 2,Page 3"
      | "Page I,Page II,Page III"
      | "Page 1 of 20,Page 2 of 20,Page 3,Page 20"
      | "Filename on each page"
      | "Custom Text"
  ) => void;
  setHeaderFooterPosition: (newPosition: number) => void;
  setPagesToApply: (newPosition: number[]) => void;
  setStartFrom: (newPosition: number) => void;
}

const useAddHeaderFooterStore = create<AddHeaderFooterStore>((set) => ({
  margin: "Recommended",
  pagesToApply: [],
    startFrom: 1,
  customText: "",
  customizationStyle: "Page 1,Page 2,Page 3",
  HeaderFooterPosition: 1,
  setMargin: (margin) => set({ margin }),
  setHeaderFooterPosition: (position) =>
    set({ HeaderFooterPosition: position }),
  setCustomizationStyle: (style) => set({ customizationStyle: style }),
  setPagesToApply: (pagesToApply: number[]) =>
    set({ pagesToApply: pagesToApply }),
  setStartFrom: (startFrom: number) => set({ startFrom: startFrom }),
  setCustomText: (text: string) => set({ customText: text }),
}));

export default useAddHeaderFooterStore;