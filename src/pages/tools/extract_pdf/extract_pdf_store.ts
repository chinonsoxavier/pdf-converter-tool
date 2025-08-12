import { create } from "zustand";


interface ExtractPdfStore {
    extractMode: "all" | "selected";
    pagesToExtract?: number[];
    setExtractMode: (mode: "all" | "selected") => void;
    setPagesToExtract: (pages: number[]) => void;
    // resetPagesToExtract: () => void;
    // resetExtractMode: () => void;
}
const useExtractPdfStore = create<ExtractPdfStore>((set) => ({
    extractMode: "all",
    setExtractMode: (mode: "all" | "selected") =>
        set(() => ({ extractMode: mode })),
    setPagesToExtract: (pages: number[]) =>
        set(() => ({ pagesToExtract: pages })),
    // resetPagesToExtract: () => set(() => ({ pagesToExtract: undefined })),
    // resetExtractMode: () => set(() => ({ extractMode: "all"

}));

export default useExtractPdfStore;
