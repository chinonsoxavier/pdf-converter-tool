import { create } from "zustand";
import { enqueueSnackbar } from "notistack";
import { baseAxios } from "@/network/base_urls";
import { isAxiosError } from "axios";
import {  NavigateOptions, To } from "react-router-dom";

interface IRegister {
  email: string;
  password: string;
  cpassword: string;
  userName: string;
  navigate:(to: To, options?: NavigateOptions) =>void | Promise<void>;
}

interface ILogin {
  email: string;
  password: string;
  navigate: (to: To, options?: NavigateOptions) => void | Promise<void>;
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
  userAuthEmail: string;
  errorMessage: string;
  loadingStatus: "idle" | "loading" | "error" | "success";
  user: IUser;
  register: ({
    email,
    cpassword,
    userName,
    password,
  }: IRegister) => Promise<void>;
  setLoadingStatus: ({
    status,
  }: {
    status: "idle" | "loading" | "error" | "success";
  }) => void;
  resetErrorMsg: ({ status }: { status: string }) => void;
  loadUser: () => Promise<void>;
  logOut: () => Promise<void>;
  login: ({ email, password, navigate }: ILogin) => Promise<void>;
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
    setLoadingStatus,
    setErrorMessage,
  }: {
    token: string;
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
    setLoadingStatus: React.Dispatch<
      React.SetStateAction<
        | "loading"
        | "success"
        | "invalid"
        | "expired"
        | "already-verified"
        | "error"
      >
    >;
  }) => Promise<void>;
  resendEmailVerificationToken: ({
    email,
    setLoadingStatus,
    setIsResending,
    setCountdown,
  }: {
    email: string;
    setLoadingStatus: React.Dispatch<React.SetStateAction<string>>;
    setIsResending: React.Dispatch<React.SetStateAction<boolean>>;
    setCountdown: React.Dispatch<React.SetStateAction<number>>;
  }) => Promise<void> | void;
}


const useAuthStore = create<IAuthStore>((set) => ({
  authStatus: "not authenticated",
  loadingStatus: "idle",
  userAuthEmail: "",
  errorMessage: "",
  user: null,
  resetErrorMsg: ({ status = "" }) => {
    set({ errorMessage: status, loadingStatus: "idle" });
  },
  setLoadingStatus: ({ status = "success" }) => {
    set({ loadingStatus: status });
  },
  register: async ({
    email,
    password,
    userName,
    cpassword,
    navigate,
  }: IRegister) => {
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

      if (res.data.status === "email not verified") {
        set({ authStatus: "email sent", userAuthEmail: email });
        navigate("/verify-email");
        enqueueSnackbar("Please check your email for the activation link");
        return;
      }
      if (res.data.status === "email already exists") {
        enqueueSnackbar(
          "user with this email already exists,proceed to login",
          { variant: "error" }
        );
        navigate("/signin");
        return;
      }
      enqueueSnackbar("Please check your email for the activation link", {
        variant: "success",
      });
      set({ authStatus: "email sent", userAuthEmail: email });
      navigate("/signin");
      set({ loadingStatus: "success" });
    } catch (error) {
      set({ loadingStatus: "error" });
      if (isAxiosError(error) && error.response) {
        set({ errorMessage: error.response.data });
        console.log(error.response.data);
        enqueueSnackbar(
          error.response.data || "failed to register user,please try again!",
          {
            variant: "error",
          }
        );
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
    }
  },
  login: async ({ email, password, navigate }: ILogin) => {
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
      set({ loadingStatus: "success" });
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        set({
          errorMessage: error.response.data.message,
          authStatus: "email sent",
          userAuthEmail: email,
        });
        if (
          error.response.data.message ===
          "Email not verified,Check your email for verification link!"
        ) {
          console.log("Redirecting to verify-email page");
          enqueueSnackbar(error.response.data.message);
          navigate("/verify-email");
          return;
        }
        console.log(error.response.data.message);
        enqueueSnackbar(error.response.data.message, {
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
  },
  resetPasswordToken: async ({ email }: IResetPasswordToken) => {
    set({ loadingStatus: "loading" });
    try {
      await baseAxios.post("/auth/reset-password", { email: email });
      enqueueSnackbar("check your email to reset your password!", {
        variant: "success",
      });
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
      }
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
        set({ loadingStatus: "error", errorMessage: "passwords do not match" });
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
      enqueueSnackbar((await res).data, { variant: "success" });
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
      }
      set({ loadingStatus: "error" });
    }
  },
  resendPasswordResetToken: async ({ email }: IResendPasswordResetToken) => {
    set({ loadingStatus: "loading" });
    try {
      await baseAxios.post("/auth/resend-password-reset-token", {
        email: email,
      });
      enqueueSnackbar("token has been sent to email", { variant: "success" });
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
      }
      set({ loadingStatus: "error" });
    }
  },
  resendEmailVerificationToken: ({
    email,
    setIsResending,
    setLoadingStatus,
    setCountdown,
  }: {
    email: string;
    setIsResending: React.Dispatch<React.SetStateAction<boolean>>;
    setLoadingStatus: React.Dispatch<React.SetStateAction<string>>;
    setCountdown: React.Dispatch<React.SetStateAction<number>>;
  }) => {
    // set({ loadingStatus: "error" });
    const ResendEmailVerificationToken = async () => {
      setLoadingStatus("loading");
      setIsResending(true);
      try {
        const res = await baseAxios.post("/auth/resend-verification-token", {
          email: email,
        });
        console.log(res);
        enqueueSnackbar("verification token has been sent to email", {
          variant: "success",
        });
        setCountdown(60);
        setIsResending(false);
        setLoadingStatus("success");
        // set({ loadingStatus: "success" });
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
        setIsResending(false);
        set({ loadingStatus: "error" });
      }
    };
    ResendEmailVerificationToken();
  },
  verifyEmail: async ({
    token,
    setLoadingStatus,
    setErrorMessage,
  }: {
    token: string;
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
    setLoadingStatus: React.Dispatch<
      React.SetStateAction<
        | "loading"
        | "success"
        | "invalid"
        | "expired"
        | "already-verified"
        | "error"
      >
    >;
  }) => {
    // set({ loadingStatus: "loading" });
    // setLoadingStatus("loading");
    try {
   const res = await baseAxios.put("/auth/verify/" + token);
      enqueueSnackbar("Email verified successfully", {
        variant: "success",
      });
      setLoadingStatus("success");
      console.log(res);
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data);
        // set({ errorMessage: error.response.data });
        console.log(error.response.data);
        enqueueSnackbar(error.response.data, {
          variant: "error",
        });
      } else {
        console.error("An unknown error occurred", error);
        setErrorMessage("An unknown error occurred");
        enqueueSnackbar("An unknown error occurred.", {
          variant: "error",
        });
      }
      setLoadingStatus("error");
      // set({ loadingStatus: "error" });
    }
  },
}));

export default useAuthStore;
