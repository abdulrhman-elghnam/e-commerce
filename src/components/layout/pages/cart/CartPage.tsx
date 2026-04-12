"use client";

import React from 'react';
import Link from 'next/link';
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

const cartItems = [
  {
    id: 1,
    name: "Woman Shawl",
    category: "Women's Fashion",
    sku: "5CA0AD",
    price: 149,
    quantity: 2,
    inStock: true,
  },
  {
    id: 2,
    name: "Woman Standart Fit Knitted Cardigan",
    category: "Women's Fashion",
    sku: "5CA084",
    price: 499,
    quantity: 1,
    inStock: true,
  },
  {
    id: 3,
    name: "Woman Shawl",
    category: "Women's Fashion",
    sku: "5CA096",
    price: 349,
    quantity: 2,
    inStock: true,
  },
  {
    id: 4,
    name: "Woman Bordeaux Long Sleeve Blouse BORDEAUX",
    category: "Women's Fashion",
    sku: "5CA090",
    price: 499,
    quantity: 1,
    inStock: true,
  }
];

export default function CartPage() {
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
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
                You have {cartItems.length} items in your cart
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Column - Cart Items */}
          <div className="flex flex-col gap-6 w-full lg:w-[992px] max-w-full">
            <div className="flex flex-col gap-4 w-full">
              {cartItems.map((item, index) => (
                <div 
                  key={index} 
                  className="relative p-5 bg-white border border-[#F3F4F6] rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] flex flex-col sm:flex-row gap-6 w-full"
                >
                  
                  {/* Product Image Box */}
                  <div className="relative flex flex-col shrink-0 w-32 h-32 p-3 bg-gradient-to-br from-[#F9FAFB] via-white to-[#F3F4F6] border border-[#F3F4F6] rounded-xl justify-center items-center overflow-visible">
                    <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                      {/* Placeholder for local image */}
                      <span className="text-xs text-center px-2">{item.name.substring(0, 15)}...</span>
                    </div>
                    {item.inStock && (
                      <div className="absolute -bottom-1 -right-1 flex items-center gap-1 bg-[#00C950] text-white text-[10px] font-semibold leading-[15px] px-2 py-[2px] rounded-full shadow-sm">
                        <Check className="w-[10px] h-[10px]" strokeWidth={3} /> In Stock
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex flex-col gap-2 mb-3">
                      <h3 className="text-[18px] font-semibold leading-[29px] text-[#101828]">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-2 h-6">
                        <span className="inline-block px-[10px] py-1 bg-gradient-to-r from-[#F0FDF4] to-[#F3F4F6] rounded-full text-[#15803D] text-[12px] font-medium leading-[16px]">
                          {item.category}
                        </span>
                        <span className="text-[#99A1AF] text-[12px] leading-[16px]">•</span>
                        <span className="text-[#6A7282] text-[12px] font-medium leading-[16px]">
                          SKU: {item.sku}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-[#16A34A] text-[18px] font-bold leading-[28px]">
                        {item.price} EGP
                      </span>
                      <span className="text-[#99A1AF] text-[12px] font-medium leading-[16px]">
                        per unit
                      </span>
                    </div>

                    <div className="flex flex-row flex-wrap items-center justify-between gap-4 mt-auto w-full">
                      
                      {/* Quantity Toggles */}
                      <div className="flex items-center px-1 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl h-[42px] w-[122px]">
                        <button className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors ${item.quantity <= 1 ? 'bg-white opacity-40 text-[#6A7282]' : 'bg-white text-[#6A7282] shadow-sm hover:text-black'}`}>
                          <Minus className="w-[15px] h-[15px]" />
                        </button>
                        <span className="w-12 text-center text-[#101828] text-[16px] font-bold leading-[24px]">
                          {item.quantity}
                        </span>
                        <button className="flex items-center justify-center w-8 h-8 bg-[#16A34A] text-white rounded-lg shadow-sm hover:bg-[#15803D] transition-colors">
                          <Plus className="w-[15px] h-[15px]" />
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col items-end w-[68px]">
                          <p className="text-[#99A1AF] text-[12px] font-medium leading-[16px]">Total</p>
                          <div className="relative w-full h-[28px] mt-[1px]">
                            <span className="absolute right-[28px] text-[#101828] text-[20px] font-bold leading-[28px]">
                              {item.price * item.quantity}
                            </span>
                            <span className="absolute right-0 top-1 text-[#99A1AF] text-[14px] font-medium leading-[20px]">
                              EGP
                            </span>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <button className="flex items-center justify-center w-10 h-10 bg-[#FEF2F2] border border-[#FFC9C9] rounded-xl text-[#FB2C36] hover:bg-red-100 transition-colors shrink-0">
                          <Trash2 className="w-[18px] h-[18px]" />
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-row justify-between items-center pt-6 border-t border-[#E5E7EB] w-full">
              <Link href="/shop" className="flex items-center gap-2 text-[#16A34A] text-[14px] font-medium leading-[20px] hover:underline">
                <ArrowLeft className="w-[14px] h-[14px]" /> Continue Shopping
              </Link>
              <button className="flex items-center gap-2 group text-[#99A1AF] text-[14px] font-medium leading-[20px] hover:text-red-500 transition-colors">
                <Trash2 className="w-[15px] h-[15px] transition-colors group-hover:text-red-500" />
                Clear all items
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
                  {cartItems.length} items in your cart
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

                {/* Promo Code Button */}
                <button className="flex items-center justify-center gap-2 w-full py-3 h-[46px] border border-dashed border-[#D1D5DC] rounded-xl hover:bg-gray-50 transition-colors">
                  <Tag className="w-4 h-4 text-[#4A5565]" />
                  <span className="text-[#4A5565] text-[14px] font-medium leading-[20px]">
                    Apply Promo Code
                  </span>
                </button>

                {/* Checkout Button */}
                <Link href="/checkout" className="flex items-center justify-center gap-3 w-full h-[56px] py-4 px-6 bg-gradient-to-r from-[#16A34A] to-[#15803D] hover:from-[#15803D] hover:to-[#16A34A] rounded-xl text-white shadow-[0_10px_15px_-3px_rgba(22,163,74,0.2),0_4px_6px_-4px_rgba(22,163,74,0.2)] transition-all">
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
