import { create } from "zustand";
import { enqueueSnackbar } from "notistack";
import { baseAxios } from "@/network/base_urls";
import { isAxiosError } from "axios";

interface IRegister {
    email: string;
    password: string;
    cpassword: string;
    userName:string
}

interface IUser {
    userName: string;
    email: string;
    isAdmin: boolean;
    isVerified: boolean;
}

interface IAuthStore {
    authStatus: "not authenticated" | "authenticated";
    errorMessage: string;
    loadingStatus: "idle" | "loading" | "error" | "success",
    user: IUser,
    register:({email,cpassword,userName,password}:IRegister)=>Promise<void>
};

const useAuthStore = create<IAuthStore>((set) => ({
    authStatus: 'not authenticated',
    loadingStatus: "idle",
    errorMessage:"",
    user: null,
    register : async({email,password,userName,cpassword}:IRegister)=> {
        try {
          set({ loadingStatus: "loading" });
          if (password !== cpassword) {
            enqueueSnackbar("password and comfirm password do not match", {
              variant: "error",
            });
            set({ errorMessage: "password and comfirm password do not match" });
            return;
          }

          if ((password.length || cpassword.length) < 8) {
            enqueueSnackbar("passwords must me more tha 8 characters long", {
              variant: "error",
            });
            set({
              errorMessage: "passwords must me more tha 8 characters long",
            });

            return;
          }

          const res = await baseAxios.post("/auth/register", {
            email: email,
            password: password,
            userName: userName,
            cpassword: cpassword,
          });

          enqueueSnackbar("Please check your email for the activation link", {
            variant: "success",
          });

          console.log(res);
          set({ loadingStatus: "success" });
        } catch (error) {
          set({ loadingStatus: "error" });
    if (isAxiosError(error) && error.response) {
      console.log(error.response.data);
      enqueueSnackbar(error.response.data, {
        variant: "error",
      });
    } else {
      // Handle other types of errors (e.g., network errors, etc.)
      console.error("An unknown error occurred", error);
      enqueueSnackbar("An unknown error occurred.", {
        variant: "error",
      });
    }
        } finally {
          set({ loadingStatus: "idle" });
        }
    }

}));

export default useAuthStore

