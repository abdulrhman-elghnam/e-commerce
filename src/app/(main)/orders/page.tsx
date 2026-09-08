"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  CreditCard,
  ArrowLeft,
  Loader2,
  ShoppingBag,
  AlertCircle,
} from "lucide-react";

interface CartItem {
  count: number;
  price: number;
  product: {
    _id: string;
    title: string;
    category?: { name: string };
    imageCover?: string;
  };
}

interface Order {
  _id: string;
  id: number;
  cartItems: CartItem[];
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
  shippingAddress?: {
    details?: string;
    phone?: string;
    city?: string;
  };
}

function getStatusInfo(order: Order) {
  if (order.isDelivered) {
    return {
      label: "Delivered",
      color: "text-[#008236]",
      bg: "bg-[#F0FDF4]",
      dot: "bg-[#00C950]",
      icon: CheckCircle2,
    };
  }
  if (order.isPaid) {
    return {
      label: "Shipped",
      color: "text-[#1D4ED8]",
      bg: "bg-blue-50",
      dot: "bg-blue-500",
      icon: Truck,
    };
  }
  return {
    label: "Processing",
    color: "text-[#E17100]",
    bg: "bg-orange-50",
    dot: "bg-orange-500",
    icon: Clock,
  };
}

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
      return;
    }

    if (status !== "authenticated" || !session?.user?.id) return;

    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://ecommerce.routemisr.com/api/v1/orders/user/${session.user.id}`
        );
        const data = await res.json();

        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          setOrders([]);
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to load orders";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [status, session, router]);

  return (
    <div className="min-h-screen bg-[rgba(249,250,251,0.5)] font-['Exo'] pt-[40px] md:pt-[113px] pb-[120px]">
      <div className="w-full flex justify-center">
        <div className="container max-w-[1536px] w-full px-4 lg:px-44 flex flex-col gap-8 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[14px] font-medium leading-[20px]">
            <Link
              href="/"
              className="text-[#6A7282] hover:text-[#101828] transition-colors"
            >
              Home
            </Link>
            <span className="text-[#6A7282]">/</span>
            <span className="text-[#101828]">My Orders</span>
          </nav>

          {/* Page Header */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#16A34A] to-[#15803D] rounded-xl flex items-center justify-center shrink-0 shadow">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-[28px] font-bold text-[#101828] leading-[36px]">
                My Orders
              </h1>
              <p className="text-[14px] font-medium text-[#6A7282] leading-[20px]">
                Track and manage your recent orders
              </p>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <Loader2 className="w-10 h-10 text-[#16A34A] animate-spin" />
              <p className="text-[#6A7282] text-[16px] font-medium">
                Loading your orders...
              </p>
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-4">
              <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
              <div>
                <p className="text-[14px] font-semibold">{error}</p>
                <p className="text-[13px] font-medium mt-1">
                  Please try refreshing the page or check back later.
                </p>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && orders.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 gap-5">
              <div className="w-20 h-20 bg-[#F3F4F6] rounded-full flex items-center justify-center">
                <ShoppingBag className="w-10 h-10 text-[#99A1AF]" />
              </div>
              <div className="text-center">
                <h3 className="text-[20px] font-bold text-[#101828]">
                  No orders yet
                </h3>
                <p className="text-[14px] font-medium text-[#6A7282] mt-1">
                  Looks like you haven&apos;t placed any orders. Start shopping!
                </p>
              </div>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-[#16A34A] hover:bg-[#15803D] text-white px-6 py-3 rounded-xl text-[14px] font-semibold transition-colors shadow-[0_10px_15px_-3px_rgba(22,163,74,0.2)]"
              >
                <ShoppingBag className="w-4 h-4" /> Browse Products
              </Link>
            </div>
          )}

          {/* Orders List */}
          {!loading && !error && orders.length > 0 && (
            <div className="flex flex-col gap-5">
              {orders.map((order) => {
                const statusInfo = getStatusInfo(order);
                const StatusIcon = statusInfo.icon;
                const dateStr = new Date(order.createdAt).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }
                );

                return (
                  <div
                    key={order._id}
                    className="bg-white border border-[#F3F4F6] rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] overflow-hidden hover:shadow-md transition-shadow"
                  >
                    {/* Order Header Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-4 bg-[#F9FAFB] border-b border-[#F3F4F6]">
                      <div className="flex items-center gap-3">
                        <span className="text-[14px] font-medium text-[#6A7282]">
                          Order
                        </span>
                        <span className="text-[14px] font-bold text-[#101828] font-mono">
                          #{order.id}
                        </span>
                        <span className="text-[#D1D5DC]">·</span>
                        <span className="text-[13px] font-medium text-[#99A1AF]">
                          {dateStr}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        {/* Payment badge */}
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F3F4F6] rounded-full text-[12px] font-medium text-[#4A5565]">
                          <CreditCard className="w-3.5 h-3.5" />
                          {order.paymentMethodType === "card"
                            ? "Credit Card"
                            : "Cash on Delivery"}
                        </span>
                        {/* Status badge */}
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-medium ${statusInfo.bg} ${statusInfo.color}`}
                        >
                          <StatusIcon className="w-3.5 h-3.5" />
                          {statusInfo.label}
                        </span>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="px-6 py-4 flex flex-col divide-y divide-[#F3F4F6]">
                      {order.cartItems.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-4 py-3 first:pt-0 last:pb-0"
                        >
                          {/* Thumbnail */}
                          <div className="relative w-14 h-14 bg-[#F9FAFB] border border-[#F3F4F6] rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                            {item.product?.imageCover ? (
                              <Image
                                src={item.product.imageCover}
                                alt={item.product.title}
                                fill
                                sizes="56px"
                                className="object-contain"
                              />
                            ) : (
                              <Package className="w-5 h-5 text-[#99A1AF]" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[14px] font-medium text-[#101828] leading-[20px] truncate">
                              {item.product?.title || "Product"}
                            </p>
                            <p className="text-[12px] font-medium text-[#99A1AF]">
                              Qty: {item.count} × {item.price.toLocaleString()}{" "}
                              EGP
                            </p>
                          </div>
                          <span className="text-[14px] font-semibold text-[#101828] shrink-0">
                            {(item.count * item.price).toLocaleString()} EGP
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Order Footer */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-4 border-t border-[#F3F4F6] bg-white">
                      {order.shippingAddress?.city && (
                        <span className="text-[13px] font-medium text-[#6A7282] flex items-center gap-1.5">
                          <Truck className="w-4 h-4 text-[#99A1AF]" />
                          Shipping to{" "}
                          <span className="text-[#101828] font-semibold">
                            {order.shippingAddress.city}
                          </span>
                        </span>
                      )}
                      <div className="flex items-center gap-2">
                        <span className="text-[14px] font-medium text-[#6A7282]">
                          Total:
                        </span>
                        <span className="text-[18px] font-bold text-[#101828]">
                          {order.totalOrderPrice.toLocaleString()} EGP
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Bottom Nav */}
          <div className="pt-4">
            <Link
              href="/shop"
              className="group inline-flex items-center gap-2 text-[#6A7282] hover:text-[#101828] transition-colors text-[14px] font-medium"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
