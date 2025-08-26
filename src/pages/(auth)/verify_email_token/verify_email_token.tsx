import {  useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import useAuthStore from "../auth_store";

type VerificationState =
  | "loading"
  | "success"
  | "invalid"
  | "expired"
  | "already-verified"|"error";

export default function VerifyEmailTokenPage() {
  const navigate = useNavigate();
  const [errorMessage,setErrorMessage]= useState("")
    const [loadingStatus, setLoadingStatus] = useState<VerificationState>("loading");
  const { token } = useParams();
  const {   verifyEmail } = useAuthStore();

  const VerifyEmail = async () => {
    await verifyEmail({ token: token,setErrorMessage:setErrorMessage, setLoadingStatus: setLoadingStatus });
  };
  window.onload = function () {
   
    VerifyEmail();
  };



  const getStateConfig = () => {
    if (!errorMessage && loadingStatus === "success") {
      return {
        icon: <CheckCircle className="h-16 w-16 text-primary" />,
        title: "Email Verified Successfully!",
        description:
          "Your email has been successfully verified. You can now access all features of your account.",
        buttonText: "Continue to Sign In",
        buttonVariant: "default" as const,
        showButton: true,
        action: navigate("/signin"),
      };
    } else if (errorMessage === "Token is not valid") {
      return {
        icon: <XCircle className="h-16 w-16 text-destructive" />,
        title: "Invalid Verification Link",
        description:
          "The verification link is not valid. Please request a new verification email.",
        buttonText: "",
        buttonVariant: "outline" as const,
        showButton: false,
      };
    } else if (errorMessage === "Token is expired") {
      return {
        icon: <Clock className="h-16 w-16 text-destructive" />,
        title: "Verification Link Expired",
        description:
          "Your verification link has expired. Please request a new verification email to continue.",
        buttonText: "Request New Verification",
        buttonVariant: "outline" as const,
        showButton: false,
        action: () => {},
      };
    } else {
      return {
        icon: (
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-muted border-t-primary" />
        ),
        title: "Verifying Email...",
        description: "Please wait while we verify your email address.",
        buttonText: "",
        buttonVariant: "default" as const,
        showButton: false,
      };
    }
  };

  const config = getStateConfig();

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-50 dark:bg-primary">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">{config.icon}</div>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold">{config.title}</CardTitle>
            <CardDescription className="text-muted-foreground">
              {config.description}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {config.showButton && (
            <Button asChild className="w-full" variant={config.buttonVariant}>
              <Link to="/sign-in">{config.buttonText}</Link>
            </Button>
          )}
          {!config.showButton && loadingStatus !== "loading" && (
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Need help? Contact our support team.
              </p>
              <Button
                asChild
                variant="outline"
                className="w-full bg-transparent"
              >
                <Link to="/sign-in">Back to Sign In</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
