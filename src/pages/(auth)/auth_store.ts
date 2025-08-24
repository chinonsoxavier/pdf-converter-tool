import { create } from "zustand";
import { enqueueSnackbar } from "notistack";
import { baseAxios } from "@/network/base_urls";
import { isAxiosError } from "axios";

interface IRegister {
  email: string;
  password: string;
  cpassword: string;
  userName: string;
}


interface ILogin {
  email: string;
  password: string;
}

interface IUser {
  userName: string;
  email: string;
  isAdmin: boolean;
  isVerified: boolean;
}
interface IChangePassword {
  newPassword: string;
  ComfirmNewPassword: string;
  token:string
}

interface IResetPasswordToken{
  email:string
}

interface IResendPasswordResetToken {
  email:string
}

interface IAuthStore {
  authStatus: "not authenticated" | "authenticated" | "email sent";
  userAuthEmail:string,
  errorMessage: string;
  loadingStatus: "idle" | "loading" | "error" | "success";
  user: IUser;
  register: ({
    email,
    cpassword,
    userName,
    password,
  }: IRegister) => Promise<void>;
  resetErrorMsg: ({ status }: { status: string }) => void;
  loadUser: () => Promise<void>;
  logOut: () => Promise<void>;
  login: ({ email, password }: ILogin) => Promise<void>;
  resetPasswordToken: ({ email }: IResetPasswordToken) => Promise<void>;
  changePassword: ({
    newPassword,
    ComfirmNewPassword,
  }: IChangePassword) => Promise<void>;
  resendPasswordResetToken: ({
    email,
  }: IResendPasswordResetToken) => Promise<void>;
  verifyEmail: ({
    token,
  }: {token:string}) => Promise<void>;
}

const useAuthStore = create<IAuthStore>((set) => ({
  authStatus: "not authenticated",
  loadingStatus: "idle",
  userAuthEmail:"",
  errorMessage: "",
  user: null,
  resetErrorMsg: ({status=''}) => {
  set({errorMessage:status,loadingStatus:'idle'})
},
  register: async ({ email, password, userName, cpassword }: IRegister) => {
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

      set({ authStatus: 'email sent', userAuthEmail: email });

      console.log(res);
      set({ loadingStatus: "success" });
    } catch (error) {
      set({ loadingStatus: "error" });
      if (isAxiosError(error) && error.response) {
        set({ errorMessage: error.response.data });
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
  },
  loadUser: async () => {
    try {
      const res = await baseAxios.get("/auth/load-user", {
        withCredentials: true,
      });
      console.log(res.data, "data");
      set({ user: res.data.data });
    } catch (error) {
      console.log(error);
    }
  },
  logOut: async () => {
    try {
      await baseAxios.get("/auth/logout", { withCredentials: true });
      set({ user: null });
      enqueueSnackbar("logout successfully", {
        variant:'success'
      });

    } catch (error) {
      if (isAxiosError(error) && error.response) {
        set({ errorMessage: error.response.data });
        console.log(error.response.data);
        enqueueSnackbar(error.response.data, {
          variant: "error",
        });
      } else {
        console.error("An unknown error occurred", error);
        enqueueSnackbar("An unknown error occurred.", {
          variant: "error",
        });
      }
    }
  },
  login: async ({ email, password }: ILogin) => {
    set({ loadingStatus: "loading" });
    try {
      const res = baseAxios.post(
        "/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      enqueueSnackbar((await res).data);
      const { loadUser } = useAuthStore.getState();
      await loadUser();
      set({loadingStatus:"success"})
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        set({ errorMessage: error.response.data.message });
        console.log(error.response.data.message);
        enqueueSnackbar(error.response.data.message, {
          variant: "error",
        });
      } else {
        console.error("An unknown error occurred", error);
        enqueueSnackbar("An unknown error occurred.", {
          variant: "error",
        });
      };
      set({loadingStatus:'error'})
    }
  },
  resetPasswordToken: async ({ email }: IResetPasswordToken) => {
      set({ loadingStatus: "loading" });
    try {
      await baseAxios.post("/auth/reset-password", { email: email });
      enqueueSnackbar("check your email to reset your password!",{variant:'success'});
      set({ loadingStatus: "success" });
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        set({ errorMessage: error.response.data });
        console.log(error.response.data);
        enqueueSnackbar(error.response.data, {
          variant: "error",
        });
      } else {
        set({ errorMessage: "An unknown error occurred" });
        console.error("An unknown error occurred", error);
        enqueueSnackbar("An unknown error occurred.", {
          variant: "error",
        });
      };
      set({ loadingStatus: "error" });

    }
  },
  changePassword: async ({
    newPassword,
    ComfirmNewPassword,
    token,
  }: IChangePassword) => {
    set({ loadingStatus: "loading" });
    try {
      if (newPassword !== ComfirmNewPassword) {
        enqueueSnackbar("passwords do not match", {
          variant: "error",
        });
         set({ loadingStatus: "error",errorMessage:"passwords do not match" });
        return;
      }

         if ((newPassword.length && ComfirmNewPassword.length) < 8) {
        enqueueSnackbar("passwords do not match", {
          variant: "error",
        });
         set({
           loadingStatus: "error",
           errorMessage: "Password must be at least 8 characters long",
         });
        return;
      }
     
      const res = baseAxios.put("/auth/change-password/" + token, {
        newPassword,
        ComfirmNewPassword,
      });
      enqueueSnackbar((await res).data,{variant:"success"});
      set({ loadingStatus: "success" });
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        set({ errorMessage: error.response.data });
        console.log(error.response.data);
        enqueueSnackbar(error.response.data, {
          variant: "error",
        });
      } else {
        console.error("An unknown error occurred", error);
        enqueueSnackbar("An unknown error occurred.", {
          variant: "error",
        });
      };
      set({ loadingStatus: "error" });
    }
  },
  resendPasswordResetToken: async ({ email}: IResendPasswordResetToken) => {
      set({ loadingStatus: "loading" });
    try {
      await baseAxios.post("/auth/resend-password-reset-token",{email:email});
      enqueueSnackbar("token has been sent to email",{variant:"success"});
      set({ loadingStatus: "success" });
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        set({ errorMessage: error.response.data });
        console.log(error.response.data);
        enqueueSnackbar(error.response.data, {
          variant: "error",
        });
      } else {
        console.error("An unknown error occurred", error);
        enqueueSnackbar("An unknown error occurred.", {
          variant: "error",
        });
      };
      set({ loadingStatus: "error" });
    }
  },
  verifyEmail: async ({ token }: { token: string }) => {
    try {
      baseAxios.put("/auth/verify" + token);
   enqueueSnackbar("Email verified successfully", {
     variant: "success",
   });
    } catch (error) {
         if (isAxiosError(error) && error.response) {
           set({ errorMessage: error.response.data });
           console.log(error.response.data);
           enqueueSnackbar(error.response.data, {
             variant: "error",
           });
         } else {
           console.error("An unknown error occurred", error);
           enqueueSnackbar("An unknown error occurred.", {
             variant: "error",
           });
         }
         set({ loadingStatus: "error" });
    }
  }
}));

export default useAuthStore;
