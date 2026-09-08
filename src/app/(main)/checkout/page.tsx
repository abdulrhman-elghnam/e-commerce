"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import CheckoutForm from "@/components/layout/pages/checkout/CheckoutForm";
import { ShoppingBag, ArrowLeft, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getCart } from "@/lib/services/cartService";
import { toast } from "sonner";

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [cartId, setCartId] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signIn");
      return;
    }

    if (status !== "authenticated" || !session?.user?.token) return;

    const loadCart = async () => {
      setLoading(true);
      try {
        const cart = await getCart(session.user.token);
        const cartIdFromQuery =
          typeof window !== "undefined"
            ? new URLSearchParams(window.location.search).get("cartId")
            : null;
        const resolvedCartId = cartIdFromQuery || cart?.data?._id || "";

        if (!resolvedCartId) {
          toast.error("Cart not found");
          router.push("/cart");
          return;
        }

        setCartId(resolvedCartId);
        setSubtotal(cart?.data?.totalCartPrice || 0);
        setItemCount(cart?.data?.products?.length || 0);
      } catch (err: unknown) {
        toast.error(err instanceof Error ? err.message : "Failed to load checkout cart");
        router.push("/cart");
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [status, session, router]);

  return (
    <div className="min-h-screen bg-[rgba(249,250,251,0.5)] font-['Exo'] pt-[40px] md:pt-[113px] pb-[120px]">
      <div className="w-full flex justify-center">
        <div className="container max-w-[1536px] w-full px-4 lg:px-44 flex flex-col gap-8 py-8">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[14px] font-medium leading-[20px]">
            <Link href="/" className="text-[#6A7282] hover:text-[#101828] transition-colors">Home</Link>
            <span className="text-[#6A7282]">/</span>
            <Link href="/cart" className="text-[#6A7282] hover:text-[#101828] transition-colors">Cart</Link>
            <span className="text-[#6A7282]">/</span>
            <span className="text-[#101828]">Checkout</span>
          </nav>

          {/* Page Header */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#16A34A] to-[#15803D] rounded-xl flex items-center justify-center shrink-0 shadow">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-[28px] font-bold text-[#101828] leading-[36px]">Secure Checkout</h1>
              <p className="text-[14px] font-medium text-[#6A7282] leading-[20px]">Complete your order by filling in the details below</p>
            </div>
          </div>

          {/* Main Grid */}
          <div className="flex flex-col lg:flex-row gap-8 items-start w-full">

            {/* Left — Checkout Form Card */}
            <div className="flex-1 bg-white border border-[#F3F4F6] rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] p-8 w-full">
              {loading ? (
                <div className="py-16 flex items-center justify-center">
                  <Loader2 className="w-8 h-8 animate-spin text-[#16A34A]" />
                </div>
              ) : (
                <CheckoutForm
                  cartId={cartId}
                  subtotal={subtotal}
                  itemCount={itemCount}
                />
              )}
            </div>

            {/* Right — Tips Card */}
            <div className="w-full lg:w-[360px] shrink-0 flex flex-col gap-4">
              <div className="bg-white border border-[#F3F4F6] rounded-2xl shadow-sm p-6 flex flex-col gap-4">
                <h3 className="text-[16px] font-bold text-[#101828] leading-[24px]">Need Help?</h3>
                <ul className="flex flex-col gap-3">
                  {[
                    { title: "Free Returns", desc: "Return within 30 days" },
                    { title: "Secure Payments", desc: "256-bit SSL encryption" },
                    { title: "24/7 Support", desc: "Always here to help" },
                  ].map((tip) => (
                    <li key={tip.title} className="flex flex-col gap-0.5">
                      <span className="text-[14px] font-semibold text-[#101828]">{tip.title}</span>
                      <span className="text-[13px] font-medium text-[#6A7282]">{tip.desc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Back to Cart */}
              <Link href="/cart" className="group flex items-center gap-2 text-[#6A7282] hover:text-[#101828] transition-colors text-[14px] font-medium">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
