"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setCartCount } from '@/lib/redux/slices/cartSlice';
import { getCart, clearCart, applyCoupon, updateCartQuantity, removeCartItem } from '@/lib/services/cartService';
import { 
  ShoppingCart, 
  Check, 
  Minus, 
  Plus, 
  Trash2, 
  FileText, 
  Truck, 
  Tag, 
  Lock, 
  ShieldCheck, 
  Zap,
  ArrowLeft
} from 'lucide-react';

export default function CartPage() {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const [items, setItems] = useState<any[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [couponName, setCouponName] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [cartId, setCartId] = useState("");

  useEffect(() => {
    if (status === "authenticated" && session?.user?.token) {
      loadCart();
    } else if (status === "unauthenticated") {
      setIsLoading(false);
    }
  }, [status, session]);

  const loadCart = async () => {
    try {
      setIsLoading(true);
      const res = await getCart(session!.user!.token);
      setItems(res.data?.products || []);
      setSubtotal(res.data?.totalCartPrice || 0);
      setCartId(res.data?._id || "");
      if (res.data) {
        dispatch(setCartCount(res.data.products?.length || 0));
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to load cart");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyCoupon = async () => {
    if (!couponName.trim()) return;
    if (!session?.user?.token) {
        toast.error("Please login to apply a coupon.");
        return;
    }
    try {
      setIsApplying(true);
      const res = await applyCoupon(session.user.token, couponName);
      toast.success("Coupon applied!");
      // If the API recalculates subtotal, update it
      if (res.data?.totalCartPrice) setSubtotal(res.data.totalCartPrice);
    } catch (err: any) {
      toast.error(err.message || "Failed to apply coupon");
    } finally {
      setIsApplying(false);
    }
  };

  const handleClearCart = async () => {
    if (!session?.user?.token) return;
    try {
      setIsClearing(true);
      await clearCart(session.user.token);
      setItems([]);
      setSubtotal(0);
      dispatch(setCartCount(0));
      toast.success("Cart cleared");
    } catch (err: any) {
      toast.error(err.message || "Failed to clear cart");
    } finally {
      setIsClearing(false);
    }
  };

  const handleUpdateQuantity = async (productId: string, newCount: number) => {
    if (!session?.user?.token) return;
    if (newCount < 1) {
      // Remove item by reloading after setting count to 0
      handleRemoveItem(productId);
      return;
    }
    try {
      // Optimistic UI update
      setItems(prev => prev.map(ci =>
        ci.product._id === productId ? { ...ci, count: newCount } : ci
      ));
      const res = await updateCartQuantity(session.user.token, productId, newCount);
      if (res.data?.totalCartPrice !== undefined) {
        setSubtotal(res.data.totalCartPrice);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to update quantity");
      loadCart(); // revert on failure
    }
  };

  const handleRemoveItem = async (productId: string) => {
    if (!session?.user?.token) return;
    try {
      await removeCartItem(session.user.token, productId);
      setItems(prev => {
        const updated = prev.filter(ci => ci.product._id !== productId);
        dispatch(setCartCount(updated.length));
        return updated;
      });
      // Reload to get accurate subtotal
      const res = await getCart(session.user.token);
      setSubtotal(res.data?.totalCartPrice || 0);
      toast.success("Item removed from cart");
    } catch (err: any) {
      toast.error(err.message || "Failed to remove item");
      loadCart();
    }
  };

  const formattedSubtotal = new Intl.NumberFormat('en-US').format(subtotal);

  return (
    <div className="bg-[#F9FAFB] min-h-[1200px] w-full pt-[40px] md:pt-[113px] pb-[82px] flex justify-center font-['Exo']">
      <div className="container max-w-[1536px] w-full px-4 lg:px-44 flex flex-col gap-8">
        
        {/* Header Block */}
        <div className="flex flex-col gap-4">
          <nav className="flex items-center gap-2 text-[14px] leading-[20px] font-medium">
            <Link href="/" className="text-[#6A7282] hover:text-[#101828] transition-colors">Home</Link>
            <span className="text-[#6A7282]">/</span>
            <span className="text-[#101828]">Shopping Cart</span>
          </nav>
          
          <div className="flex items-center h-[80px]">
            <div className="flex flex-col gap-2">
              <h1 className="flex items-center gap-3 text-[30px] font-bold text-[#101828]">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#16A34A] to-[#15803D] rounded-xl shadow-sm text-white">
                  <ShoppingCart className="w-6 h-6" />
                </div>
                Shopping Cart
              </h1>
              <p className="text-[#6A7282] text-[16px] font-medium">
                {isLoading ? "Loading your cart..." : `You have ${items.length} items in your cart`}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Column - Cart Items */}
          <div className="flex flex-col gap-6 w-full lg:w-[992px] max-w-full">
            <div className="flex flex-col gap-4 w-full">
              {!isLoading && items.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 gap-4 bg-white border border-[#F3F4F6] rounded-2xl shadow-sm">
                  <ShoppingCart className="w-12 h-12 text-[#99A1AF]" />
                  <p className="text-[16px] text-[#6A7282] font-medium">Your cart is empty.</p>
                </div>
              )}
              
              {items.map((cartItem, index) => {
                const item = cartItem.product;
                return (
                  <div 
                    key={cartItem._id || index} 
                    className="relative p-5 bg-white border border-[#F3F4F6] rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] flex flex-col sm:flex-row gap-6 w-full"
                  >
                    
                    {/* Product Image Box */}
                    <div className="relative flex flex-col shrink-0 w-32 h-32 p-3 bg-gradient-to-br from-[#F9FAFB] via-white to-[#F3F4F6] border border-[#F3F4F6] rounded-xl justify-center items-center overflow-hidden">
                      {item?.imageCover ? (
                        <Image src={item.imageCover} alt={item?.title || "Product"} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                          <span className="text-xs text-center px-2">{item?.title?.substring(0, 15)}...</span>
                        </div>
                      )}
                      {cartItem.count > 0 && (
                        <div className="absolute -bottom-1 -right-1 flex items-center gap-1 bg-[#00C950] text-white text-[10px] font-semibold leading-[15px] px-2 py-[2px] rounded-full shadow-sm z-10">
                          <Check className="w-[10px] h-[10px]" strokeWidth={3} /> In Stock
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 flex flex-col justify-between z-10 bg-transparent">
                      <div className="flex flex-col gap-2 mb-3">
                        <Link href={`/categories/${item?._id}`}>
                          <h3 className="text-[18px] font-semibold leading-[29px] text-[#101828] hover:text-[#16A34A] transition-colors">
                            {item?.title || "Loading..."}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-2 h-6">
                          <span className="inline-block px-[10px] py-1 bg-gradient-to-r from-[#F0FDF4] to-[#F3F4F6] rounded-full text-[#15803D] text-[12px] font-medium leading-[16px]">
                            {item?.category?.name || "Category"}
                          </span>
                          <span className="text-[#99A1AF] text-[12px] leading-[16px]">•</span>
                          <span className="text-[#6A7282] text-[12px] font-medium leading-[16px]">
                            Brand: {item?.brand?.name || "N/A"}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-[#16A34A] text-[18px] font-bold leading-[28px]">
                          {cartItem.price} EGP
                        </span>
                        <span className="text-[#99A1AF] text-[12px] font-medium leading-[16px]">
                          per unit
                        </span>
                      </div>

                      <div className="flex flex-row flex-wrap items-center justify-between gap-4 mt-auto w-full">
                        
                        {/* Quantity Toggles */}
                        <div className="flex items-center px-1 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl h-[42px] w-[122px]">
                          <button 
                            onClick={() => handleUpdateQuantity(item._id, cartItem.count - 1)}
                            disabled={cartItem.count <= 1}
                            className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors ${cartItem.count <= 1 ? 'bg-white opacity-40 text-[#6A7282]' : 'bg-white text-[#6A7282] shadow-sm hover:text-black'}`}
                          >
                            <Minus className="w-[15px] h-[15px]" />
                          </button>
                          <span className="w-12 text-center text-[#101828] text-[16px] font-bold leading-[24px]">
                            {cartItem.count}
                          </span>
                          <button 
                            onClick={() => handleUpdateQuantity(item._id, cartItem.count + 1)}
                            className="flex items-center justify-center w-8 h-8 bg-[#16A34A] text-white rounded-lg shadow-sm hover:bg-[#15803D] transition-colors"
                          >
                            <Plus className="w-[15px] h-[15px]" />
                          </button>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="flex flex-col items-end w-[68px]">
                            <p className="text-[#99A1AF] text-[12px] font-medium leading-[16px]">Total</p>
                            <div className="relative w-full h-[28px] mt-[1px]">
                              <span className="absolute right-[28px] text-[#101828] text-[20px] font-bold leading-[28px]">
                                {cartItem.price * cartItem.count}
                              </span>
                              <span className="absolute right-0 top-1 text-[#99A1AF] text-[14px] font-medium leading-[20px]">
                                EGP
                              </span>
                            </div>
                          </div>

                          {/* Remove Button */}
                          <button 
                            onClick={() => handleRemoveItem(item._id)}
                            className="flex items-center justify-center w-10 h-10 bg-[#FEF2F2] border border-[#FFC9C9] rounded-xl text-[#FB2C36] hover:bg-red-100 transition-colors shrink-0"
                          >
                            <Trash2 className="w-[18px] h-[18px]" />
                          </button>
                        </div>

                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-row justify-between items-center pt-6 border-t border-[#E5E7EB] w-full">
              <Link href="/shop" className="flex items-center gap-2 text-[#16A34A] text-[14px] font-medium leading-[20px] hover:underline">
                <ArrowLeft className="w-[14px] h-[14px]" /> Continue Shopping
              </Link>
              <button 
                onClick={handleClearCart}
                disabled={isClearing || items.length === 0}
                className="flex items-center gap-2 group text-[#99A1AF] text-[14px] font-medium leading-[20px] hover:text-red-500 transition-colors disabled:opacity-50"
              >
                <Trash2 className="w-[15px] h-[15px] transition-colors group-hover:text-red-500" />
                {isClearing ? 'Clearing...' : 'Clear all items'}
              </button>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="flex flex-col w-full lg:w-[480px] shrink-0">
            <div className="flex flex-col w-full bg-white border border-[#F3F4F6] rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] overflow-hidden">
              
              {/* Header */}
              <div className="bg-gradient-to-r from-[#16A34A] to-[#15803D] px-6 py-4 flex flex-col gap-1 w-full text-white">
                <h2 className="flex items-center gap-2 text-[18px] font-bold leading-[28px]">
                  <FileText className="w-5 h-5 text-white" />
                  Order Summary
                </h2>
                <p className="text-[#DCFCE7] text-[14px] font-medium leading-[20px]">
                  {items.length} items in your cart
                </p>
              </div>

              {/* Body */}
              <div className="flex flex-col p-6 w-full gap-5">
                
                {/* Free Delivery Banner */}
                <div className="flex items-center gap-3 w-full p-4 bg-gradient-to-r from-[#F0FDF4] to-[#F3F4F6] rounded-xl">
                  <div className="flex items-center justify-center w-10 h-10 bg-[#DCFCE7] rounded-full shrink-0 text-[#00A63E]">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <p className="text-[#008236] text-[16px] font-semibold leading-[24px]">
                      Free Shipping!
                    </p>
                    <p className="text-[#00A63E] text-[14px] font-medium leading-[20px]">
                      You qualify for free delivery
                    </p>
                  </div>
                </div>

                {/* Pricing Lines */}
                <div className="flex flex-col gap-3 w-full">
                  <div className="flex justify-between items-center w-full">
                    <span className="text-[#4A5565] text-[16px] font-medium leading-[24px]">Subtotal</span>
                    <span className="text-[#101828] text-[16px] font-medium leading-[24px]">
                      {formattedSubtotal} EGP
                    </span>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <span className="text-[#4A5565] text-[16px] font-medium leading-[24px]">Shipping</span>
                    <span className="text-[#00A63E] text-[16px] font-medium leading-[24px]">
                      FREE
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex flex-col pt-3 border-t border-dashed border-[#E5E7EB] w-full">
                  <div className="relative flex justify-between items-center w-full h-8">
                    <span className="text-[#101828] text-[16px] font-semibold leading-[24px] mt-1">Total</span>
                    <div className="relative mt-1">
                      <span className="text-[#101828] text-[24px] font-bold leading-[32px] mr-8">
                        {formattedSubtotal}
                      </span>
                      <span className="absolute right-0 top-1 text-[#6A7282] text-[14px] font-medium leading-[20px]">
                        EGP
                      </span>
                    </div>
                  </div>
                </div>

                {/* Promo Code Input Button */}
                <div className="flex items-center gap-2 w-full">
                  <input
                    type="text"
                    value={couponName}
                    onChange={(e) => setCouponName(e.target.value)}
                    placeholder="Enter Coupon Code"
                    className="flex-1 py-3 px-4 h-[46px] border border-[#D1D5DC] rounded-xl text-[14px] focus-visible:outline-none focus:border-[#16A34A]"
                  />
                  <button 
                    onClick={handleApplyCoupon}
                    disabled={isApplying || !couponName}
                    className="flex items-center justify-center shrink-0 px-4 h-[46px] border border-dashed border-[#16A34A] bg-[#F0FDF4] text-[#15803D] rounded-xl hover:bg-[#DCFCE7] transition-colors font-medium text-sm disabled:opacity-50"
                  >
                    {isApplying ? 'Applying...' : 'Apply'}
                  </button>
                </div>

                {/* Checkout Button */}
                <Link
                  href={cartId ? `/checkout?cartId=${cartId}` : "/checkout"}
                  className={`flex items-center justify-center gap-3 w-full h-[56px] py-4 px-6 rounded-xl text-white shadow-[0_10px_15px_-3px_rgba(22,163,74,0.2),0_4px_6px_-4px_rgba(22,163,74,0.2)] transition-all ${
                    items.length === 0
                      ? "bg-[#9CA3AF] pointer-events-none"
                      : "bg-gradient-to-r from-[#16A34A] to-[#15803D] hover:from-[#15803D] hover:to-[#16A34A]"
                  }`}
                >
                  <Lock className="w-5 h-5" />
                  <span className="text-[16px] font-semibold leading-[24px]">
                    Secure Checkout
                  </span>
                </Link>

                {/* Trust Badges */}
                <div className="flex items-center justify-center gap-4 py-2 w-full border-b border-[#E5E7EB] pb-6">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-[14px] h-[14px] text-[#00C950]" />
                    <span className="text-[#6A7282] text-[12px] font-medium leading-[16px]">
                      Secure Payment
                    </span>
                  </div>
                  <div className="w-[1px] h-4 bg-[#E5E7EB]"></div>
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-[14px] h-[14px] text-[#2B7FFF]" />
                    <span className="text-[#6A7282] text-[12px] font-medium leading-[16px]">
                      Fast Delivery
                    </span>
                  </div>
                </div>

                {/* Continue Shopping Link */}
                <Link href="/shop" className="block text-center py-2 w-full mt-[-10px]">
                  <span className="flex items-center justify-center gap-1.5 text-[#16A34A] text-[14px] font-medium leading-[20px] hover:underline">
                    <ArrowLeft className="w-[14px] h-[14px]" /> Continue Shopping
                  </span>
                </Link>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
