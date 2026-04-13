"use client";

import React, { useState } from 'react';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { signIn } from 'next-auth/react';
import { registerSchema, RegisterFormValues } from './schema';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Star, ShieldCheck, Zap, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import Link from 'next/link';

export default function SignUpPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
      terms: false,
    },
  });

  const passwordVal = watch("password") || "";

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          rePassword: data.rePassword,
          phone: data.phone,
        }),
      });

      const resData = await res.json();

      if (!res.ok) {
        const errorMsg = resData.errors?.msg || (resData.message === "fail" ? "Registration failed. Please try again." : resData.message) || "Registration failed. Please try again.";
        toast.error(errorMsg);
        return;
      }

      // Auto sign-in after successful registration
      const signInResult = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (signInResult?.ok) {
        toast.success("Account created successfully!");
        router.push("/");
        router.refresh();
      } else {
        toast.success("Account created. Please sign in.");
        router.push("/signin");
      }
    } catch (err: any) {
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-[1280px] w-full flex flex-col lg:flex-row gap-12 items-start justify-center">
        
        {/* Left Section: Information */}
        <div className="flex flex-col items-start gap-8 w-full max-w-[600px] lg:flex-1 py-8 lg:py-16">
          <div className="flex flex-col gap-2">
            <h1 className="font-['Exo'] font-bold text-4xl leading-[40px] text-[#364153]">
              Welcome to FreshCart
            </h1>
            <p className="font-['Exo'] font-medium text-xl leading-[28px] text-[#364153]">
              Join thousands of happy customers who enjoy fresh groceries delivered right to their doorstep.
            </p>
          </div>

          <ul className="flex flex-col py-6 gap-6 w-full">
            <li className="flex flex-row items-start gap-4">
              <div className="w-12 h-12 bg-[#BBF7D0] rounded-full flex items-center justify-center shrink-0">
                <CheckCircle2 className="text-[#16A34A]" size={24} strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <h2 className="font-['Exo'] font-semibold text-lg text-[#364153] leading-7">
                  Premium Quality
                </h2>
                <p className="font-['Exo'] font-medium text-base text-[#4A5565] leading-6">
                  Premium quality products sourced from trusted suppliers.
                </p>
              </div>
            </li>

            <li className="flex flex-row items-start gap-4">
              <div className="w-12 h-12 bg-[#BBF7D0] rounded-full flex items-center justify-center shrink-0">
                <Zap className="text-[#16A34A]" size={24} strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <h2 className="font-['Exo'] font-semibold text-lg text-[#364153] leading-7">
                  Fast Delivery
                </h2>
                <p className="font-['Exo'] font-medium text-base text-[#4A5565] leading-6">
                  Same-day delivery available in most areas
                </p>
              </div>
            </li>

            <li className="flex flex-row items-start gap-4">
              <div className="w-12 h-12 bg-[#BBF7D0] rounded-full flex items-center justify-center shrink-0">
                <ShieldCheck className="text-[#16A34A]" size={24} strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <h2 className="font-['Exo'] font-semibold text-lg text-[#364153] leading-7">
                  Secure Shopping
                </h2>
                <p className="font-['Exo'] font-medium text-base text-[#4A5565] leading-6">
                  Your data and payments are completely secure
                </p>
              </div>
            </li>
          </ul>

          <div className="flex flex-col p-4 gap-4 w-full bg-white shadow-sm rounded-md border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-[#16A34A] text-white flex items-center justify-center font-bold text-lg">
                  SJ
                </div>
              </div>
              <div className="flex flex-col">
                <h3 className="font-['Exo'] font-medium text-base text-[#364153] leading-6">
                  Sarah Johnson
                </h3>
                <div className="flex gap-1 py-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-[#FFDF20] text-[#FFDF20]" />
                  ))}
                </div>
              </div>
            </div>
            <p className="font-['Exo'] italic font-medium text-base text-[#4A5565] leading-6">
              &quot;FreshCart has transformed my shopping experience. The quality of the products is outstanding, and the delivery is always on time. Highly recommend!&quot;
            </p>
          </div>
        </div>

        {/* Right Section: Form */}
        <div className="bg-white shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),_0px_4px_6px_-4px_rgba(0,0,0,0.1)] rounded-2xl w-full max-w-[600px] p-6 sm:p-10 flex flex-col gap-2">
          <div className="flex flex-col items-center">
            <h2 className="font-['Exo'] font-semibold text-[30px] leading-9 text-[#364153] text-center">
              Create Your Account
            </h2>
            <p className="font-['Exo'] font-medium text-base leading-6 text-[#364153] text-center">
              Start your fresh journey with us today
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 py-8">
            <button className="flex-1 flex items-center justify-center gap-2 py-2 px-4 border border-[#D1D5DC] rounded-lg hover:bg-gray-50 transition-colors">
              <FcGoogle size={20} />
              <span className="font-['Exo'] font-semibold text-base text-[#101828]">Google</span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-2 px-4 border border-[#D1D5DC] rounded-lg hover:bg-gray-50 transition-colors">
              <FaFacebook size={20} className="text-[#155DFC]" />
              <span className="font-['Exo'] font-semibold text-base text-[#101828]">Facebook</span>
            </button>
          </div>

          <div className="relative flex items-center py-2 mb-4">
            <div className="flex-grow border-t border-[#D1D5DC] opacity-30"></div>
            <span className="flex-shrink-0 bg-white px-4 font-['Exo'] font-medium text-base text-[#364153]">or</span>
            <div className="flex-grow border-t border-[#D1D5DC] opacity-30"></div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full">
            <div className="flex flex-col gap-2">
              <label className="font-['Exo'] font-medium text-base text-[#364153]">Name*</label>
              <Input
                {...register("name")}
                placeholder="Ali"
                className={`h-[42px] border-[#99A1AF]/40 rounded-md placeholder:text-[#364153]/50 focus-visible:ring-1 focus-visible:ring-[#16A34A] focus-visible:border-[#16A34A] ${errors.name ? 'border-red-500 bg-red-50/30' : ''}`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.name.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-['Exo'] font-medium text-base text-[#364153]">Email*</label>
              <Input
                {...register("email")}
                type="email"
                placeholder="ali@example.com"
                className={`h-[42px] border-[#99A1AF]/40 rounded-md placeholder:text-[#364153]/50 focus-visible:ring-1 focus-visible:ring-[#16A34A] focus-visible:border-[#16A34A] ${errors.email ? 'border-red-500 bg-red-50/30' : ''}`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.email.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2 relative">
              <label className="font-['Exo'] font-medium text-base text-[#364153]">Password*</label>
              <Input
                {...register("password")}
                type="password"
                placeholder="create a strong password"
                className={`h-[42px] border-[#99A1AF]/40 rounded-md placeholder:text-[#364153]/50 focus-visible:ring-1 focus-visible:ring-[#16A34A] focus-visible:border-[#16A34A] ${errors.password ? 'border-red-500 bg-red-50/30' : ''}`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.password.message}
                </p>
              )}
              
              <div className="flex items-center gap-2 mt-2">
                <div className="h-1 flex-1 bg-[#E5E7EB] rounded-full overflow-hidden">
                  <div className={`h-full transition-all ${passwordVal.length > 0 ? (passwordVal.length >= 8 ? 'bg-[#16A34A] w-full' : 'bg-red-500 w-1/3') : ''}`}></div>
                </div>
                <span className="font-['Exo'] font-medium text-sm text-[#364153] min-w-[50px]">
                  {passwordVal.length === 0 ? 'Weak' : passwordVal.length >= 8 ? 'Strong' : 'Weak'}
                </span>
              </div>
              <p className="font-['Exo'] font-medium text-xs text-[#6A7282] mt-1">
                Must be at least 8 characters with numbers and symbols
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-['Exo'] font-medium text-base text-[#364153]">Confirm Password*</label>
              <Input
                {...register("rePassword")}
                type="password"
                placeholder="confirm your password"
                className={`h-[42px] border-[#99A1AF]/40 rounded-md placeholder:text-[#364153]/50 focus-visible:ring-1 focus-visible:ring-[#16A34A] focus-visible:border-[#16A34A] ${errors.rePassword ? 'border-red-500 bg-red-50/30' : ''}`}
              />
              {errors.rePassword && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.rePassword.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-['Exo'] font-medium text-base text-[#364153]">Phone Number*</label>
              <Input
                {...register("phone")}
                placeholder="+1 234 567 8900"
                className={`h-[42px] border-[#99A1AF]/40 rounded-md placeholder:text-[#364153]/50 focus-visible:ring-1 focus-visible:ring-[#16A34A] focus-visible:border-[#16A34A] ${errors.phone ? 'border-red-500 bg-red-50/30' : ''}`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.phone.message}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 mt-2">
              <Controller
                name="terms"
                control={control}
                render={({ field }) => (
                  <Checkbox 
                    id="terms" 
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="border-[#767676] data-[state=checked]:bg-[#16A34A] data-[state=checked]:border-[#16A34A]" 
                  />
                )}
              />
              <label htmlFor="terms" className="font-['Exo'] font-medium text-base text-[#364153] cursor-pointer">
                I agree to the Terms of Service and Privacy Policy *
              </label>
            </div>
            {errors.terms && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.terms.message}
              </p>
            )}

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full h-10 mt-4 bg-[#16A34A] hover:bg-[#10833a] font-['Exo'] font-semibold text-base text-white rounded-lg shadow-sm"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating account...
                </span>
              ) : (
                'Create My Account'
              )}
            </Button>

            <div className="border-t border-[#D1D5DC] opacity-30 mt-6 pt-6 w-full"></div>
            <p className="font-['Exo'] font-medium text-base text-[#364153] text-center w-full">
              Already have an account? <Link href="/signin" className="text-[#16A34A] hover:underline font-semibold">Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
