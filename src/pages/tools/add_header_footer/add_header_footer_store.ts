import { create } from "zustand";


interface Item {
  number: number;
}

interface AddHeaderFooterStore {
  margin: string;
  fontSize: string;
  fontColor: string;
  position:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";

  pagesToApply: Item[];
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
  setCustomText: (text: string) => void;
  setCustomizationStyle: (
    style:
      | "Page 1,Page 2,Page 3"
      | "Page I,Page II,Page III"
      | "Page 1 of 20,Page 2 of 20,Page 3,Page 20"
      | "Filename on each page"
      | "Custom Text"
  ) => void;
  setHeaderFooterPosition: (newPosition: number) => void;
  setPagesToApply: (newPosition: Item[]) => void;
  setStartFrom: (newPosition: number) => void;
  setFontSize: (size: string) => void;
  setFontColor: (color: string) => void;
}

const useAddHeaderFooterStore = create<AddHeaderFooterStore>((set) => ({
  margin: "Recommended",
  pagesToApply: [],
  fontSize: "12",
  fontColor: "#000000",
  position: "top-center",
  startFrom: 1,
  customText: "",
  customizationStyle: "Page 1,Page 2,Page 3",
  HeaderFooterPosition: 1,
  setFontColor: (color: string) => set({ fontColor: color }),
  setFontSize: (size: string) => set({ fontSize: size }),
  setMargin: (margin) => set({ margin }),
  setHeaderFooterPosition: (position) =>
    set({ HeaderFooterPosition: position }),
  setCustomizationStyle: (style) => set({ customizationStyle: style }),
  setPagesToApply: (pagesToApply: Item[]) =>
    set({ pagesToApply: pagesToApply }),
  setStartFrom: (startFrom: number) => set({ startFrom: startFrom }),
  setCustomText: (text: string) => set({ customText: text }),
}));

export default useAddHeaderFooterStore;