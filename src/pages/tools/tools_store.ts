import { create } from "zustand";


interface ToolsStore {
    sideMenuOpen: boolean;
    toggleSideMenuOpen: () => void;
}

const useToolsStore = create<ToolsStore>((set) => ({
  sideMenuOpen: false,
  toggleSideMenuOpen: () =>
    set((state: any) => ({ sideMenuOpen: !state.sideMenuOpen })),
}));

export default useToolsStore;