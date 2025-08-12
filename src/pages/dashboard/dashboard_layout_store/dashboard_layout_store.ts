import { create } from "zustand";


interface LandingStore {
    sideMenuOpen: boolean;
    toggleSideMenuOpen: () => void;
}

const useDashboardStore = create<LandingStore>((set) => ({
  sideMenuOpen: false,
  toggleSideMenuOpen: () =>
    set((state) => ({ sideMenuOpen: !state.sideMenuOpen })),
}));

export default useDashboardStore;