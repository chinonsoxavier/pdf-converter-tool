import { create } from "zustand";


interface RotatePdfStore {
    rotateAllPage: boolean;
    toggleRotateAllPage: () => void;
}

const useRotateStore = create<RotatePdfStore>((set) => ({
  rotateAllPage: false,
  toggleRotateAllPage: () =>
    set((state) => ({ rotateAllPage: !state.rotateAllPage })),
}));

export default useRotateStore;