import { create } from "zustand";

interface MergePdfStore {
  selectedFiles: string[];
  fileType: string[];
  setNumPages: (arg0: number) => void;
  fileNames: string[];
  numPages: number[];
  fileSize: number[];
  setFileSize: (arg0: number) => void;
  setFileName: (arg0: string) => void;
  setSelectedFiles: (arg0: string) => void;
  removeSelectedFiles: (arg0: string) => void;
  recorderFiles: (arg0: string[]) => void;
}

const useMergePdfStore = create<MergePdfStore>((set) => ({
  selectedFiles: [""],
  fileNames: [""],
  fileSize: [],
  numPages: [],
  fileType: ["pdf"],
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

export default useMergePdfStore;
