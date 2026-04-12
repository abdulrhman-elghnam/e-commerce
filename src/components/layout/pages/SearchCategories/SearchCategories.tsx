"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  LayoutGrid, 
  List, 
  Heart, 
  ArrowRightLeft, 
  Eye, 
  ShoppingCart, 
  Star, 
  ChevronDown
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

const categories = [
  "Music", "Men's Fashion", "Women's Fashion", "SuperMarket", 
  "Baby & Toys", "Home", "Books", "Beauty & Health", 
  "Mobiles", "Electronics"
];

const brands = [
  "Canon", "Dell", "Lenovo", "SONY", "Infinix", 
  "Realme", "HONOR", "Nokia", "OPPO", "Huawei", 
  "Apple", "Xiaomi", "Samsung", "Jack & Jones", "LC Waikiki"
];

const products = [
  { 
    id: 1, 
    name: "Woman Shawl", 
    category: "Women's Fashion", 
    price: 191, 
    originalPrice: null, 
    rating: 4.5, 
    reviews: 2, 
    discount: null 
  },
  { 
    id: 2, 
    name: "Woman Shawl", 
    category: "Women's Fashion", 
    price: 149, 
    originalPrice: null, 
    rating: 4.8, 
    reviews: 18, 
    discount: null 
  },
  { 
    id: 3, 
    name: "Woman Bordeaux Long Sleeve Blouse BORDEAUX", 
    category: "Women's Fashion", 
    price: 349, 
    originalPrice: 499, 
    rating: 4.8, 
    reviews: 18, 
    discount: "-30%" 
  },
  { 
    id: 4, 
    name: "Woman Brown Long Sleeve Tunic LT.CAMEL", 
    category: "Women's Fashion", 
    price: 359, 
    originalPrice: 499, 
    rating: 4.7, 
    reviews: 5, 
    discount: "-28%" 
  },
  { 
    id: 5, 
    name: "Woman Standart Fit Knitted Cardigan", 
    category: "Women's Fashion", 
    price: 349, 
    originalPrice: 499, 
    rating: 4.0, 
    reviews: 1, 
    discount: "-10%" 
  },
];

