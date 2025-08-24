"use client";

import { useState } from "react";
// import { useSearchParams } from "next/navigation";
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
    const {userAuthEmail } = useAuthStore();
  const [isResending, setIsResending] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const email = userAuthEmail;

  const handleResendToken = async () => {
    setIsResending(true);
    setResendMessage("");

    try {
      // Simulate API call to resend verification email
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // In a real app, you would make an API call here
      // const response = await fetch('/api/resend-verification', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // })

      setResendMessage("Verification email sent successfully!");
    } catch (error) {
        console.log(error);
      setResendMessage("Failed to resend email. Please try again.");
    } finally {
      setIsResending(false);
    }
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
              <span className="font-medium text-foreground">{email}</span>
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Didn't receive the email?</span>
            </div>
            <ul className="text-sm text-muted-foreground space-y-1 ml-6">
              <li>• Check your spam or junk folder</li>
              <li>• Make sure the email address is correct</li>
              <li>• Wait a few minutes for the email to arrive</li>
            </ul>
          </div>

          {resendMessage && (
            <div
              className={`p-3 rounded-lg text-sm ${
                resendMessage.includes("successfully")
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {resendMessage}
            </div>
          )}

          <div className="space-y-3">
            <Button
              onClick={handleResendToken}
              disabled={isResending}
              variant="outline"
              className="w-full bg-transparent"
            >
              {isResending ? (
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

            <div className="text-center">
              <Link
                to="/sign-in"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Back to sign in
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
