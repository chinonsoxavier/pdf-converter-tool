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
import { cn } from "@/lib/utils";

export default function VerifyEmailPage() {
  const { userAuthEmail, loadingStatus,resendEmailVerificationToken } = useAuthStore();
  const [isResending, setIsResending] = useState(false);
      const [canRequestNewToken, setCanRequestNewToken] = useState(true);
  const [submittedCountdown, setSubmittedCountdown] = useState(0);
  useEffect(() => {
    let interval: number;
    if (submittedCountdown > 0) {
      interval = setInterval(() => {
        setSubmittedCountdown((prev) => {
          if (prev <= 1) {
            setCanRequestNewToken(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [submittedCountdown]);

  const email = userAuthEmail;

    const handleResendToken = async () => {
        setIsResending(true);
        if (!canRequestNewToken) return;
        await resendEmailVerificationToken({ email: email });
   setSubmittedCountdown(60);
   setCanRequestNewToken(false);
        setIsResending(false);
        alert("hxdbahjx")
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary px-4">
      <Card className="w-full max-w-md bg-gray-50 dark:bg-primary">
        <CardHeader className="text-center space-y-4">
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

        <CardContent className="space-y-6">
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
         
            <ul className="text-sm text-muted-foreground space-y-1 ml-6">
              <li>• Check your spam or junk folder</li>
              <li>• Make sure the email address is correct</li>
              <li>• Wait a few minutes for the email to arrive</li>
            </ul>
          </div>

          {loadingStatus === "success" && isResending  ? (
            <div
              className={`p-3 rounded-lg text-sm bg-green-50 text-green-700 border border-green-200"
              }`}
            >
              Verification email sent successfully!
            </div>
                  )
                      :
                      <div className="space-y-3">
                          {submittedCountdown > 0 ? (
                              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
                          <span>Didn't receive the email?</span>
                          <span onClick={canRequestNewToken ? handleResendToken : undefined} className={cn(canRequestNewToken ? 'text-primary-foreground cursor-pointer' : 'text-red-500 cursor-not-allowed')} > try again {submittedCountdown > 1 && 'in '+ (submittedCountdown === 0 ? '' : submittedCountdown) }</span>
            </div>)
                              :
            <Button
              onClick={handleResendToken}
              disabled={submittedCountdown > 0 || loadingStatus === 'loading'}
            //   variant="outline"
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
                          }
                          

            <div className="text-center">
              <Link
                to="/signin"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Back to sign inn
              </Link>
            </div>
          </div>
        }
        </CardContent>
      </Card>
    </div>
  );
}
