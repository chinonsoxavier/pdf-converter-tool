import { create } from "zustand";


interface LandingStore {
    sideMenuOpen: boolean;
    toggleSideMenuOpen: () => void;
}

const useLandingStore = create<LandingStore>((set) => ({
  sideMenuOpen: false,
  toggleSideMenuOpen: () =>
    set((state: any) => ({ sideMenuOpen: !state.sideMenuOpen })),
}));

export default useLandingStore;