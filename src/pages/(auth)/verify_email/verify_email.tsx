import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Clock, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import useAuthStore from "../auth_store";

export default function VerifyEmailPage() {
  const { userAuthEmail, resendEmailVerificationToken } = useAuthStore();
  const [isResending, setIsResending] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState("idle");
  const [countdown, setCountdown] = useState(0);

  // Combine countdown and canRequestNewToken logic in a single useEffect
  useEffect(() => {
    let interval: number;
    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [countdown]);

  const email = userAuthEmail;

  const handleResendToken = async () => {
    // setIsResending(true); // Indicate that the request is in progress
    // setLoadingStatus("loading"); // Start loading state

    // try {
    //   // Call the Zustand store method and await its completion
      await resendEmailVerificationToken({
        email: email,
        setLoadingStatus: setLoadingStatus,
        setIsResending: setIsResending,
        setCountdown,
      });

    //   // If the request is successful, start the countdown
      

    //   // Reset states
    //   setIsResending(false);
    //   setLoadingStatus("success");
    // } catch (error) {
    //   console.log(error)
    //   // Handle error states
    //   setIsResending(false);
    //   setLoadingStatus("error");
    // }
  };

  const canRequestNewToken = countdown === 0;

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary px-4">
      <Card className="w-full max-w-md gap-1 bg-gray-50 dark:bg-primary">
        <CardHeader className="text-center space-y2">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl font-semibold">
              Check your email
            </CardTitle>
            <CardDescription className="text-muted-foreground mt-2">
              We've sent a verification link to
              <span className="font-medium text-foreground"> {email}</span>
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-2">
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <ul className="text-sm text-muted-foreground space-y-1 ml-6">
              <li>• Check your spam or junk folder</li>
              <li>• Make sure the email address is correct</li>
              <li>• Wait a few minutes for the email to arrive</li>
            </ul>
          </div>

          {loadingStatus === "success" && countdown < 0 && (
            <div
              className={`p-3 rounded-lg text-sm bg-green-50 text-green-700 border border-green-200"}`}
            >
              Verification email sent successfully!
            </div>
          )}
          <div className="space-y-3">
            {!canRequestNewToken ? (
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>send again in {countdown} seconds</span>
              </div>
            ) : (
              <Button
                onClick={handleResendToken}
                disabled={!canRequestNewToken || isResending}
                className="w-full"
              >
                {isResending && loadingStatus==='loading' ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Resend verification email
                  </>
                )}
              </Button>
            )}
          </div>

          <div className="text-center">
            <Link
              to="/signin"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Back to sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
