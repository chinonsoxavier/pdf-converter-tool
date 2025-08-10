import { create } from "zustand";

interface ISelectedFile {
  rotate?: number[]; // Per-page rotations for this file
  fileName: string;
  fileUrl: string;
  fileType: string[];
  fileSize: number;
  numPages?: number;
  pdfPages?: PageItem[];
}

// Define the structure of a PDF page item
interface PageItem {
  id: string | number; // Unique identifier for the page
  pageNumber: number; // Page number for react-pdf
  rotate: number[]; // Rotation for the page (synchronized with ISelectedFile.rotate)
}

// interface DraggedItem {
//   item: PageItem;
//   index: number;
// }

interface ToolsStore {
  selectedFiles: ISelectedFile[];
  selectedIndex: number;
  sideMenuOpen: boolean;
  setItems?: (pageIndex: number, pages: PageItem[]) => void;
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
  pdfPages: [],
  // setItems: (pageIndex: number, newPdfPages: PageItem[]) =>
  //   set((state) => {
  //     const PdfPages = [...state.selectedFiles];
  //     PdfPages[pageIndex] = {
  //       ...PdfPages[pageIndex],
  //       pdfPages: newPdfPages,
  //     };
  //     return { selectedFiles: PdfPages };
  //   }),

  // setItems: (pageIndex:number,newItems: PageItem[]) => {
  //   useToolsStore.setState((state) => {
  //     const newSelectedFiles = [...state.selectedFiles];
  //     // if (selectedIndex >= 0 && selectedIndex < newSelectedFiles.length) {
  //       // Update rotate array to match new page order
  //       const newRotate = newItems.map((item) => item.rotate);
  //       newselectedFiles[selectedIndex]? = {
  //         ...newselectedFiles[selectedIndex]?,
  //         rotate: newRotate,
  //       // };
  //     }
  //     return { selectedFiles: newSelectedFiles };
  //   });
  // };
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
              ((newSelectedFiles[fileIndex].rotate?.[pageIndex] ?? 0) + 90) % 360
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
              ((newSelectedFiles[fileIndex]?.rotate?.[pageIndex] ?? 0) -
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
        const file = newSelectedFiles[fileIndex];
        // Ensure 'rotate' array exists before attempting to map over it
        if (file?.rotate) {
          newSelectedFiles[fileIndex] = {
            ...file,
            rotate: file.rotate.map(() => 0),
          };
          console.log(
            `Reset rotate for file ${fileIndex}:`,
            newSelectedFiles[fileIndex].rotate
          );
        } else {
          console.warn(
            `Rotate array not found for file ${fileIndex}. Cannot reset.`
          );
        }
      }
      return { selectedFiles: newSelectedFiles };
    }),
  // resetRotate: (fileIndex: number) =>
  //   set((state) => {
  //     const newSelectedFiles = [...state.selectedFiles];
  //     if (fileIndex >= 0 && fileIndex < newSelectedFiles.length) {
  //       newSelectedFiles[fileIndex] = {
  //         ...newSelectedFiles[fileIndex],
  //         rotate: newSelectedFiles[fileIndex].rotate.map(() => 0),
  //       };
  //       console.log(
  //         `Reset rotate for file ${fileIndex}:`,
  //         newSelectedFiles[fileIndex].rotate
  //       );
  //     }
  //     return { selectedFiles: newSelectedFiles };
  //   }),
  // rotateIndividualPage: (fileIndex: number, pageIndex: number) =>
  //   set((state) => {
  //     const newSelectedFiles:ISelectedFile[]  =  [...state.selectedFiles];
  //     if (
  //       fileIndex >= 0 &&
  //       fileIndex < newSelectedFiles.length &&
  //       pageIndex >= 0 &&
  //       pageIndex < newSelectedFiles[fileIndex].rotate.length
  //     ) {
  //       newSelectedFiles[fileIndex] = {
  //         ...newSelectedFiles[fileIndex],
  //         rotate: [
  //           ...newSelectedFiles[fileIndex].rotate.slice(0, pageIndex),
  //           ((newSelectedFiles[fileIndex].rotate[pageIndex] ?? 0) + 90) % 360,
  //           ...newSelectedFiles[fileIndex].rotate.slice(pageIndex + 1) ?? 0,
  //         ],
  //       };
  //       console.log(
  //         `Rotate page ${pageIndex} of file ${fileIndex}:`,
  //         newSelectedFiles[fileIndex].rotate?.[pageIndex]
  //       );
  //     }
  //     return { selectedFiles: newSelectedFiles };
  //   }),
  rotateIndividualPage: (fileIndex: number, pageIndex: number) =>
    set((state) => {
      const newSelectedFiles: ISelectedFile[] = [...state.selectedFiles];
      const file = newSelectedFiles[fileIndex]; // Get the file once

      // Add a check to ensure 'file' and 'file.rotate' exist
      if (file && file.rotate !== undefined && file.rotate !== null) {
        const currentRotations = file.rotate;

        if (pageIndex >= 0 && pageIndex < currentRotations.length) {
          // Calculate the new rotation for the specific page
          const newRotationValue =
            ((currentRotations[pageIndex] ?? 0) + 90) % 360;

          newSelectedFiles[fileIndex] = {
            ...file,
            rotate: [
              ...currentRotations.slice(0, pageIndex), // Elements before the target page
              newRotationValue, // The new rotation for the target page
              ...currentRotations.slice(pageIndex + 1), // Elements after the target page
            ],
          };
          console.log(
            `Rotate page ${pageIndex} of file ${fileIndex}:`,
            newSelectedFiles[fileIndex].rotate?.[pageIndex]
          );
        } else {
          console.warn(
            `Page index ${pageIndex} out of bounds for file ${fileIndex}.`
          );
        }
      } else {
        console.warn(
          `File ${fileIndex} or its rotate array is undefined/null. Cannot rotate individual page.`
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
  removeSelectedFiles: (fileUrl: string) =>
    set((state) => ({
      selectedFiles: state.selectedFiles.filter(
        (file) => file.fileUrl !== fileUrl
      ),
    })),
  setNumPages: (fileIndex: number, numPages: number) =>
    set((state) => {
      const newSelectedFiles = [...state.selectedFiles];
      // if (fileIndex >= 0 && fileIndex < newSelectedFiles.length) {
      newSelectedFiles[fileIndex] = {
        ...newSelectedFiles[fileIndex],
        numPages: numPages,
        pdfPages: Array.from({ length: numPages }, (_, i) => ({
          id: `page-${i + 1}`,
          pageNumber: i + 1,
          rotate: Array(numPages).fill(0),
        })),
        rotate: Array(numPages).fill(0),
        // };
        // console.log(
        //   `Set numPages for file ${fileIndex} to ${numPages}, rotate:`,
        //   newSelectedFiles[fileIndex].rotate
        // );
      };
      return { selectedFiles: newSelectedFiles };
    }),
  setItems: (pageIndex: number, newItems: PageItem[]) =>
    set((state) => {
      const newSelectedFiles = [...state.selectedFiles];
      const fileIndex = state.selectedIndex;
      if (fileIndex >= 0 && fileIndex < newSelectedFiles.length) {
        newSelectedFiles[fileIndex] = {
          ...newSelectedFiles[fileIndex],
          pdfPages: newItems,
          // rotate: newItems.map((item) => item.rotate),
        };
      }
      return {
        selectedFiles: newSelectedFiles,
        // items: newItems,
      };
    }),
}));

export default useToolsStore;
