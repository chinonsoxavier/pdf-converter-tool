import { create } from "zustand";


interface DeletePdfPagesStore {
    pagesToDelete?: number[];
    setPagesToDelete: (pages: number[]) => void;
}
const useDeletePdfPagesStore = create<DeletePdfPagesStore>((set) => ({
    pagesToDelete: [],
    setPagesToDelete: (pages: number[]) =>
        set(() => ({ pagesToDelete: pages })),

}));

export default useDeletePdfPagesStore;
