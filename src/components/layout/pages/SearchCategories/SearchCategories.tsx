"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Search, 
  LayoutGrid, 
  List, 
  Heart, 
  ArrowRightLeft, 
  Eye, 
  Star, 
  ChevronDown,
  Loader2,
  X
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useSession } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { incrementWishlist } from '@/lib/redux/slices/wishlistSlice';
import { addToWishlist } from '@/lib/services/wishlistService';
import { toast } from 'sonner';
import AddToCartButton from '@/components/layout/shared/AddToCartButton';

const API_BASE = "https://ecommerce.routemisr.com/api/v1";

interface FilterCategory {
  _id: string;
  name: string;
  slug?: string;
  image?: string;
}

interface FilterBrand {
  _id: string;
  name: string;
  slug?: string;
  image?: string;
}

interface SearchProduct {
  _id: string;
  title: string;
  slug?: string;
  imageCover?: string;
  price: number;
  priceAfterDiscount?: number;
  ratingsAverage?: number;
  ratingsQuantity?: number;
  quantity?: number;
  sold?: number;
  category?: { _id: string; name: string };
  brand?: { _id: string; name: string };
}

export default function SearchCategories() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { data: session } = useSession();
  const dispatch = useDispatch();

  // ---- Data from API ----
  const [categories, setCategories] = useState<FilterCategory[]>([]);
  const [brands, setBrands] = useState<FilterBrand[]>([]);
  const [products, setProducts] = useState<SearchProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);

  // ---- Filter state ----
  const [keyword, setKeyword] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // ---- Load categories & brands on mount ----
  useEffect(() => {
    const loadFilters = async () => {
      try {
        const [catRes, brandRes] = await Promise.all([
          fetch(`${API_BASE}/categories`).then(r => r.json()),
          fetch(`${API_BASE}/brands?limit=50`).then(r => r.json()),
        ]);
        setCategories(catRes.data || []);
        setBrands(brandRes.data || []);
      } catch {
        // Filters load silently; products are the priority
      }
    };
    loadFilters();
  }, []);

  // ---- Build query params & fetch products ----
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("limit", "20");
      if (currentPage > 1) params.set("page", String(currentPage));
      if (keyword) params.set("keyword", keyword);
      if (sortBy) params.set("sort", sortBy);
      if (minPrice) params.set("price[gte]", minPrice);
      if (maxPrice) params.set("price[lte]", maxPrice);
      // Multi-select categories
      selectedCategories.forEach(id => params.append("category[in]", id));
      // Brand filter (single select on RouteMISR, but we support multi by picking first)
      if (selectedBrands.length === 1) {
        params.set("brand", selectedBrands[0]);
      } else {
        selectedBrands.forEach(id => params.append("brand", id));
      }

      const res = await fetch(`${API_BASE}/products?${params.toString()}`);
      const data = await res.json();
      setProducts(data.data || []);
      setTotalResults(data.results || 0);
      setTotalPages(data.metadata?.numberOfPages || 1);
    } catch {
      toast.error("Failed to load products");
    } finally {
      setIsLoading(false);
    }
  }, [keyword, selectedCategories, selectedBrands, minPrice, maxPrice, sortBy, currentPage]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProducts();
  }, [fetchProducts]);

  // ---- Debounced keyword search ----
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setKeyword(searchInput);
      setCurrentPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // ---- Filter toggles ----
  const toggleCategory = (id: string) => {
    setSelectedCategories(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
    setCurrentPage(1);
  };

  const toggleBrand = (id: string) => {
    setSelectedBrands(prev =>
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
    setCurrentPage(1);
  };

  const applyPricePreset = (max: string) => {
    setMinPrice("");
    setMaxPrice(max);
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSearchInput("");
    setKeyword("");
    setSelectedCategories([]);
    setSelectedBrands([]);
    setMinPrice("");
    setMaxPrice("");
    setSortBy("");
    setCurrentPage(1);
  };

  const hasActiveFilters = selectedCategories.length > 0 || selectedBrands.length > 0 || minPrice || maxPrice || keyword;

  // ---- Wishlist ----
  const handleAddToWishlist = async (id: string) => {
    if (!session?.user?.token) {
       toast.error("Please log in to add items to your wishlist");
       return;
    }
    try {
       await addToWishlist(session.user.token, id);
       dispatch(incrementWishlist());
       toast.success("Added to wishlist!");
    } catch (err: unknown) {
       toast.error(err instanceof Error ? err.message : "Failed to add to wishlist");
    }
  };

  return (
    <div className="min-h-screen bg-[rgba(249,250,251,0.5)] flex flex-col font-['Exo'] pt-[40px] md:pt-[113px] relative">
      
      {/* Top White Header */}
      <div className="w-full bg-white flex justify-center border-b border-[#F3F4F6]">
        <div className="container max-w-[1536px] w-full px-4 lg:px-44 py-6 flex flex-col gap-4">
          <nav className="flex items-center gap-2 text-[14px] leading-[20px] font-medium">
            <Link href="/" className="text-[#6A7282] hover:text-[#101828] transition-colors">Home</Link>
            <span className="text-[#D1D5DC]">/</span>
            <span className="text-[#101828]">Products</span>
          </nav>
          
          <div className="relative max-w-[672px] w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#99A1AF]" />
            <Input 
              type="text" 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search for products..." 
              className="w-full h-[54px] pl-[48px] pr-12 rounded-xl border border-[#E5E7EB] text-[18px] leading-[24px] font-medium placeholder:text-[#364153]/50 focus-visible:ring-1 focus-visible:ring-[#16A34A] focus-visible:border-[#16A34A] shadow-none" 
            />
            {searchInput && (
              <button 
                onClick={() => setSearchInput("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#99A1AF] hover:text-[#364153] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Active Filters Pills */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[12px] font-medium text-[#6A7282]">Active filters:</span>
              {selectedCategories.map(id => {
                const cat = categories.find(c => c._id === id);
                return (
                  <button key={id} onClick={() => toggleCategory(id)} className="flex items-center gap-1.5 px-3 py-1 bg-[#F0FDF4] text-[#15803D] rounded-full text-[12px] font-medium hover:bg-[#DCFCE7] transition-colors">
                    {cat?.name || id} <X className="w-3 h-3" />
                  </button>
                );
              })}
              {selectedBrands.map(id => {
                const brand = brands.find(b => b._id === id);
                return (
                  <button key={id} onClick={() => toggleBrand(id)} className="flex items-center gap-1.5 px-3 py-1 bg-[#EFF6FF] text-[#1D4ED8] rounded-full text-[12px] font-medium hover:bg-[#DBEAFE] transition-colors">
                    {brand?.name || id} <X className="w-3 h-3" />
                  </button>
                );
              })}
              {(minPrice || maxPrice) && (
                <span className="flex items-center gap-1.5 px-3 py-1 bg-[#FFF7ED] text-[#C2410C] rounded-full text-[12px] font-medium">
                  {minPrice || '0'} – {maxPrice || '∞'} EGP
                  <button onClick={() => { setMinPrice(""); setMaxPrice(""); }}><X className="w-3 h-3" /></button>
                </span>
              )}
              <button onClick={clearAllFilters} className="text-[12px] font-medium text-[#FB2C36] hover:underline ml-1">Clear all</button>
            </div>
          )}
        </div>
      </div>

      {/* Main Body */}
      <div className="w-full flex justify-center pb-[82px]">
        <div className="container max-w-[1536px] w-full px-4 lg:px-44 pt-8 flex gap-8 items-start">
          
          {/* Left Sidebar Filters */}
          <aside className="hidden lg:flex flex-col w-[256px] shrink-0 bg-white border border-[#F3F4F6] rounded-2xl p-6 gap-6 self-start shadow-sm sticky top-[130px]">
            
            {/* Categories */}
            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-[16px] leading-[24px] text-[#101828]">Categories</h3>
              <div className="flex flex-col gap-3 max-h-[208px] overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin' }}>
                {categories.map((cat) => (
                  <label key={cat._id} className="flex items-center gap-3 cursor-pointer group">
                    <Checkbox 
                      checked={selectedCategories.includes(cat._id)}
                      onCheckedChange={() => toggleCategory(cat._id)}
                      className="w-4 h-4 rounded-[2.5px] border-[#767676] group-hover:border-[#16A34A] data-[state=checked]:bg-[#16A34A] data-[state=checked]:border-[#16A34A]" 
                    />
                    <span className={`text-[14px] leading-[20px] font-medium transition-colors ${selectedCategories.includes(cat._id) ? 'text-[#16A34A]' : 'text-[#4A5565] group-hover:text-[#16A34A]'}`}>
                      {cat.name}
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
                  <Input 
                    type="number" 
                    value={minPrice}
                    onChange={(e) => { setMinPrice(e.target.value); setCurrentPage(1); }}
                    placeholder="0" 
                    className="h-[38px] rounded-lg border-[#E5E7EB] text-[14px] focus-visible:ring-[#16A34A] shadow-none" 
                  />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <label className="text-[12px] leading-[16px] font-medium text-[#6A7282]">Max (EGP)</label>
                  <Input 
                    type="number" 
                    value={maxPrice}
                    onChange={(e) => { setMaxPrice(e.target.value); setCurrentPage(1); }}
                    placeholder="No limit" 
                    className="h-[38px] rounded-lg border-[#E5E7EB] text-[14px] focus-visible:ring-[#16A34A] shadow-none" 
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {[
                  { label: "Under 500", max: "500" },
                  { label: "Under 1K", max: "1000" },
                  { label: "Under 5K", max: "5000" },
                  { label: "Under 10K", max: "10000" },
                ].map(preset => (
                  <button 
                    key={preset.max}
                    onClick={() => applyPricePreset(preset.max)}
                    className={`px-3 py-1.5 rounded-full text-[12px] leading-[16px] font-medium transition-colors ${maxPrice === preset.max && !minPrice ? 'bg-[#16A34A] text-white' : 'bg-[#F3F4F6] text-[#4A5565] hover:bg-gray-200'}`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <hr className="border-t border-[#F3F4F6] w-full" />

            {/* Brands */}
            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-[16px] leading-[24px] text-[#101828]">Brands</h3>
              <div className="flex flex-col gap-3 max-h-[208px] overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin' }}>
                {brands.map((brand) => (
                  <label key={brand._id} className="flex items-center gap-3 cursor-pointer group">
                    <Checkbox 
                      checked={selectedBrands.includes(brand._id)}
                      onCheckedChange={() => toggleBrand(brand._id)}
                      className="w-4 h-4 rounded-[2.5px] border-[#767676] group-hover:border-[#16A34A] data-[state=checked]:bg-[#16A34A] data-[state=checked]:border-[#16A34A]" 
                    />
                    <span className={`text-[14px] leading-[20px] font-medium transition-colors ${selectedBrands.includes(brand._id) ? 'text-[#16A34A]' : 'text-[#4A5565] group-hover:text-[#16A34A]'}`}>
                      {brand.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <hr className="border-t border-[#F3F4F6] w-full" />
            
            {/* Clear All */}
            {hasActiveFilters && (
              <button 
                onClick={clearAllFilters}
                className="w-full py-2.5 text-[14px] font-medium text-[#FB2C36] border border-[#FFC9C9] rounded-xl hover:bg-[#FEF2F2] transition-colors"
              >
                Clear All Filters
              </button>
            )}

          </aside>

          {/* Main Product Display */}
          <main className="flex-1 flex flex-col gap-6 w-full max-w-[1216px] mx-auto pb-12">
            
            {/* Top Config bar */}
            <div className="flex flex-wrap justify-between items-center w-full gap-4">
              {/* Left: Result count + View mode */}
              <div className="flex items-center gap-4">
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
                <span className="text-[14px] text-[#6A7282] font-medium">
                  {isLoading ? "Loading..." : `${totalResults} products found`}
                </span>
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-[#6A7282] text-[14px] leading-[20px] font-medium">Sort by:</span>
                <div className="relative">
                  <select 
                    value={sortBy}
                    onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
                    className="pl-4 pr-9 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[14px] text-[#364153] font-medium appearance-none focus:outline-none focus:border-[#16A34A] min-w-[170px] shadow-sm"
                  >
                    <option value="">Relevance</option>
                    <option value="price">Price: Low to High</option>
                    <option value="-price">Price: High to Low</option>
                    <option value="-ratingsAverage">Top Rated</option>
                    <option value="-sold">Best Selling</option>
                    <option value="title">A – Z</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#99A1AF] pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-[#16A34A]" />
              </div>
            )}

            {/* Empty State */}
            {!isLoading && products.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Search className="w-12 h-12 text-[#99A1AF]" />
                <p className="text-[16px] text-[#6A7282] font-medium">No products found matching your filters.</p>
                {hasActiveFilters && (
                  <button onClick={clearAllFilters} className="text-[14px] font-medium text-[#16A34A] hover:underline">
                    Clear all filters
                  </button>
                )}
              </div>
            )}

            {/* Products Grid */}
            {!isLoading && products.length > 0 && (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
                {products.map((product: SearchProduct) => {
                  const isDiscounted = Boolean(product.priceAfterDiscount && product.priceAfterDiscount < product.price);
                  const discountPct = isDiscounted && product.priceAfterDiscount
                    ? Math.round(((product.price - product.priceAfterDiscount) / product.price) * 100)
                    : 0;

                  return (
                    <div 
                      key={product._id} 
                      className={`relative flex flex-col bg-white border border-[#E5E7EB] rounded-xl overflow-hidden group transition-shadow hover:shadow-lg w-full ${viewMode === 'list' ? 'sm:flex-row' : ''}`}
                    >
                      {/* Clickable overlay */}
                      <Link href={`/categories/${product._id}`} className="absolute inset-0 z-0" />

                      {/* Product Image */}
                      <div className={`relative bg-white flex shrink-0 items-center justify-center overflow-hidden pointer-events-none ${viewMode === 'list' ? 'w-[290px] h-full sm:h-[240px]' : 'w-full h-[240px]'}`}>
                        {product.imageCover ? (
                          <Image 
                            src={product.imageCover} 
                            alt={product.title} 
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            className="object-contain p-2 group-hover:scale-105 transition-transform duration-500" 
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-white via-gray-100 to-gray-50 flex items-center justify-center text-gray-300">
                            <span className="font-semibold px-4 text-center line-clamp-1">{product.title?.substring(0, 20)}</span>
                          </div>
                        )}

                        {/* Discount Badge */}
                        {isDiscounted && (
                          <div className="absolute top-3 left-3 bg-[#FB2C36] text-white text-[12px] leading-[16px] font-medium px-2 py-1 rounded">
                            -{discountPct}%
                          </div>
                        )}

                        {/* Hover Action Buttons */}
                        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-200 z-10 pointer-events-auto">
                          <button 
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAddToWishlist(product._id); }}
                            className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] text-[#4A5565] hover:text-[#FB2C36] hover:bg-red-50 transition-colors"
                          >
                            <Heart className="w-4 h-4" />
                          </button>
                          <button className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] text-[#4A5565] hover:text-[#16A34A] hover:bg-green-50 transition-colors">
                            <ArrowRightLeft className="w-4 h-4" />
                          </button>
                          <Link 
                            href={`/categories/${product._id}`}
                            className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] text-[#4A5565] hover:text-[#16A34A] hover:bg-green-50 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>

                      {/* Product Content */}
                      <div className={`p-4 flex flex-col ${viewMode === 'list' ? 'flex-1 justify-center' : 'min-h-[152px]'} bg-white relative z-10 pointer-events-none`}>
                        <span className="text-[#6A7282] text-[12px] font-medium leading-[16px] mb-1">
                          {product.category?.name || "Category"}
                        </span>
                        <h3 className={`text-[#364153] text-[16px] font-medium leading-[24px] line-clamp-2 group-hover:text-[#16A34A] transition-colors ${viewMode === 'list' ? 'mb-2' : 'h-[48px]'}`}>
                          {product.title}
                        </h3>
                        
                        <div className="flex items-center gap-1.5 mt-1 mb-2">
                          <div className="flex gap-[1px]">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-[14px] h-[14px] ${i < Math.round(product.ratingsAverage || 0) ? "fill-[#FCC800] text-[#FCC800]" : "text-gray-300"}`} 
                              />
                            ))}
                          </div>
                          <span className="text-[#6A7282] text-[12px] font-medium leading-[16px] ml-1">
                            {product.ratingsAverage || 0} ({product.ratingsQuantity || 0})
                          </span>
                        </div>

                        <div className="flex items-center justify-between mt-auto pointer-events-auto">
                          <div className="flex items-baseline gap-2">
                            {isDiscounted ? (
                              <>
                                <span className="text-[#16A34A] text-[18px] font-bold leading-[28px]">
                                  {product.priceAfterDiscount} EGP
                                </span>
                                <span className="text-[#6A7282] text-[14px] font-medium leading-[20px] line-through">
                                  {product.price} EGP
                                </span>
                              </>
                            ) : (
                              <span className="text-[#1E2939] text-[18px] font-bold leading-[28px]">
                                {product.price} EGP
                              </span>
                            )}
                          </div>
                          <AddToCartButton productId={product._id} variant="icon" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Pagination */}
            {!isLoading && totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-8">
                <button 
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage(p => p - 1)}
                  className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[14px] font-medium text-[#364153] hover:bg-gray-50 disabled:opacity-40 transition-colors"
                >
                  Previous
                </button>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  // Show pages around current
                  let page: number;
                  if (totalPages <= 5) {
                    page = i + 1;
                  } else if (currentPage <= 3) {
                    page = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    page = totalPages - 4 + i;
                  } else {
                    page = currentPage - 2 + i;
                  }
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg text-[14px] font-medium transition-colors ${currentPage === page ? 'bg-[#16A34A] text-white shadow-sm' : 'bg-white border border-[#E5E7EB] text-[#364153] hover:bg-gray-50'}`}
                    >
                      {page}
                    </button>
                  );
                })}
                <button 
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage(p => p + 1)}
                  className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[14px] font-medium text-[#364153] hover:bg-gray-50 disabled:opacity-40 transition-colors"
                >
                  Next
                </button>
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
}
