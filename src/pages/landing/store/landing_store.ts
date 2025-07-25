import { create } from "zustand";

const useLandingStore = create((set) => ({
    sideMenuOpen: false,
    toggleSideMenuOpen: () => set((state: any) => ({ sideMenuOpen: !state.sideMenuOpen }))
}));

export default useLandingStore;