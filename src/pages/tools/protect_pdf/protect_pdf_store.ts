import { create } from "zustand";

interface IProtectPdfStore {
  password: string;
  confirmPassword: string;
  passwordsMatch: boolean;
  setPassword: (password: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
}

const useProtectPdfStore = create<IProtectPdfStore>((set) => ({
  password: "",
  confirmPassword: "",
  passwordsMatch: false,

  setPassword: (password: string) =>
    set((state) => ({
      password: password,
      passwordsMatch: password === state.confirmPassword,
    })),

  setConfirmPassword: (confirmPassword: string) =>
    set((state) => ({
      confirmPassword: confirmPassword,
      passwordsMatch: state.password === confirmPassword,
    })),
}));

export default useProtectPdfStore;
