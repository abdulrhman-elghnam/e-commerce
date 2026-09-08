"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { signIn } from 'next-auth/react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema, SignInFormValues } from './schema';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Mail, Lock, Eye, EyeOff, ShieldCheck, Users, Star, Loader2, AlertCircle } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaCheck } from 'react-icons/fa';
import cartImage from '@/assets/images/2e5810ff3e-e750761ebcd4ae5907db.png';

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: SignInFormValues) => {
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error(result.error);
        return;
      }

      if (result?.ok) {
        toast.success("Signed in successfully");
        router.push("/");
        router.refresh();
      }
    } catch {
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-gray-50/50">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 max-w-7xl w-full mx-auto font-['Exo']">
        
        {/* Left Side: Image and Details */}
        <div className="hidden lg:flex flex-col items-center max-w-[616px] w-full gap-6">
          <div className="w-full h-[384px] relative rounded-2xl overflow-hidden shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)]">
            <Image 
              src={cartImage} 
              alt="Fresh vegetables and fruits shopping cart" 
              fill 
              className="object-cover"
              priority
            />
          </div>
          
          <div className="flex flex-col items-center gap-4 text-center mt-2">
            <h2 className="text-[#1E2939] text-[30px] leading-[36px] font-bold">
              FreshCart - Your One-Stop Shop for Fresh Products
            </h2>
            <p className="text-[#4A5565] text-[18px] leading-[28px] font-medium max-w-[586px]">
              Join thousands of happy customers who trust FreshCart for their daily grocery needs
            </p>
          </div>

          <div className="flex items-center gap-8 mt-2">
            <div className="flex items-center gap-2">
              <div className="bg-[#16A34A] rounded-full p-1 flex items-center justify-center">
                <FaCheck className="text-white w-3 h-3" />
              </div>
              <span className="text-[#6A7282] text-[14px] font-medium leading-[20px]">Free Delivery</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="bg-[#16A34A] rounded-full p-1 flex items-center justify-center">
                <FaCheck className="text-white w-3 h-3" />
              </div>
              <span className="text-[#6A7282] text-[14px] font-medium leading-[20px]">Secure Payment</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-[#16A34A] rounded-full p-1 flex items-center justify-center">
                <FaCheck className="text-white w-3 h-3" />
              </div>
              <span className="text-[#6A7282] text-[14px] font-medium leading-[20px]">24/7 Support</span>
            </div>
          </div>
        </div>

        {/* Right Side: Sign In Form */}
        <div className="bg-white rounded-2xl w-full max-w-[616px] shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] py-12 px-6 sm:px-12 relative flex flex-col">
          
          {/* Header */}
          <div className="flex flex-col items-center mb-10 text-center">
            <span className="text-[#16A34A] text-[30px] leading-[36px] font-bold mb-4">
              FreshCart
            </span>
            <h1 className="text-[#1E2939] text-[24px] leading-[32px] font-bold mb-2">
              Welcome Back!
            </h1>
            <p className="text-[#4A5565] text-[16px] leading-[24px] font-medium">
              Sign in to continue your fresh shopping experience
            </p>
          </div>

          {/* Social Login */}
          <div className="flex flex-col gap-3 mb-8">
            <button className="flex items-center justify-center w-full gap-3 h-[52px] rounded-xl border-2 border-[#E5E7EB] hover:bg-gray-50 transition-colors">
              <FcGoogle className="w-[20px] h-[20px]" />
              <span className="text-[#364153] text-[16px] leading-[24px] font-medium">Continue with Google</span>
            </button>
            <button className="flex items-center justify-center w-full gap-3 h-[52px] rounded-xl border-2 border-[#E5E7EB] hover:bg-gray-50 transition-colors">
              <FaFacebook className="w-[20px] h-[20px] text-[#155DFC]" />
              <span className="text-[#364153] text-[16px] leading-[24px] font-medium">Continue with Facebook</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center w-full mb-8">
            <div className="absolute w-full h-px bg-[#E5E7EB]"></div>
            <span className="bg-white px-4 text-[#6A7282] text-[14px] leading-[20px] font-medium z-10 uppercase">
              Or continue with email
            </span>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
            
            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-[#364153] text-[14px] leading-[20px] font-semibold">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#99A1AF]" />
                <Input 
                  {...register("email")}
                  placeholder="Enter your email"
                  className={`h-[52px] pl-12 rounded-xl border-2 text-[#364153] text-[16px] placeholder:text-[#364153]/50 focus-visible:ring-1 focus-visible:ring-[#16A34A] focus-visible:border-[#16A34A] ${errors.email ? 'border-red-400 bg-red-50/30' : 'border-[#E5E7EB]'}`}
                />
              </div>
              {errors.email && (
                <span className="text-red-500 text-xs font-medium flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.email.message}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-[#364153] text-[14px] leading-[20px] font-semibold">
                  Password
                </label>
                <Link href="/forgot-password" className="text-[#16A34A] text-[14px] leading-[20px] font-medium hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#99A1AF]" />
                <Input 
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`h-[52px] pl-12 pr-12 rounded-xl border-2 text-[#364153] text-[16px] placeholder:text-[#364153]/50 focus-visible:ring-1 focus-visible:ring-[#16A34A] focus-visible:border-[#16A34A] ${errors.password ? 'border-red-400 bg-red-50/30' : 'border-[#E5E7EB]'}`}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#99A1AF] hover:text-[#364153] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <span className="text-red-500 text-xs font-medium flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.password.message}
                </span>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-3">
              <Controller
                name="rememberMe"
                control={control}
                render={({ field }) => (
                  <Checkbox 
                    id="rememberMe" 
                    checked={field.value} 
                    onCheckedChange={field.onChange}
                    className="w-4 h-4 rounded-[2.5px] border-[#767676]" 
                  />
                )}
              />
              <label htmlFor="rememberMe" className="text-[#364153] text-[14px] leading-[20px] font-medium cursor-pointer select-none">
                Keep me signed in
              </label>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full h-[52px] bg-[#16A34A] hover:bg-[#15803D] text-white rounded-xl shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)] text-[18px] leading-[28px] font-semibold mt-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          {/* Footer Area */}
          <div className="flex flex-col items-center mt-8 pt-6 border-t border-[#F3F4F6]">
            <div className="flex items-center gap-2 mb-8">
              <span className="text-[#4A5565] text-[16px] leading-[24px] font-medium">New to FreshCart?</span>
              <Link href="/signup" className="text-[#16A34A] text-[16px] leading-[24px] font-semibold hover:underline">
                Create an account
              </Link>
            </div>

            {/* Bottom Safe Badges */}
            <div className="flex items-center justify-center flex-wrap gap-6 text-[#6A7282] text-[12px] font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>50K+ Users</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                <span>4.9 Rating</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