export default function SearchCategories() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="min-h-screen bg-[rgba(249,250,251,0.5)] flex flex-col font-['Exo'] pt-[40px] md:pt-[113px] relative">
      
      {/* Top White Header */}
      <div className="w-full bg-white flex justify-center">
        <div className="container max-w-[1536px] w-full px-4 lg:px-44 py-6 flex flex-col gap-4">
          <nav className="flex items-center gap-2 text-[14px] leading-[20px] font-medium">
            <Link href="/" className="text-[#6A7282] hover:text-[#101828] transition-colors">Home</Link>
            <span className="text-[#D1D5DC]">/</span>
            <span className="text-[#101828]">Search Results</span>
          </nav>
          
          <div className="relative max-w-[672px] w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#99A1AF]" />
            <Input 
              type="text" 
              placeholder="Search for products..." 
              className="w-full h-[54px] pl-[48px] pr-4 rounded-xl border border-[#E5E7EB] text-[18px] leading-[24px] font-medium placeholder:text-[#364153]/50 focus-visible:ring-1 focus-visible:ring-[#16A34A] focus-visible:border-[#16A34A] shadow-none" 
            />
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="w-full flex justify-center pb-[82px]">
        <div className="container max-w-[1536px] w-full px-4 lg:px-44 pt-8 flex gap-8 items-start">
          
          {/* Left Sidebar Filters */}
          <aside className="hidden lg:flex flex-col w-[256px] shrink-0 bg-white border border-[#F3F4F6] rounded-2xl p-6 gap-6 self-start shadow-sm">
            
            {/* Categories */}
            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-[16px] leading-[24px] text-[#101828]">Categories</h3>
              <div className="flex flex-col gap-3 max-h-[208px] overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin' }}>
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                    <Checkbox className="w-4 h-4 rounded-[2.5px] border-[#767676] group-hover:border-[#16A34A]" />
                    <span className="text-[14px] leading-[20px] font-medium text-[#4A5565] group-hover:text-[#16A34A] transition-colors">
                      {cat}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <hr className="border-t border-[#F3F4F6] w-full" />

            {/* Price Range */}
            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-[16px] leading-[24px] text-[#101828]">Price Range</h3>
              <div className="grid grid-cols-2 gap-3 w-full">
                <div className="flex flex-col gap-1 w-full">
                  <label className="text-[12px] leading-[16px] font-medium text-[#6A7282]">Min (EGP)</label>
                  <Input type="number" placeholder="0" className="h-[38px] rounded-lg border-[#E5E7EB] text-[14px] focus-visible:ring-[#16A34A] shadow-none" />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <label className="text-[12px] leading-[16px] font-medium text-[#6A7282]">Max (EGP)</label>
                  <Input type="number" placeholder="No limit" className="h-[38px] rounded-lg border-[#E5E7EB] text-[14px] focus-visible:ring-[#16A34A] shadow-none" />
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                <button className="px-3 py-1.5 bg-[#F3F4F6] rounded-full text-[12px] leading-[16px] font-medium text-[#4A5565] hover:bg-gray-200 transition-colors">Under 500</button>
                <button className="px-3 py-1.5 bg-[#F3F4F6] rounded-full text-[12px] leading-[16px] font-medium text-[#4A5565] hover:bg-gray-200 transition-colors">Under 1K</button>
                <button className="px-3 py-1.5 bg-[#F3F4F6] rounded-full text-[12px] leading-[16px] font-medium text-[#4A5565] hover:bg-gray-200 transition-colors">Under 5K</button>
                <button className="px-3 py-1.5 bg-[#F3F4F6] rounded-full text-[12px] leading-[16px] font-medium text-[#4A5565] hover:bg-gray-200 transition-colors">Under 10K</button>
              </div>
            </div>

            <hr className="border-t border-[#F3F4F6] w-full" />

            {/* Brands */}
            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-[16px] leading-[24px] text-[#101828]">Brands</h3>
              <div className="flex flex-col gap-3 max-h-[208px] overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin' }}>
                {brands.map((brand) => (
                  <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                    <Checkbox className="w-4 h-4 rounded-[2.5px] border-[#767676] group-hover:border-[#16A34A]" />
                    <span className="text-[14px] leading-[20px] font-medium text-[#4A5565] group-hover:text-[#16A34A] transition-colors">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            <hr className="border-t border-[#F3F4F6] w-full" />
            
            {/* View More / Placeholder bottom */}
            <div className="w-full flex"></div>

          </aside>

          {/* Main Product Display */}
          <main className="flex-1 flex flex-col gap-6 w-full max-w-[1216px] mx-auto pb-12">
            
            {/* Top Config bar */}
            <div className="flex flex-wrap justify-between items-center w-full gap-4">
              {/* View mode toggle */}
              <div className="flex items-center gap-1 bg-white border border-[#E5E7EB] rounded-lg p-1 shadow-sm">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-[#16A34A] text-white' : 'text-[#6A7282] hover:bg-gray-50'}`}
                >
                  <LayoutGrid className="w-[15px] h-[15px]" />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-[#16A34A] text-white' : 'text-[#6A7282] hover:bg-gray-50'}`}
                >
                  <List className="w-[15px] h-[15px]" />
                </button>
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-[#6A7282] text-[14px] leading-[20px] font-medium">Sort by:</span>
                <div className="relative">
                  <select className="pl-4 pr-9 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[14px] text-[#364153] font-medium appearance-none focus:outline-none focus:border-[#16A34A] min-w-[170px] shadow-sm">
                    <option>Relevance</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Top Rated</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#99A1AF] pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
              {products.map((product) => (
                <div 
                  key={product.id} 
                  className={`relative flex flex-col bg-white border border-[#E5E7EB] rounded-lg overflow-hidden group transition-shadow hover:shadow-lg w-full ${viewMode === 'list' ? 'sm:flex-row' : ''}`}
                >
                  {/* Product Image Box */}
                  <div className={`relative bg-gray-50 flex shrink-0 items-center justify-center overflow-hidden ${viewMode === 'list' ? 'w-[290px] h-full sm:h-[240px]' : 'w-full h-[240px]'}`}>
                    {/* Placeholder image representation */}
                    <div className="w-full h-full bg-gradient-to-br from-white via-gray-100 to-gray-50 flex items-center justify-center text-gray-300">
                      <span className="font-semibold px-4 text-center line-clamp-1">Image: {product.name.substring(0, 15)}...</span>
                    </div>

                    {/* Discount Badge */}
                    {product.discount && (
                      <div className="absolute top-3 left-3 bg-[#FB2C36] text-white text-[12px] leading-[16px] font-medium px-2 py-1 rounded">
                        {product.discount}
                      </div>
                    )}

                    {/* Quick Action Buttons Hover Array */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-200">
                      <button className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] text-[#4A5565] hover:text-[#16A34A] hover:bg-green-50 transition-colors">
                        <Heart className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] text-[#4A5565] hover:text-[#16A34A] hover:bg-green-50 transition-colors">
                        <ArrowRightLeft className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] text-[#4A5565] hover:text-[#16A34A] hover:bg-green-50 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Product Content Details */}
                  <div className={`p-4 flex flex-col ${viewMode === 'list' ? 'flex-1 justify-center' : 'h-[152px]'}`}>
                    <span className="text-[#6A7282] text-[12px] font-medium leading-[16px] mb-1">
                      {product.category}
                    </span>
                    <h3 className={`text-[#364153] text-[16px] font-medium leading-[24px] line-clamp-2 ${viewMode === 'list' ? 'mb-2' : 'h-[48px]'}`}>
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center gap-1.5 mt-1 mb-2">
                      <div className="flex bg-clip-text text-transparent gap-[1px]">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-[14px] h-[14px] ${i < Math.round(product.rating) ? "fill-[#FCC800] text-[#FCC800]" : "text-gray-300"}`} 
                          />
                        ))}
                      </div>
                      <span className="text-[#6A7282] text-[12px] font-medium leading-[16px] ml-1">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-baseline gap-2">
                        <span className="text-[#1E2939] text-[18px] font-bold leading-[28px]">
                          {product.price} EGP
                        </span>
                        {product.originalPrice && (
                          <span className="text-[#6A7282] text-[14px] font-medium leading-[20px] line-through">
                            {product.originalPrice} EGP
                          </span>
                        )}
                      </div>
                      <button className="w-10 h-10 flex items-center justify-center bg-[#16A34A] text-white rounded-full hover:bg-[#15803D] shadow-sm transition-colors shrink-0">
                        <ShoppingCart className="w-[18px] h-[18px] ml-[-2px]" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}
