"use client";

import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingCart, Trash2, ArrowLeft } from 'lucide-react';

const wishlistItems = [
  {
    id: 1,
    name: "Hoops 3.0 Low Classic Vintage Shoes",
    category: "Men's Fashion",
    price: "1,629 EGP",
    originalPrice: null,
    inStock: true
  },
  {
    id: 2,
    name: "Galaxy 6 Running Shoes",
    category: "Men's Fashion",
    price: "1,629 EGP",
    originalPrice: null,
    inStock: true
  },
  {
    id: 3,
    name: "Victus 16-D1016Ne Laptop With 16-Inch Display Core I7-12700H Processor 16Gb Ram 1Tb Nvidia Geforce Rtx3050 Ti Graphics English/Arabic Ceramic White",
    category: "Electronics",
    price: "42,960 EGP",
    originalPrice: null,
    inStock: true
  },
  {
    id: 4,
    name: "Duramo 10 Running Shoes",
    category: "Men's Fashion",
    price: "1,314 EGP",
    originalPrice: "1,999 EGP",
    inStock: true
  },
  {
    id: 5,
    name: "Woman Shawl",
    category: "Women's Fashion",
    price: "149 EGP",
    originalPrice: null,
    inStock: true
  }
];

export default function WishlistPage() {
  return (
    <div className="min-h-screen bg-[rgba(249,250,251,0.5)] flex flex-col font-['Exo'] pt-[40px] md:pt-[113px] relative pb-[120px]">
      
      {/* Top White Header */}
      <div className="w-full bg-white flex justify-center border-b border-[#F3F4F6]">
        <div className="container max-w-[1536px] w-full px-4 lg:px-44 py-8 flex flex-col gap-4">
          
          <nav className="flex items-center gap-2 text-[14px] leading-[20px] font-medium">
            <Link href="/" className="text-[#6A7282] hover:text-[#101828] transition-colors">Home</Link>
            <span className="text-[#6A7282]">/</span>
            <span className="text-[#101828]">Wishlist</span>
          </nav>
          
          <div className="flex items-center gap-4 mt-2">
            <div className="w-12 h-12 flex items-center justify-center bg-[#FEF2F2] rounded-xl shrink-0">
              <Heart className="w-6 h-6 text-[#FB2C36] fill-[#FB2C36]" />
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="text-[24px] font-bold leading-[32px] text-[#101828]">
                My Wishlist
              </h1>
              <p className="text-[14px] font-medium leading-[20px] text-[#6A7282]">
                {wishlistItems.length} items saved
              </p>
            </div>
          </div>
          
        </div>
      </div>

      {/* Main Container */}
      <div className="w-full flex justify-center pt-8">
        <div className="container max-w-[1536px] w-full px-4 lg:px-44 flex flex-col gap-8">
          
          {/* Wishlist Table Card */}
          <div className="bg-white border border-[#F3F4F6] rounded-2xl w-full max-w-full overflow-x-auto lg:overflow-visible shadow-sm">
            <div className="min-w-[800px] lg:min-w-full">
              
              {/* Table Header */}
              <div className="grid grid-cols-12 bg-[#F9FAFB] px-6 py-4 rounded-t-2xl border-b border-[#F3F4F6]">
                <div className="col-span-6 flex items-center">
                  <span className="text-[14px] leading-[20px] font-medium text-[#6A7282]">Product</span>
                </div>
                <div className="col-span-2 flex justify-center items-center text-center">
                  <span className="text-[14px] leading-[20px] font-medium text-[#6A7282]">Price</span>
                </div>
                <div className="col-span-2 flex justify-center items-center text-center">
                  <span className="text-[14px] leading-[20px] font-medium text-[#6A7282]">Status</span>
                </div>
                <div className="col-span-2 flex justify-center items-center text-center">
                  <span className="text-[14px] leading-[20px] font-medium text-[#6A7282]">Actions</span>
                </div>
              </div>

              {/* Table Body */}
              <div className="flex flex-col divide-y divide-[#F3F4F6]">
                {wishlistItems.map((item) => (
                  <div key={item.id} className="grid grid-cols-12 gap-4 items-center px-6 py-5 hover:bg-gray-50/50 transition-colors">
                    
                    {/* Product Details - Col span 6 */}
                    <div className="col-span-6 flex items-center gap-4 pr-4">
                      {/* Product Image Placeholder */}
                      <Link href={`/product/${item.id}`} className="w-[80px] h-[80px] shrink-0 bg-[#F9FAFB] border border-[#F3F4F6] rounded-xl flex items-center justify-center overflow-hidden hover:opacity-90 transition-opacity">
                        <span className="text-xs text-gray-400 font-medium">Img</span>
                      </Link>
                      
                      <div className="flex flex-col gap-1 min-w-0">
                        <Link 
                          href={`/product/${item.id}`} 
                          className="text-[#101828] text-[16px] font-medium leading-[24px] hover:text-[#16A34A] transition-colors truncate"
                          title={item.name}
                        >
                          {item.name}
                        </Link>
                        <p className="text-[#99A1AF] text-[14px] font-medium leading-[20px]">
                          {item.category}
                        </p>
                      </div>
                    </div>

                    {/* Price - Col span 2 */}
                    <div className="col-span-2 flex flex-col justify-center items-center text-center px-2">
                      <div className="text-[#101828] text-[16px] font-semibold leading-[24px]">
                        {item.price}
                      </div>
                      {item.originalPrice && (
                        <div className="text-[#99A1AF] text-[14px] font-medium leading-[20px] line-through mt-0.5">
                          {item.originalPrice}
                        </div>
                      )}
                    </div>

                    {/* Status - Col span 2 */}
                    <div className="col-span-2 flex justify-center items-center px-2">
                      {item.inStock ? (
                        <span className="inline-flex items-center justify-center gap-1.5 px-3 py-1 bg-[#F0FDF4] rounded-full shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00C950]"></span>
                          <span className="text-[#008236] text-[12px] font-medium leading-[16px] whitespace-nowrap">
                            In Stock
                          </span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center gap-1.5 px-3 py-1 bg-red-50 rounded-full shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                          <span className="text-red-700 text-[12px] font-medium leading-[16px] whitespace-nowrap">
                            Out of Stock
                          </span>
                        </span>
                      )}
                    </div>

                    {/* Actions - Col span 2 */}
                    <div className="col-span-2 flex items-center justify-center gap-2 pl-2">
                      <button className="flex-1 flex items-center justify-center gap-2 h-10 px-2 sm:px-4 bg-[#16A34A] hover:bg-[#15803D] text-white rounded-lg transition-colors shadow-sm min-w-[120px]">
                        <ShoppingCart className="w-[15px] h-[15px]" />
                        <span className="text-[14px] font-medium leading-[20px] whitespace-nowrap">Add to Cart</span>
                      </button>
                      <button className="w-10 h-10 shrink-0 flex items-center justify-center text-[#99A1AF] hover:text-red-500 bg-white border border-[#E5E7EB] hover:border-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-[18px] h-[18px]" />
                      </button>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Bottom Actions Link */}
          <div className="flex w-full pt-4">
            <Link 
              href="/shop" 
              className="group flex items-center gap-2 text-[#6A7282] hover:text-[#101828] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-[14px] font-medium leading-[20px]">Continue Shopping</span>
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
}
