"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import { LoginForm } from "@/components/auth/login-form";
import { SignupForm } from "@/components/auth/signup-form";

function AuthPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("login");
  const [initialData, setInitialData] = useState<{
    country?: string;
    fieldOfStudy?: string;
    budget?: string;
  }>({});

  const handleLoginSuccess = () => {
    router.push("/dashboard");
  };

  const handleSignupSuccess = () => {
    router.push("/onboarding");
  };

  useEffect(() => {
    // Get initial data from URL parameters
    const country = searchParams.get("country");
    const fieldOfStudy = searchParams.get("fieldOfStudy");
    const budget = searchParams.get("budget");

    if (country || fieldOfStudy || budget) {
      setInitialData({
        country: country || undefined,
        fieldOfStudy: fieldOfStudy || undefined,
        budget: budget || undefined,
      });
      // Switch to signup tab if we have initial data
      setActiveTab("signup");
    }
  }, [searchParams]);

  const handleBackToHome = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="w-full max-w-md py-4 sm:py-8">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-8">
          <Button
            variant="ghost"
            onClick={handleBackToHome}
            className="mb-4 text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 mr-2 cursor-pointer" />
            Back to Home
          </Button>

          <h1 className="text-2xl sm:text-3xl font-black mb-2 text-foreground">
            Welcome to PGadmit
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Join thousands of students on their study abroad journey
          </p>
        </div>

        {/* Auth Tabs */}
        <Card className="shadow-lg border-0 max-h-[calc(100vh-6rem)] sm:max-h-[calc(100vh-8rem)] overflow-y-auto">
          <CardHeader className="text-center pb-4 sticky top-0 bg-card z-10">
            <CardTitle className="text-2xl font-bold">Get Started</CardTitle>
          </CardHeader>
          <CardContent className="pb-6 flex flex-col h-full">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full h-full flex flex-col transition-all duration-300"
            >
              <TabsList className="grid w-full grid-cols-2 transition-all duration-200 cursor-pointer">
                <TabsTrigger
                  className="transition-all duration-200 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground cursor-pointer"
                  value="login"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger
                  className="transition-all duration-200 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground cursor-pointer"
                  value="signup"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent
                value="login"
                className="mt-4 flex-1 flex flex-col data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:slide-in-from-right-4"
              >
                <LoginForm onSuccess={handleLoginSuccess} />
              </TabsContent>

              <TabsContent
                value="signup"
                className="mt-4 flex-1 flex flex-col data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:slide-in-from-right-4"
              >
                <SignupForm
                  onSuccess={handleSignupSuccess}
                  initialData={initialData}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="w-full max-w-md py-4 sm:py-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading...</p>
            </div>
          </div>
        </div>
      }
    >
      <AuthPageContent />
    </Suspense>
  );
}
