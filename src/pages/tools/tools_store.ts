import { enqueueSnackbar } from "notistack";
import { create } from "zustand";
import { baseAxios } from "@/network/base_urls";
import ExtractPdfStore from "./extract_pdf/extract_pdf_store";
import DeletePdfPages from "./delete_pdf_pages/delete_pdf_pages_store";
import AddPageNumber from "./add_pdf_page_number/add_pdf_page_number_store";
import AddPageHeaderFooter from "./add_header_footer/add_header_footer_store";
import SplitPdfPage from "./split_pdf/split_pdf_store";
// import ExtractPdfStore from "../../pages/tools/extract_pdf/extract_pdf_store";
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
  _id:string
}

interface ToolsStore {
  loadingState: "idle" | "loading" | "success" | "error";
  progress: number;
  setProgress: (newProgress: number) => void;
  selectedFiles: ISelectedFile[];
  downLoadUrl: string[] | null;
  downLoadId: string[] | null;
  downLoadFileName: string | null;
  downLoadIdFileType: string | null;
  isDownloadIdValid: boolean;
  downloadFileErrorMessage: string;
  setLoadingState: (
    newLoadingState: "idle" | "loading" | "success" | "error"
  ) => void;
  selectedIndex: number;
  sideMenuOpen: boolean;
  pdfPages: PageItem[];
  getFileInfo: (fileId: string) => void;
  recentActivities: IRecentActivities[];
  resetStore: () => void;
  setItems?: (pageIndex: number, pages: PageItem[]) => void;
  downloadFile?: (
    downloadUrl: string,
    downLoadId: string
  ) => Promise<string>;
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
  deleteFile: (fileId: string) => void;
  toggleSideMenuOpen: () => void;
  convertPdfToWord: (pdfFile: File) => Promise<string>;
  convertWordToPdf: (pdfFile: File) => Promise<string>;
  SplitPdf: (pdfFile: ISelectedFile[]) => Promise<string>;
  compressPdf: (
    pdfFiles: ISelectedFile[],
    compressionLevel: string
  ) => Promise<string>;
  JpgToPdf: (
    pdfFiles: ISelectedFile[],
    orientation: string,
    margin: string
  ) => Promise<string>;
  PdfToJpg: (pdfFiles: ISelectedFile[], jpgQuality: string) => Promise<string>;
  mergePdfs: (pdfFile: ISelectedFile[]) => Promise<string>;
  RotatePdf: (pdfFile: ISelectedFile[]) => Promise<string>;
  ReorderPages: (pdfFile: ISelectedFile[]) => Promise<string>;
  ExtractPdf: (pdfFile: ISelectedFile[]) => Promise<string>;
  DeletePdfPages: (pdfFile: ISelectedFile[]) => Promise<string>;
  AddPageNumbers: (pdfFile: ISelectedFile[]) => Promise<string>;
  SplitPdfPages: (pdfFile: ISelectedFile[]) => Promise<string>;
  AddPageHeaderFooter: (pdfFile: ISelectedFile[]) => Promise<string>;
}

