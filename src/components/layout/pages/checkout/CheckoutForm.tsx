"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { 
  MapPin, 
  Phone, 
  FileText, 
  Loader2, 
  AlertCircle, 
  Lock,
  ShieldCheck,
  Zap
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const checkoutSchema = z.object({
  details: z.string().min(5, "Please enter a valid address (min 5 chars)"),
  phone: z
    .string()
    .regex(/^01[0-2,5]{1}[0-9]{8}$/, "Please enter a valid Egyptian phone number"),
  city: z.string().min(2, "Please enter your city"),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

interface CheckoutFormProps {
  cartId: string;
  subtotal: number;
  itemCount: number;
}

export default function CheckoutForm({ cartId, subtotal, itemCount }: CheckoutFormProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema as any),
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
  });

  const onSubmit = async (values: CheckoutFormValues) => {
    if (!session?.user?.token) {
      router.push("/signIn");
      return;
    }

    setIsLoading(true);

    try {
      const returnUrl =
        typeof window !== "undefined"
          ? `${window.location.origin}/orders/allorders`
          : "http://localhost:3000";

      const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${encodeURIComponent(returnUrl)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: session.user.token,
          },
          body: JSON.stringify({
            shippingAddress: {
              details: values.details,
              phone: values.phone,
              city: values.city,
            },
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Checkout failed. Please try again.");
      }

      // If backend returns a Stripe session URL, redirect to it
      if (data.session?.url) {
        window.location.href = data.session.url;
      } else if (data.url) {
        window.location.href = data.url;
      } else {
        router.push("/orders/allorders");
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong during checkout.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 font-['Exo']">
      
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-[#DCFCE7] rounded-xl flex items-center justify-center shrink-0">
          <MapPin className="w-5 h-5 text-[#16A34A]" />
        </div>
        <div>
          <h3 className="text-[16px] font-bold text-[#101828] leading-[24px]">Shipping Address</h3>
          <p className="text-[13px] font-medium text-[#6A7282] leading-[20px]">Where should we deliver?</p>
        </div>
      </div>

      {/* Address Details */}
      <div className="flex flex-col gap-2">
        <label className="text-[14px] font-medium text-[#364153] leading-[20px]">
          Address Details <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#99A1AF]" />
          <Input
            {...register("details")}
            placeholder="e.g. 123 Nile St, Apt 4"
            className={`h-[50px] pl-11 pr-4 border rounded-xl text-[15px] font-medium shadow-none placeholder:text-[#364153]/40 focus-visible:ring-[#16A34A] ${errors.details ? "border-red-400 bg-red-50" : "border-[#E5E7EB]"}`}
          />
        </div>
        {errors.details && (
          <p className="text-red-500 text-[12px] font-medium leading-[16px] flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> {errors.details.message}
          </p>
        )}
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-2">
        <label className="text-[14px] font-medium text-[#364153] leading-[20px]">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#99A1AF]" />
          <Input
            {...register("phone")}
            type="tel"
            placeholder="01xxxxxxxxx"
            className={`h-[50px] pl-11 pr-4 border rounded-xl text-[15px] font-medium shadow-none placeholder:text-[#364153]/40 focus-visible:ring-[#16A34A] ${errors.phone ? "border-red-400 bg-red-50" : "border-[#E5E7EB]"}`}
          />
        </div>
        {errors.phone && (
          <p className="text-red-500 text-[12px] font-medium leading-[16px] flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> {errors.phone.message}
          </p>
        )}
      </div>

      {/* City */}
      <div className="flex flex-col gap-2">
        <label className="text-[14px] font-medium text-[#364153] leading-[20px]">
          City <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#99A1AF]" />
          <Input
            {...register("city")}
            placeholder="e.g. Cairo"
            className={`h-[50px] pl-11 pr-4 border rounded-xl text-[15px] font-medium shadow-none placeholder:text-[#364153]/40 focus-visible:ring-[#16A34A] ${errors.city ? "border-red-400 bg-red-50" : "border-[#E5E7EB]"}`}
          />
        </div>
        {errors.city && (
          <p className="text-red-500 text-[12px] font-medium leading-[16px] flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> {errors.city.message}
          </p>
        )}
      </div>

      {/* Order Summary Row */}
      <div className="flex flex-col gap-3 py-4 border-t border-dashed border-[#E5E7EB]">
        <div className="flex justify-between items-center">
          <span className="text-[14px] font-medium text-[#4A5565]">Items ({itemCount})</span>
          <span className="text-[14px] font-medium text-[#101828]">{subtotal.toLocaleString()} EGP</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[14px] font-medium text-[#4A5565]">Shipping</span>
          <span className="text-[14px] font-medium text-[#16A34A]">FREE</span>
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-[#F3F4F6]">
          <span className="text-[16px] font-bold text-[#101828]">Total</span>
          <span className="text-[20px] font-bold text-[#101828]">{subtotal.toLocaleString()} EGP</span>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-[56px] bg-gradient-to-r from-[#16A34A] to-[#15803D] hover:from-[#15803D] hover:to-[#16A34A] text-white rounded-xl text-[16px] font-semibold leading-[24px] shadow-[0_10px_15px_-3px_rgba(22,163,74,0.2),0_4px_6px_-4px_rgba(22,163,74,0.2)] transition-all"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            Processing...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Confirm & Pay
          </span>
        )}
      </Button>

      {/* Trust badges */}
      <div className="flex justify-center items-center gap-4 pt-1">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#00C950]" />
          <span className="text-[12px] font-medium text-[#6A7282]">Secure Payment</span>
        </div>
        <span className="w-px h-4 bg-[#E5E7EB]" />
        <div className="flex items-center gap-1.5">
          <Zap className="w-4 h-4 text-[#2B7FFF]" />
          <span className="text-[12px] font-medium text-[#6A7282]">Fast Delivery</span>
        </div>
      </div>
    </form>
  );
}
