import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertCircle, Eye, EyeOff, Lock, Loader2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import useAuthStore from "../auth_store";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const [newPassword, setPassword] = useState("");
  const [ComfirmNewPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const {changePassword,loadingStatus,errorMessage } = useAuthStore();

    
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
     await changePassword({ newPassword, ComfirmNewPassword, token });
  };

  if (loadingStatus==='success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary p-4">
        <Card className="w-full max-w-md  bg-gray-50 dark:bg-primary">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
              <CheckCircle className="h-6 w-6 text-accent" />
            </div>
            <CardTitle className="text-2xl font-semibold">
              Password Reset Successful
            </CardTitle>
            <CardDescription>
              Your newPassword has been successfully updated. You can now log in
              with your new newPassword.
            </CardDescription>
          </CardHeader>                                                                                                                                      
          <CardContent>                                                                                            
            <Button
              className="w-full"
              onClick={() => (window.location.href = "/signin")}
            >
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary p-4">
      <Card className="w-full max-w-md  bg-gray-50 dark:bg-primary">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-semibold">
            Reset Your Password
          </CardTitle>
          <CardDescription>
            Enter your new newPassword below to complete the reset process.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loadingStatus === "error" ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showPassword ? "text" : "newPassword"}
                    value={newPassword}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your new newPassword"
                    required
                    minLength={8}
                    className="pr-10"
                  />                                                                                    
                  <Button
                    type="button"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (                 
                      <EyeOff className="h-4 w-4 text-primary-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-primary-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ComfirmNewPassword">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="ComfirmNewPassword"
                    type={showConfirmPassword ? "text" : "newPassword"}
                    value={ComfirmNewPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your new newPassword"
                    required
                    minLength={8}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loadingStatus === "loading"}
              >
                {loadingStatus === "loading" ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Resetting Password...
                  </>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </form>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {loadingStatus === "error" ? (
                <Link
                  to="/forgot-password"
                  className="text-accent hover:underline"
                >
                  Reset password
                </Link>
              ) : (
                <span>
                  <span>Remembered password? </span>
                  <Link to="/signin" className="text-accent hover:underline">
                    Sign in
                  </Link>
                </span>
              )}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