const useToolsStore = create<ToolsStore>((set) => ({
  selectedFiles: [], // Initialize as empty to avoid default object issues
  sideMenuOpen: false,
  pdfPages: [],
  downLoadFileName:'',
  downLoadFileUrl: '',
  downLoadIdFileType:'',
  isDownloadIdValid: true,
  downloadFileErrorMessage: "",
  resetStore: () =>
    set({
      selectedFiles: [],
      sideMenuOpen: false,
      selectedIndex: 0,
      pdfPages: [],
    }),
  loadingState: "idle",
  recentActivities: [
    {
      _id:"",
      fileName: "",
      fileSize: "",
      fileType: "",
      fileUrl: "",
      icon: "",
    },
  ],
  progress: 0,
  downLoadUrl: null,
  downLoadId: null,
  setLoadingState: (
    newLoadingState: "idle" | "loading" | "success" | "error"
  ) => set(() => ({ loadingState: newLoadingState })),
  setProgress: (newProgress: number) => set(() => ({ progress: newProgress })),
  selectedIndex: 0,
  reorderSelectedFiles: (newFilesOrder: ISelectedFile[]) =>
    set({ selectedFiles: newFilesOrder }),
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
  getFileInfo: async (fileId: string) => {
    try {
      const res = baseAxios.get("/tools/get-file-info" + fileId);
       set({
         downLoadFileName: (await res).data.downLoadFileName,
         downLoadIdFileType: (await res).data.downLoadIdFileType,
       });
    } catch (error) {
      console.log(error+"failed to get file info");
    }
  },
  downloadFile: async (downloadUrl: string,downLoadId:string) => {
    
    function getFileNameAndExtension(downloadUrl: string) {
      // Extract just the last part after "/"
      const pathname = new URL(downloadUrl).pathname;
      const filename = pathname.substring(pathname.lastIndexOf("/") + 1);

      // Split filename into name + extension
      const lastDot = filename.lastIndexOf(".");
      if (lastDot === -1) {
        return { filename, name: filename, extension: "" }; // no extension
      }

      return {
        filename, // full filename
        name: filename.substring(0, lastDot), // without extension
        extension: filename.substring(lastDot + 1), // without the dot
      };
    }

    // Example usage:
    // const url = "http://localhost:5000/downloads/report.final.version.pdf";
    // console.log(getFileNameAndExtension(url));

    try {

      
      const res = await baseAxios.get("/tools/download/" + downLoadId, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));

      // Create a temporary link element
      const link = document.createElement("a");
      link.href = url;
      // console.log(pdfFiles)
      // Set the download attribute with a file name
      // You should get the correct file extension from your API response
      // const selectedFile = pdfFiles; // Assuming the first file is the one being downloaded
      // const fileName = "downloaded_file";
      // const fileType =  "docx"; // Default to 'docx' if no type is provided
      link.setAttribute("download", `${getFileNameAndExtension(downloadUrl).name}.${getFileNameAndExtension(downloadUrl).extension}`);
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
        variant: "error",
      });
      console.log(error);
      // return "error";
    }
  },

  getRecentActivities: async () => {
    try {
      const res = await baseAxios.get("/tools/recent-activities", {
        withCredentials: true,
      });
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
      const res = await baseAxios.post("/tools/convert-word-to-pdf", form, {
        withCredentials: true,
      });
      set({
        loadingState: "success",
        downLoadUrl: res.data.fileUrl,
        downLoadId: res.data.fileId,
      });
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
    set({ loadingState: "loading"});
    try {
      const form = new FormData();
      form.append("pdfFile", pdfFile);
      const res = await baseAxios.post("/tools/convert-pdf-to-word", form, {
        withCredentials: true,
      });
      set({
        loadingState: "success",
        downLoadUrl: res.data.fileUrl,
        downLoadId: res.data.fileId,
      });
      console.log(res.data);
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
      });
      const res = await baseAxios.post("/tools/merge-pdfs", form, {
        withCredentials: true,
      });
      set({
        loadingState: "success",
        downLoadId: res.data.fileId,
        downLoadUrl: res.data.fileUrl,
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
  compressPdf: async (pdfFiles: ISelectedFile[], compressionLevel: string) => {
    set({ loadingState: "loading", progress: 0, downLoadUrl: null });
    try {
      const form = new FormData();

      pdfFiles.forEach((file) => {
        // 'files' must match the field name in your Express route's `upload.array('files')`
        form.append("pdfFiles", file.file);
        form.append("compressionLevel", compressionLevel);
      });
      const res = await baseAxios.post("/tools/compress-pdf", form, {
        withCredentials: true,
      });
      set({
        loadingState: "success",
        downLoadUrl: res.data.fileUrl,
        downLoadId: res.data.fileId,
      });
    } catch (error) {
      console.error("Error compressing PDF:", error);
      set({ loadingState: "error" });
      enqueueSnackbar("failed to compress pdf!", {
        variant: "error",
      });
      return "error!!";
    }
  },
  PdfToJpg: async (pdfFiles: ISelectedFile[], jpgQuality: string) => {
    set({ loadingState: "loading", progress: 0, downLoadUrl: null });
    try {
      const form = new FormData();

      pdfFiles.forEach((file) => {
        // 'files' must match the field name in your Express route's `upload.array('files')`
        form.append("pdfFiles", file.file);
        form.append("quality", jpgQuality);
      });
      const res = await baseAxios.post("/tools/convert-pdf-to-jpg", form, {
        withCredentials: true,
      });
      set({
        loadingState: "success",
        downLoadId: res.data.fileId,
        downLoadUrl: res.data.fileUrl,
      });
    } catch (error) {
      console.error("Error converting PDF:", error);
      set({ loadingState: "error" });
      enqueueSnackbar("failed to convert pdf!", {
        variant: "error",
      });
      return "error!!";
    }
  },
  JpgToPdf: async (
    pdfFiles: ISelectedFile[],
    orientation: string,
    margin: string
  ) => {
    set({ loadingState: "loading", progress: 0, downLoadUrl: null });
    try {
      const form = new FormData();

      pdfFiles.forEach((file) => {
        // 'files' must match the field name in your Express route's `upload.array('files')`
        form.append("pdfFiles", file.file);
        form.append("orientation", orientation);
        form.append("margin", margin);
      });
      const res = await baseAxios.post("/tools/convert-jpg-to-pdf", form, {
        withCredentials: true,
      });
      set({
        loadingState: "success",
        downLoadId: res.data.fileId,
        downLoadUrl: res.data.fileUrl,
      });
    } catch (error) {
      console.error("Error converting JPG:", error);
      set({ loadingState: "error" });
      enqueueSnackbar("failed to convert jpg!", {
        variant: "error",
      });
      return "error!!";
    }
  },
  RotatePdf: async (pdfFiles: ISelectedFile[]) => {
    set({ loadingState: "loading", progress: 0, downLoadUrl: null });
    try {
      const form = new FormData();

      form.append("pdfFiles", pdfFiles[0].file);
      form.append("rotate", JSON.stringify(pdfFiles[0].rotate || []));
      const res = await baseAxios.post("/tools/rotate-pdf-pages", form, {
        withCredentials: true,
      });
      set({
        loadingState: "success",
        downLoadId: res.data.fileId,
        downLoadUrl: res.data.fileUrl,
      });
    } catch (error) {
      console.error("Error converting JPG:", error);
      set({ loadingState: "error" });
      enqueueSnackbar("failed to convert jpg!", {
        variant: "error",
      });
      return "error!!";
    }
  },
  ReorderPages: async (pdfFiles: ISelectedFile[]) => {
    set({ loadingState: "loading", progress: 0, downLoadUrl: null });
    try {
      const form = new FormData();
      const pageNumbers = pdfFiles.map((item) =>
        item.pdfPages.map((item) => item.pageNumber)
      );

      form.append("pdfFiles", pdfFiles[0].file);
      console.log(pdfFiles[0].pdfPages);
      console.log(pageNumbers[0]);
      form.append(
        "pageOrder",
        pageNumbers ? JSON.stringify(pageNumbers[0]) : "[]"
      );
      const res = await baseAxios.post("/tools/reorder-pages", form, {
        withCredentials: true,
      });
      set({
        loadingState: "success",
        downLoadId: res.data.fileId,
        downLoadUrl: res.data.fileUrl,
      });
    } catch (error) {
      console.error("Error converting JPG:", error);
      set({ loadingState: "error" });
      enqueueSnackbar("failed to convert jpg!", {
        variant: "error",
      });
      return "error!!";
    }
  },
  ExtractPdf: async (pdfFiles: ISelectedFile[]) => {
    set({ loadingState: "loading", progress: 0, downLoadUrl: null });
    try {
      const form = new FormData();
      const pages = ExtractPdfStore.getState().pagesToExtract;
      const pagesToExtract = pages
        .filter((item) => item.selected) // keep only selected items
        .map((item) => item.number);

      form.append("pdfFiles", pdfFiles[0].file);

      form.append("pageRanges", JSON.stringify(pagesToExtract.join(", ")));

      console.log(pagesToExtract);
      const res = await baseAxios.post("/tools/export-pdf-pages", form, {
        withCredentials: true,
      });
      set({
        loadingState: "success",
        downLoadId: res.data.fileId,
        downLoadUrl: res.data.fileUrl,
      });
    } catch (error) {
      console.error("Error extracting JPG:", error);
      set({ loadingState: "error" });
      enqueueSnackbar("failed to convert jpg!", {
        variant: "error",
      });
      return "error!!";
    }
  },
  DeletePdfPages: async (pdfFiles: ISelectedFile[]) => {
    set({ loadingState: "loading", progress: 0, downLoadUrl: null });
    try {
      const form = new FormData();
      const pages = DeletePdfPages.getState().pagesToDelete;
      const pagesToDelete = pages
        .filter((item) => item.selected) // keep only selected items
        .map((item) => item.number);

      form.append("pdfFiles", pdfFiles[0].file);

      form.append("pageRanges", JSON.stringify(pagesToDelete.join(", ")));

      console.log(pagesToDelete);
      const res = await baseAxios.post("/tools/delete-pdf-pages", form, {
        withCredentials: true,
      });
      set({
        loadingState: "success",
        downLoadId: res.data.fileId,
        downLoadUrl: res.data.fileUrl,
      });
    } catch (error) {
      console.error("Error deleting JPG:", error);
      set({ loadingState: "error" });
      enqueueSnackbar("failed to convert jpg!", {
        variant: "error",
      });
      return "error!!";
    }
  },
  AddPageNumbers: async (pdfFiles: ISelectedFile[]) => {
    set({ loadingState: "loading", progress: 0, downLoadUrl: null });
    try {
      const form = new FormData();
      const startPosition = AddPageNumber.getState().startPosition;
      const pageNumberPosition = AddPageNumber.getState().numberPosition;
      const pages = AddPageNumber.getState().pagesToNumber;
      const color = AddPageNumber.getState().fontColor;
      const size = AddPageNumber.getState().fontSize;
      const pagesToNumber = pages.map((item) => item.number);

      form.append("pdfFiles", pdfFiles[0].file);

      form.append("pageRanges", JSON.stringify(pagesToNumber.join(", ")));
      form.append("startPosition", JSON.stringify(startPosition));
      console.log(pageNumberPosition);
      form.append("position", pageNumberPosition);
      form.append("size", size);
      form.append("color", color);

      console.log(pagesToNumber);
      const res = await baseAxios.post("/tools/add-pdf-page-numbers", form, {
        withCredentials: true,
      });
      set({
        loadingState: "success",
        downLoadId: res.data.fileId,
        downLoadUrl: res.data.fileUrl,
      });
    } catch (error) {
      console.error("Error adding page numbers JPG:", error);
      set({ loadingState: "error" });
      enqueueSnackbar("failed to add pdf page numbers!", {
        variant: "error",
      });
      return "error!!";
    }
  },

  SplitPdf: async (pdfFiles: ISelectedFile[]) => {
    const fixedRanges = SplitPdfPage.getState().fixedRange;
    set({ loadingState: "loading", progress: 0, downLoadUrl: null });
    try {
      const formattedRanges = fixedRanges.map((range) => {
        if (range.from === range.to) {
          // If from and to are the same, return a string with just the page number.
          return `${range.from}`;
        } else {
          // If they are different, return a range string "from-to".
          return `${range.from}-${range.to}`;
        }
      });
      const form = new FormData();
      form.append("pageRanges", JSON.stringify(formattedRanges.join(", ")));

      form.append("pdfFiles", pdfFiles[0].file);
      // form.append("pageRanges",);
      const res = await baseAxios.post("/tools/split-pdf-pages", form, {
        withCredentials: true,
      });
      set({
        loadingState: "success",
        downLoadId: res.data.fileId,
        downLoadUrl: res.data.fileUrl,
      });
    } catch (error) {
      console.error("Error adding page numbers JPG:", error);
      set({ loadingState: "error" });
      enqueueSnackbar("failed to add pdf page numbers!", {
        variant: "error",
      });
      return "error!!";
    }
  },
  SplitPdfPages: async (pdfFiles: ISelectedFile[]) => {
    const form = new FormData();
    form.append("pdfFiles", pdfFiles[0].file);
    set({ loadingState: "loading", progress: 0, downLoadUrl: null });
    try {
      // form.append("range", pageNumberPosition);
      const res = await baseAxios.post("/tools/split-pdf-pages", form, {
        withCredentials: true,
      });
      set({
        loadingState: "success",
        downLoadId: res.data.fileId,
        downLoadUrl: res.data.fileUrl,
      });
    } catch (error) {
      console.error("Error adding page numbers JPG:", error);
      set({ loadingState: "error" });
      enqueueSnackbar("failed to add pdf page numbers!", {
        variant: "error",
      });
      return "error!!";
    }
  },

  AddPageHeaderFooter: async (pdfFiles: ISelectedFile[]) => {
    set({ loadingState: "loading", progress: 0, downLoadUrl: null });
    try {
      const form = new FormData();
      const startPosition = AddPageHeaderFooter.getState().startFrom;
      const pageNumberPosition = AddPageHeaderFooter.getState().position;
      const pages = AddPageHeaderFooter.getState().pagesToApply;
      const color = AddPageHeaderFooter.getState().fontColor;
      const size = AddPageHeaderFooter.getState().fontSize;
      const customText = AddPageHeaderFooter.getState().customText;
      const pagesToNumber = pages.map((item) => item.number);

      form.append("pdfFiles", pdfFiles[0].file);
      form.append(
        "headerOption",
        AddPageHeaderFooter.getState().customizationStyle
      );
      form.append(
        "footerOption",
        AddPageHeaderFooter.getState().customizationStyle
      );

      form.append("pageRanges", JSON.stringify(pagesToNumber.join(", ")));
      form.append("startPosition", JSON.stringify(startPosition));
      console.log(pageNumberPosition);
      form.append("position", pageNumberPosition);
      form.append("fontSize", size);
      form.append("color", color);
      form.append("customFooterText", customText);
      form.append("customHeaderText", customText);

      console.log(pagesToNumber);
      const res = await baseAxios.post("/tools/add-pdf-header-footer", form, {
        withCredentials: true,
      });
      set({
        loadingState: "success",
        downLoadId: res.data.fileId,
        downLoadUrl: res.data.fileUrl,
      });
    } catch (error) {
      console.error("Error adding page numbers JPG:", error);
      set({ loadingState: "error" });
      enqueueSnackbar("failed to add pdf page numbers!", {
        variant: "error",
      });
      return "error!!";
    }
  },
  deleteFile: async (fileId: string) => {
    try {
      const res = await baseAxios.post(
        "/tools/delete-file/" + fileId,

        {
          withCredentials: true,
        }
      );
      set({
        loadingState: "success",
        downLoadId: res.data.fileId,
      });
    } catch (error) {
      console.error("Error deleting file", error);
      set({ loadingState: "error" });
      enqueueSnackbar("error deleting file", {
        variant: "error",
      });
      return;
    }
  },
  // AddPageHeaderFooter: async (pdfFiles: ISelectedFile[]) => {
  //   set({ loadingState: "loading", progress: 0, downLoadUrl: null });
  //   try {
  //     const form = new FormData();
  //     const customizationStyle = AddPageHeaderFooter.getState().customizationStyle;
  //     const startPosition = AddPageHeaderFooter.getState().startFrom;
  //     const pageNumberPosition = AddPageHeaderFooter.getState().position;
  //     const pages = AddPageHeaderFooter.getState().pagesToApply;
  //     const color = AddPageHeaderFooter.getState().fontColor;
  //     const size = AddPageHeaderFooter.getState().fontSize;
  //     const pagesToNumber = pages.map((item) => item.number);

  //     form.append("headerLabel", customizationStyle);
  //     form.append("pdfFiles", pdfFiles[0].file);
  //     form.append("pdfFiles", pdfFiles[0].file);

  //     form.append("headerLabel", pdfFiles[0].file);
  //     form.append("pageRanges", JSON.stringify(pagesToNumber.join(", ")));
  //     form.append("startPosition", JSON.stringify(startPosition));
  //     console.log(pageNumberPosition);
  //     form.append("position", pageNumberPosition);
  //     form.append("size", size);
  //     form.append("color", color);

  //     console.log(pagesToNumber);
  //     const res = await baseAxios.post("/tools/reorder-pages", form, {
  //       withCredentials: true,
  //     });
  //     set({
  //       loadingState: "success",
  //       downLoadId: res.data.fileId,
  //     });
  //   } catch (error) {
  //     console.error("Error adding page numbers JPG:", error);
  //     set({ loadingState: "error" });
  //     enqueueSnackbar("failed to add pdf page numbers!", {
  //       variant: "error",
  //     });
  //     return "error!!";
  //   }
  // },
}));

export default useToolsStore;
