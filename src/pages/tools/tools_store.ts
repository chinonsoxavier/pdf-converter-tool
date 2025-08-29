import {  enqueueSnackbar } from "notistack";
import { create } from "zustand";
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


interface IRecentActivities {
  fileName: string;
  fileUrl: string;
  fileSize: string;
  icon: string;
  fileType: string;
}

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
  recentActivities: IRecentActivities[];
  resetStore: () => void;
  setItems?: (pageIndex: number, pages: PageItem[]) => void;
  downloadFile?: (downloadUrl: string) => Promise<string>;
  rotateIndividualPage: (fileIndex: number, pageIndex: number) => void;
  getRecentActivities: () => Promise<[]>;
  reorderSelectedFiles: (newFilesOrder: ISelectedFile[]) => void;
  initRotate: (fileIndex: number, pageLength: number) => void;
  setRotateRight: (fileIndex: number, pageLength: number) => void;
  setRotateLeft: (fileIndex: number, pageLength: number) => void;
  resetRotate: (fileIndex: number) => void;
  removeSelectedFiles: (fileUrl: string) => void;
  setNumPages: (fileIndex: number, page: number) => void;
  setSelectedFile: (newSelectedFile: ISelectedFile) => void;
  toggleSideMenuOpen: () => void;
  convertPdfToWord: (pdfFile: File) => Promise<string>;
  convertWordToPdf: (pdfFile: File) => Promise<string>;
  mergePdfs: (pdfFile: ISelectedFile[]) => Promise<string>;
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
  loadingState: "idle",
  recentActivities: [{
    fileName:'',fileSize:'',fileType:'',fileUrl:'',icon:'',
  }],
  progress: 0,
  downLoadUrl: null,
  downLoadId: null,
  setLoadingState: (
    newLoadingState: "idle" | "loading" | "success" | "error"
  ) => set(() => ({ loadingState: newLoadingState })),
  setProgress: (newProgress: number) => set(() => ({ progress: newProgress })),
  selectedIndex: 0,
    reorderSelectedFiles: (newFilesOrder:ISelectedFile[]) => set({ selectedFiles: newFilesOrder }),
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
      newSelectedFiles[fileIndex] = {
        ...newSelectedFiles[fileIndex],
        numPages: numPages,
        pdfPages: Array.from({ length: numPages }, (_, i) => ({
          id: `page-${i + 1}`,
          pageNumber: i + 1,
          rotate: Array(numPages).fill(0),
        })),
        rotate: Array(numPages).fill(0),
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
        };
      }
      return {
        selectedFiles: newSelectedFiles,
      };
    }),
  downloadFile: async (downloadUrl: string) => {
    try {
      const res = await baseAxios.get("/tools/download/" + downloadUrl, {
        responseType: "blob",
      });
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
  getRecentActivities : async () => {
    try {
      const res = await baseAxios.get("/tools/recent-activities", {withCredentials:true});
      set({ recentActivities: await res.data.recentActivities });
      // await res.data.activities; // Return the response data (download URL or file path)
    } catch (error) {
      console.error("Error fetching recent activities:", error);
        
      return [];
    }
  },
  convertWordToPdf: async (pdfFile: File) => {
    set({ loadingState: "loading", progress: 0, downLoadUrl: null });
    try {
      const form = new FormData();
      form.append("pdfFile", pdfFile);
      const res = await baseAxios.post("/tools/convert-word-to-pdf",
        form,
        {withCredentials:true},
      );
      set({
        loadingState: "success",
        downLoadUrl: res.data.fileUrl,
        downLoadId: res.data.fileId,
      });
        // window.location.href = `download/${await res.data.fileUrl}`;
      return res.data; // Return the response data (download URL or file path)
    } catch (error) {
      console.error("Error converting Word to Pdf:", error);
      set({ loadingState: "error" });
         enqueueSnackbar("failed to convert word to pdf", {
           variant: "error",
         });
      return "error!!";
    }
  },
   convertPdfToWord: async (pdfFile: File) => {
    set({ loadingState: "loading", progress: 0, downLoadUrl: null });
    try {
      const form = new FormData();
      form.append("pdfFile", pdfFile);
      const res = await baseAxios.post("/tools/convert-pdf-to-word",
        form,
        {withCredentials:true},
      );
      set({
        loadingState: "success",
        downLoadUrl: res.data.fileUrl,
        downLoadId: res.data.fileId,
      });
        // window.location.href = `download/${await res.data.fileUrl}`;
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
     mergePdfs: async (pdfFiles: ISelectedFile[]) => {
    set({ loadingState: "loading", progress: 0, downLoadUrl: null });
    try {
      const form = new FormData();
      
  pdfFiles.forEach((file) => {
    // 'files' must match the field name in your Express route's `upload.array('files')`
    form.append("pdfFiles", file.file);
  });      const res = await baseAxios.post("/tools/merge-pdfs",
        form,
        {withCredentials:true},
      );
      set({
        loadingState: "success",
        downLoadId: res.data.fileId,
      });
        // window.location.href = `download/${await res.data.fileUrl}`;
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
