import { create } from "zustand";


interface ToolsStore {
  sideMenuOpen: boolean;
  selectedFiles: string[];
  fileType: string[];
  fileNames: string[];
  numPages: number[];
  selectedRange: string;
  fileSize: number[];
  setNumPages: (arg0: number) => void;
  setFileSize: (arg0: number) => void;
  setFileName: (arg0: string) => void;
  setSelectedFiles: (arg0: string) => void;
  removeSelectedFiles: (arg0: string) => void;
  setSelectedFile: (arg0: string) => void;
  toggleSideMenuOpen: () => void;
}

const useToolsStore = create<ToolsStore>((set) => ({
  sideMenuOpen: false,
  selectedFiles: [],
  Ranges: [],
  selectedRange: "custom",
  fileNames: [""],
  fileSize: [],
  numPages: [],
  fileType: ["pdf"],
  splitMethod: "",
  toggleSideMenuOpen: () =>
    set((state) => ({ sideMenuOpen: !state.sideMenuOpen })),
  setSelectedFile: (newSelectedFile: string) =>
    set((state) => ({
      selectedFiles: [...state.selectedFiles, newSelectedFile],
    })),
  recorderFiles: (newOrder: string[]) =>
    set(() => ({ selectedFiles: newOrder })),
  setSelectedFiles: (newFile: string) =>
    set((state) => ({ selectedFiles: [...state.selectedFiles, newFile] })),
  setFileSize: (newFileSize: number) =>
    set((state) => ({ fileSize: [...state.fileSize, newFileSize] })),
  setNumPages: (newNumPages: number) =>
    set((state) => ({ numPages: [...state.numPages, newNumPages] })),
  setFileName: (newFileName: string) =>
    set((state) => ({ fileNames: [...state.fileNames, newFileName] })),
  removeSelectedFiles: (fileToRemove: string) =>
    set((state) => ({
      selectedFiles: state.selectedFiles.filter(
        (file) => file !== fileToRemove
      ),
    })),
}));

export default useToolsStore;