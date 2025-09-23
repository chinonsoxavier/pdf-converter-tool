import { create } from "zustand";

interface IUnlockPdfStore {
  password: string;
  setPassword: (password: string) => void;
}

const useUnlockPdfStore = create<IUnlockPdfStore>((set) => ({
  password: "",
  setPassword: (password: string) =>
    set(() => ({
      password: password,
    })),


}));

export default useUnlockPdfStore;
