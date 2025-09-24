"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth-context";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SignupFormProps {
  onSuccess?: () => void;
  initialData?: {
    country?: string;
    fieldOfStudy?: string;
    budget?: string;
  };
}

export function SignupForm({ onSuccess, initialData }: SignupFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    country: initialData?.country || "",
    fieldOfStudy: initialData?.fieldOfStudy || "",
    budget: initialData?.budget || "",
  });

  // Update form data when initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        country: initialData.country || prev.country,
        fieldOfStudy: initialData.fieldOfStudy || prev.fieldOfStudy,
        budget: initialData.budget || prev.budget,
      }));
    }
  }, [initialData]);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signup, signupWithGoogle } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signup(formData);
      toast({
        title: "Welcome to PGadmit!",
        description: "Your account has been created successfully.",
      });
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Signup failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    try {
      await signupWithGoogle();
      toast({
        title: "Welcome to PGadmit!",
        description: "Your account has been created successfully with Google.",
      });
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Google signup failed",
        description: "Please try again or use email signup.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full space-y-4 transition-all duration-300 ease-in-out flex-1">
      {/* Google Signup */}
      <Button
        type="button"
        variant="outline"
        className="w-full bg-transparent transition-all duration-300 ease-in-out hover:bg-accent/10 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
        onClick={handleGoogleSignup}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <svg className="mr-2 h-4 w-4 cursor-pointer" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
        )}
        Continue with Google
      </Button>

      <div className="relative transition-all duration-300 ease-in-out">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t transition-all duration-300 ease-in-out hover:border-primary/30" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground transition-all duration-300 ease-in-out hover:text-primary/70 cursor-default">
            Or continue with email
          </span>
        </div>
      </div>

      {/* Email Signup Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col flex-1 space-y-3 transition-all duration-300 ease-in-out h-full"
      >
        <div className="space-y-2 transition-all duration-300 ease-in-out">
          <Label
            htmlFor="name"
            className="transition-all duration-300 ease-in-out hover:text-primary/70"
          >
            Full Name
          </Label>
          <Input
            id="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="transition-all duration-300 ease-in-out focus:ring-2 focus:ring-primary/20 cursor-text"
            required
          />
        </div>

        <div className="space-y-2 transition-all duration-300 ease-in-out">
          <Label
            htmlFor="email"
            className="transition-all duration-300 ease-in-out hover:text-primary/70"
          >
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="transition-all duration-300 ease-in-out focus:ring-2 focus:ring-primary/20 cursor-text"
            required
          />
        </div>

        <div className="space-y-2 transition-all duration-300 ease-in-out">
          <Label
            htmlFor="password"
            className="transition-all duration-300 ease-in-out hover:text-primary/70"
          >
            Password
          </Label>
          <div className="relative transition-all duration-300 ease-in-out">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="transition-all duration-300 ease-in-out focus:ring-2 focus:ring-primary/20 cursor-text"
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent transition-all duration-300 ease-in-out hover:scale-110 active:scale-95 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 transition-all duration-300 ease-in-out hover:rotate-12 cursor-pointer" />
              ) : (
                <Eye className="h-4 w-4 transition-all duration-300 ease-in-out hover:rotate-12 cursor-pointer" />
              )}
            </Button>
          </div>
        </div>

        <div className="mt-auto pt-6">
          <Button
            type="submit"
            className="w-full transition-all duration-300 ease-in-out hover:scale-[1.02] active:scale-[0.98] disabled:scale-100 cursor-pointer"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Account
          </Button>
        </div>
      </form>
    </div>
  );
}
