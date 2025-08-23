import {  enqueueSnackbar } from "notistack";
import { create } from "zustand";
import axios from "axios";
import { baseAxios } from "@/network/base_urls";
interface ISelectedFile {
  rotate?: number[]; // Per-page rotations for this file
  fileName: string;
  file: File;
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
  loadingState: "idle" | "loading" | "success" | "error";
  progress: number;
  setProgress: (newProgress: number) => void;
  selectedFiles: ISelectedFile[];
  downLoadUrl: string[] | null;
  downLoadId: string[] | null;
  setLoadingState: (
    newLoadingState: "idle" | "loading" | "success" | "error"
  ) => void;
  selectedIndex: number;
  sideMenuOpen: boolean;
  pdfPages: PageItem[];
  resetStore: () => void;
  setItems?: (pageIndex: number, pages: PageItem[]) => void;
  downloadFile?: (downloadUrl: string) => Promise<string>;
  rotateIndividualPage: (fileIndex: number, pageIndex: number) => void;
  initRotate: (fileIndex: number, pageLength: number) => void;
  setRotateRight: (fileIndex: number, pageLength: number) => void;
  setRotateLeft: (fileIndex: number, pageLength: number) => void;
  resetRotate: (fileIndex: number) => void;
  removeSelectedFiles: (fileName: string) => void;
  setNumPages: (fileIndex: number, page: number) => void;
  setSelectedFile: (newSelectedFile: ISelectedFile) => void;
  toggleSideMenuOpen: () => void;
  convertPdfToWord: (pdfFile: File) => Promise<string>;
}

const useToolsStore = create<ToolsStore>((set) => ({
  selectedFiles: [], // Initialize as empty to avoid default object issues
  sideMenuOpen: false,
  pdfPages: [],
  resetStore: () =>
    set({
      selectedFiles: [],
      sideMenuOpen: false,
      selectedIndex: 0,
      pdfPages: [],
    }),
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
  loadingState: "idle",
  progress: 0,
  downLoadUrl: null,
  downLoadId: null,
  setLoadingState: (
    newLoadingState: "idle" | "loading" | "success" | "error"
  ) => set(() => ({ loadingState: newLoadingState })),
  setProgress: (newProgress: number) => set(() => ({ progress: newProgress })),
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
      if (fileIndex >= 0 && fileIndex <= newSelectedFiles.length) {
        newSelectedFiles[fileIndex] = {
          ...newSelectedFiles[fileIndex],
          rotate: Array.from(
            { length: 5 },
            (_, pageIndex) =>
              ((newSelectedFiles[fileIndex].rotate?.[pageIndex] ?? 0) + 90) %
              360
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
      if (fileIndex >= 0 && fileIndex <= newSelectedFiles.length) {
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

        if (pageIndex >= 0 && pageIndex <= currentRotations.length) {
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
      if (fileIndex >= 0 && fileIndex <= newSelectedFiles.length) {
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
  downloadFile: async (downloadUrl: string) => {
    try {
      const res = await baseAxios.get("/tools/download/" + downloadUrl, {
        responseType: "blob",
      });
      // const res = await axios.get(
      //   "http://localhost:5000/api/v1/tools/download/" + downloadUrl,
      //   {
      //     responseType: "blob", // Important: get the response as a Blob
      //   }
      // );

      // Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([res.data]));

      // Create a temporary link element
      const link = document.createElement("a");
      link.href =  url;
      // Set the download attribute with a file name
      // You should get the correct file extension from your API response
      link.setAttribute("download", "converted_file.docx");
      document.body.appendChild(link);

      // Programmatically click the link to trigger the download
      link.click();

      // Clean up the temporary URL and link element
      link.remove();
      window.URL.revokeObjectURL(url);

      return "success";
    } catch (error) {
      // alert("Failed to download file");
      enqueueSnackbar("failed to download file", {
        variant:"error"
      });
      console.log(error);
      // return "error";
    }
  },
  convertPdfToWord: async (pdfFile: File) => {
    set({ loadingState: "loading", progress: 0, downLoadUrl: null });
    try {
      const form = new FormData();
      form.append("pdfFile", pdfFile);
      const res = await baseAxios.post("/tools/convert-pdf-to-word",
        form,
        {
          onUploadProgress: (progressEvent) => {
            const total = progressEvent.total || 1; // Avoid division by zero
            const progress = Math.round((progressEvent.loaded * 100) / total);
            set({ progress });
          },
        }
      );
      // const res = await axios.post(
      //   "http://localhost:5000/api/v1/tools/convert-pdf-to-word",
      //   form,
      //   {
      //     onUploadProgress: (progressEvent) => {
      //       const total = progressEvent.total || 1; // Avoid division by zero
      //       const progress = Math.round((progressEvent.loaded * 100) / total);
      //       set({ progress });
      //     },
      //   }
      // );
      set({
        loadingState: "success",
        downLoadUrl: res.data.fileUrl,
        downLoadId: res.data.fileId,
      });
        // window.location.href = res.data;
      return res.data; // Return the response data (download URL or file path)
    } catch (error) {
      console.error("Error converting PDF to Word:", error);
      set({ loadingState: "error" });
         enqueueSnackbar("failed to convert pdf to word", {
           variant: "error",
         });
      return "error!!";
    }
  },
}));

export default useToolsStore;
