import type React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Loader2, Mail } from "lucide-react";
import useAuthStore from "../auth_store";

export default function ForgotPasswordPage() {
  const {
    resetPasswordToken,
    loadingStatus,
    errorMessage,
    resendPasswordResetToken,
  } = useAuthStore();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedCountdown(60);
    setCanRequestNewToken(false);
    await resetPasswordToken({ email });
    setIsSubmitted(true);
  };

  const handleRequestNewToken = async () => {
    if (!canRequestNewToken) return;
    setSubmittedCountdown(60);
    setCanRequestNewToken(false);
    setIsSubmitted(true);
    resendPasswordResetToken({ email: email });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary px-4">
        <Card className="w-full max-w-md bg-gray-50 dark:bg-primary">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <Mail className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold">
              Check your email
            </CardTitle>
            <CardDescription>
              We've sent a password reset link to
              <span className="font-medium"> {email}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center text-sm text-gray-600">
            <p>
              Didn't receive the email? Check your spam folder or{" "}
              {!canRequestNewToken ? (
                <span className="text-gray-400">
                  try again in {submittedCountdown}s
                </span>
              ) : (
                <button
                  onClick={handleRequestNewToken}
                  className="text-blue-600 hover:underline pl-0.5"
                >
                  try again
                </button>
              )}
            </p>
          </CardContent>
          <CardFooter>
            <Link to="/signin" className="w-full">
              <Button variant="outline" className="w-full bg-transparent">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to sign in
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary px-4">
      <Card className="w-full max-w-md bg-gray-50 dark:bg-primary">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Forgot password?
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email address and we'll send you a link to reset your
            password
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {loadingStatus === "error" && (
              <Alert variant="destructive">
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col py-4 space-y-4">
            <Button
              type="submit"
              className="w-full"
              disabled={loadingStatus === "loading"}
            >
              {loadingStatus === "loading" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending reset link...
                </>
              ) : (
                "Send reset link"
              )}
            </Button>

            <Link to="/signin" className="w-full">
              <Button variant="outline" className="w-full bg-transparent">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to sign in
              </Button>
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
