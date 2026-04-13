"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Mail,
  KeyRound,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

type Step = "email" | "code" | "reset";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Step 1: Send reset code to email
  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }
    setIsLoading(true);

    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to send reset code");
        return;
      }

      toast.success("Reset code sent! Check your email inbox.");
      setStep("code");
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify reset code
  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetCode.trim()) {
      toast.error("Please enter the reset code");
      return;
    }
    setIsLoading(true);

    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ resetCode }),
        }
      );
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Invalid or expired reset code");
        return;
      }

      toast.success("Code verified! Set your new password.");
      setStep("reset");
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 3: Reset password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setIsLoading(true);

    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, newPassword }),
        }
      );
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to reset password");
        return;
      }

      toast.success("Password reset successfully! Redirecting to sign in...");
      setTimeout(() => router.push("/signin"), 2000);
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const stepConfig = {
    email: {
      title: "Forgot Password",
      subtitle: "Enter your email and we'll send you a reset code",
      icon: Mail,
      iconBg: "bg-[#DCFCE7]",
      iconColor: "text-[#16A34A]",
    },
    code: {
      title: "Verify Reset Code",
      subtitle: "Enter the 6-digit code we sent to your email",
      icon: KeyRound,
      iconBg: "bg-[#FEF3C6]",
      iconColor: "text-[#E17100]",
    },
    reset: {
      title: "Set New Password",
      subtitle: "Choose a strong password for your account",
      icon: Lock,
      iconBg: "bg-[#DCFCE7]",
      iconColor: "text-[#16A34A]",
    },
  };

  const current = stepConfig[step];
  const CurrentIcon = current.icon;

  return (
    <div className="min-h-screen bg-gray-50/50 flex items-center justify-center p-4 md:p-8 font-['Exo']">
      <div className="w-full max-w-[480px]">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {(["email", "code", "reset"] as Step[]).map((s, i) => (
            <React.Fragment key={s}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold transition-colors ${
                  step === s
                    ? "bg-[#16A34A] text-white"
                    : (["email", "code", "reset"].indexOf(step) > i)
                    ? "bg-[#DCFCE7] text-[#16A34A]"
                    : "bg-[#F3F4F6] text-[#99A1AF]"
                }`}
              >
                {["email", "code", "reset"].indexOf(step) > i ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  i + 1
                )}
              </div>
              {i < 2 && (
                <div
                  className={`w-12 h-0.5 rounded-full transition-colors ${
                    ["email", "code", "reset"].indexOf(step) > i
                      ? "bg-[#16A34A]"
                      : "bg-[#E5E7EB]"
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] p-8 sm:p-10">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-8">
            <div
              className={`w-16 h-16 ${current.iconBg} rounded-2xl flex items-center justify-center mb-4`}
            >
              <CurrentIcon className={`w-8 h-8 ${current.iconColor}`} />
            </div>
            <h1 className="text-[24px] font-bold text-[#101828] leading-[32px]">
              {current.title}
            </h1>
            <p className="text-[14px] font-medium text-[#6A7282] mt-1 leading-[20px]">
              {current.subtitle}
            </p>
          </div>

          {/* Step 1: Email */}
          {step === "email" && (
            <form onSubmit={handleSendCode} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-[14px] text-[#364153] font-semibold leading-[20px]">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#99A1AF]" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="h-[52px] pl-12 rounded-xl border-2 border-[#E5E7EB] text-[16px] placeholder:text-[#364153]/50 focus-visible:ring-1 focus-visible:ring-[#16A34A] focus-visible:border-[#16A34A]"
                  />
                </div>
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-[52px] bg-[#16A34A] hover:bg-[#15803D] text-white rounded-xl text-[16px] font-semibold shadow-[0_10px_15px_-3px_rgba(22,163,74,0.2)]"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" /> Sending...
                  </span>
                ) : (
                  "Send Reset Code"
                )}
              </Button>
            </form>
          )}

          {/* Step 2: Verify Code */}
          {step === "code" && (
            <form onSubmit={handleVerifyCode} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-[14px] text-[#364153] font-semibold leading-[20px]">
                  Reset Code
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#99A1AF]" />
                  <Input
                    type="text"
                    value={resetCode}
                    onChange={(e) => setResetCode(e.target.value)}
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                    className="h-[52px] pl-12 rounded-xl border-2 border-[#E5E7EB] text-[16px] font-mono tracking-[0.3em] text-center placeholder:tracking-normal placeholder:font-sans placeholder:text-[#364153]/50 focus-visible:ring-1 focus-visible:ring-[#16A34A] focus-visible:border-[#16A34A]"
                  />
                </div>
                <p className="text-[12px] font-medium text-[#6A7282]">
                  Code sent to <span className="text-[#101828] font-semibold">{email}</span>
                </p>
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-[52px] bg-[#16A34A] hover:bg-[#15803D] text-white rounded-xl text-[16px] font-semibold shadow-[0_10px_15px_-3px_rgba(22,163,74,0.2)]"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" /> Verifying...
                  </span>
                ) : (
                  "Verify Code"
                )}
              </Button>
              <button
                type="button"
                onClick={() => setStep("email")}
                className="text-[14px] font-medium text-[#16A34A] hover:underline text-center"
              >
                Didn&apos;t receive code? Try again
              </button>
            </form>
          )}

          {/* Step 3: New Password */}
          {step === "reset" && (
            <form onSubmit={handleResetPassword} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-[14px] text-[#364153] font-semibold leading-[20px]">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#99A1AF]" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter your new password"
                    className="h-[52px] pl-12 pr-12 rounded-xl border-2 border-[#E5E7EB] text-[16px] placeholder:text-[#364153]/50 focus-visible:ring-1 focus-visible:ring-[#16A34A] focus-visible:border-[#16A34A]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#99A1AF] hover:text-[#364153] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-[12px] font-medium text-[#6A7282]">
                  Must be at least 6 characters
                </p>
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-[52px] bg-[#16A34A] hover:bg-[#15803D] text-white rounded-xl text-[16px] font-semibold shadow-[0_10px_15px_-3px_rgba(22,163,74,0.2)]"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" /> Resetting...
                  </span>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </form>
          )}

          {/* Back to Sign In */}
          <div className="mt-8 pt-6 border-t border-[#F3F4F6] text-center">
            <Link
              href="/signin"
              className="inline-flex items-center gap-2 text-[14px] font-medium text-[#6A7282] hover:text-[#16A34A] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Sign In
            </Link>
          </div>

          {/* Trust badge */}
          <div className="flex items-center justify-center gap-2 mt-4 text-[12px] font-medium text-[#99A1AF]">
            <ShieldCheck className="w-4 h-4" />
            <span>Your data is securely encrypted</span>
          </div>
        </div>
      </div>
    </div>
  );
}
