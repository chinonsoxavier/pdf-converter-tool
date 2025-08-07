import { create } from "zustand";

interface ISelectedFile {
  rotate?: number[]; // Per-page rotations for this file
  fileName: string;
  fileUrl: string;
  fileType: string[];
  fileSize: number;
  numPages?: number;
}

interface ToolsStore {
  selectedFiles: ISelectedFile[];
  selectedIndex: number;
  sideMenuOpen: boolean;
  rotateIndividualPage: (fileIndex: number, pageIndex: number) => void;
  initRotate: (fileIndex: number, pageLength: number) => void;
  setRotateRight: (fileIndex: number, pageLength: number) => void;
  setRotateLeft: (fileIndex: number, pageLength: number) => void;
  resetRotate: (fileIndex: number) => void;
  removeSelectedFiles: (fileName: string) => void;
  setNumPages: (fileIndex: number, page: number) => void;
  setSelectedFile: (newSelectedFile: ISelectedFile) => void;
  toggleSideMenuOpen: () => void;
}

const useToolsStore = create<ToolsStore>((set) => ({
  selectedFiles: [], // Initialize as empty to avoid default object issues
  sideMenuOpen: false,
  selectedIndex: 0,
  toggleSideMenuOpen: () =>
    set((state) => ({ sideMenuOpen: !state.sideMenuOpen })),
  setSelectedFile: (newSelectedFile: ISelectedFile) =>
    set((state) => ({
      selectedFiles: [
        ...state.selectedFiles,
        {
          ...newSelectedFile,
          rotate: newSelectedFile.numPages
            ? Array(newSelectedFile.numPages).fill(0)
            : [], // Initialize rotate based on numPages
        },
      ],
    })),
  setRotateRight: (fileIndex: number, pageLength: number) =>
    set((state) => {
      const newSelectedFiles = [...state.selectedFiles];
      if (fileIndex >= 0 && fileIndex < newSelectedFiles.length) {
        newSelectedFiles[fileIndex] = {
          ...newSelectedFiles[fileIndex],
          rotate: Array.from(
            { length: pageLength },
            (_, pageIndex) =>
              ((newSelectedFiles[fileIndex].rotate[pageIndex] || 0) + 90) % 360
          ),
        };
        console.log(
          `Rotate right file ${fileIndex} with ${pageLength} pages:`,
          newSelectedFiles[fileIndex].rotate
        );
      }
      return { selectedFiles: newSelectedFiles };
    }),
  setRotateLeft: (fileIndex: number, pageLength: number) =>
    set((state) => {
      const newSelectedFiles = [...state.selectedFiles];
      if (fileIndex >= 0 && fileIndex < newSelectedFiles.length) {
        newSelectedFiles[fileIndex] = {
          ...newSelectedFiles[fileIndex],
          rotate: Array.from(
            { length: pageLength },
            (_, pageIndex) =>
              ((newSelectedFiles[fileIndex].rotate[pageIndex] || 0) -
                90 +
                360) %
              360
          ),
        };
        console.log(
          `Rotate left file ${fileIndex} with ${pageLength} pages:`,
          newSelectedFiles[fileIndex].rotate
        );
      }
      return { selectedFiles: newSelectedFiles };
    }),
  resetRotate: (fileIndex: number) =>
    set((state) => {
      const newSelectedFiles = [...state.selectedFiles];
      if (fileIndex >= 0 && fileIndex < newSelectedFiles.length) {
        newSelectedFiles[fileIndex] = {
          ...newSelectedFiles[fileIndex],
          rotate: newSelectedFiles[fileIndex].rotate.map(() => 0),
        };
        console.log(
          `Reset rotate for file ${fileIndex}:`,
          newSelectedFiles[fileIndex].rotate
        );
      }
      return { selectedFiles: newSelectedFiles };
    }),
  rotateIndividualPage: (fileIndex: number, pageIndex: number) =>
    set((state) => {
      const newSelectedFiles = [...state.selectedFiles];
      if (
        fileIndex >= 0 &&
        fileIndex < newSelectedFiles.length &&
        pageIndex >= 0 &&
        pageIndex < newSelectedFiles[fileIndex].rotate.length
      ) {
        newSelectedFiles[fileIndex] = {
          ...newSelectedFiles[fileIndex],
          rotate: [
            ...newSelectedFiles[fileIndex].rotate.slice(0, pageIndex),
            (newSelectedFiles[fileIndex].rotate[pageIndex] + 90) % 360,
            ...newSelectedFiles[fileIndex].rotate.slice(pageIndex + 1),
          ],
        };
        console.log(
          `Rotate page ${pageIndex} of file ${fileIndex}:`,
          newSelectedFiles[fileIndex].rotate[pageIndex]
        );
      }
      return { selectedFiles: newSelectedFiles };
    }),
  initRotate: (fileIndex: number, pageLength: number) =>
    set((state) => {
      const newSelectedFiles = [...state.selectedFiles];
      if (fileIndex >= 0 && fileIndex < newSelectedFiles.length) {
        newSelectedFiles[fileIndex] = {
          ...newSelectedFiles[fileIndex],
          rotate: Array(pageLength).fill(0),
          numPages: pageLength, // Update numPages
        };
        console.log(
          `Initialized rotate for file ${fileIndex} with ${pageLength} pages:`,
          newSelectedFiles[fileIndex].rotate
        );
      }
      return { selectedFiles: newSelectedFiles };
    }),
  removeSelectedFiles: (fileName: string) =>
    set((state) => ({
      selectedFiles: state.selectedFiles.filter(
        (file) => file.fileName !== fileName
      ),
    })),
  setNumPages: (fileIndex: number, numPages: number) =>
    set((state) => {
      const newSelectedFiles = [...state.selectedFiles];
      // if (fileIndex >= 0 && fileIndex < newSelectedFiles.length) {
        newSelectedFiles[fileIndex] = {
          ...newSelectedFiles[fileIndex],
         numPages: numPages,
          rotate: Array(numPages).fill(0),
        // };
        // console.log(
        //   `Set numPages for file ${fileIndex} to ${numPages}, rotate:`,
        //   newSelectedFiles[fileIndex].rotate
        // );
      }
      return { selectedFiles: newSelectedFiles };
    }),
}));

export default useToolsStore;
