"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { Heart, ShoppingCart, Trash2, ArrowLeft, Loader2 } from 'lucide-react';
import { getWishlist, removeFromWishlist } from '@/lib/services/wishlistService';
import { useDispatch } from 'react-redux';
import { setWishlistCount, decrementWishlist } from '@/lib/redux/slices/wishlistSlice';
import { addToCart } from '@/lib/services/cartService';
import { incrementCart } from '@/lib/redux/slices/cartSlice';

interface WishlistItem {
  _id: string;
  title: string;
  price: number;
  quantity: number;
  imageCover?: string;
  category?: { name?: string };
}

export default function WishlistPage() {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isFetchingWishlist, setIsFetchingWishlist] = useState(false);

  const isLoading = status === "loading" || isFetchingWishlist;

  const loadWishlist = React.useCallback(async () => {
    if (!session?.user?.token) return;
    try {
      setIsFetchingWishlist(true);
      const res = await getWishlist(session.user.token);
      setItems(res.data || []);
      if (res.data) {
        dispatch(setWishlistCount(res.data.length));
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load wishlist";
      toast.error(message);
    } finally {
      setIsFetchingWishlist(false);
    }
  }, [session, dispatch]);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      loadWishlist();
    }
  }, [status, session, loadWishlist]);

  const handleRemove = async (productId: string) => {
    if (!session?.user?.token) return;
    try {
      await removeFromWishlist(session.user.token, productId);
      toast.success("Product removed from wishlist");
      setItems(prev => prev.filter(item => item._id !== productId));
      dispatch(decrementWishlist());
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to remove item";
      toast.error(message);
    }
  };

  const handleAddToCart = async (item: WishlistItem) => {
    if (!session?.user?.token) return toast.error("Please sign in to add items to cart");
    try {
      await addToCart(session.user.token, item._id);
      dispatch(incrementCart());
      toast.success("Added to cart");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not add item to cart";
      toast.error(message);
    }
  };
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
                {isLoading ? "Loading..." : `${items.length} items saved`}
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
              <div className="flex flex-col divide-y divide-[#F3F4F6] relative min-h-[200px]">
                
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-10">
                    <Loader2 className="w-8 h-8 animate-spin text-[#16A34A]" />
                  </div>
                )}
                
                {!isLoading && items.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-16 px-6 gap-4 text-center">
                    <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-[#FB2C36]">
                      <Heart className="w-8 h-8" />
                    </div>
                    {status === "unauthenticated" ? (
                      <>
                        <h3 className="text-xl font-bold text-[#101828]">Sign In to View Wishlist</h3>
                        <p className="text-sm text-[#6A7282] max-w-sm">
                          Save your favorite items and access them across all your devices.
                        </p>
                        <Link 
                          href="/signin" 
                          className="mt-2 inline-flex items-center justify-center px-6 py-2.5 bg-[#16A34A] text-white text-sm font-semibold rounded-xl hover:bg-[#15803D] transition-colors"
                        >
                          Sign In Now
                        </Link>
                      </>
                    ) : (
                      <>
                        <h3 className="text-xl font-bold text-[#101828]">Your Wishlist is Empty</h3>
                        <p className="text-sm text-[#6A7282] max-w-sm">
                          Explore our collection and click the heart icon on any product to save it here!
                        </p>
                        <Link 
                          href="/shop" 
                          className="mt-2 inline-flex items-center justify-center px-6 py-2.5 bg-[#16A34A] text-white text-sm font-semibold rounded-xl hover:bg-[#15803D] transition-colors"
                        >
                          Explore Products
                        </Link>
                      </>
                    )}
                  </div>
                )}

                {items.map((item) => (
                  <div key={item._id} className="grid grid-cols-12 gap-4 items-center px-6 py-5 hover:bg-gray-50/50 transition-colors">
                    
                    {/* Product Details - Col span 6 */}
                    <div className="col-span-6 flex items-center gap-4 pr-4">
                      {/* Product Image Placeholder */}
                      <Link href={`/categories/${item._id}`} className="relative w-[80px] h-[80px] shrink-0 bg-[#F9FAFB] border border-[#F3F4F6] rounded-xl flex items-center justify-center overflow-hidden hover:opacity-90 transition-opacity">
                        {item.imageCover ? (
                          <Image src={item.imageCover} alt={item.title} fill className="object-cover" />
                        ) : (
                          <span className="text-xs text-gray-400 font-medium">Img</span>
                        )}
                      </Link>
                      
                      <div className="flex flex-col gap-1 min-w-0">
                        <Link 
                          href={`/categories/${item._id}`} 
                          className="text-[#101828] text-[16px] font-medium leading-[24px] hover:text-[#16A34A] transition-colors truncate"
                          title={item.title}
                        >
                          {item.title}
                        </Link>
                        <p className="text-[#99A1AF] text-[14px] font-medium leading-[20px]">
                          {item.category?.name || "Category"}
                        </p>
                      </div>
                    </div>

                    {/* Price - Col span 2 */}
                    <div className="col-span-2 flex flex-col justify-center items-center text-center px-2">
                      <div className="text-[#101828] text-[16px] font-semibold leading-[24px]">
                        {item.price} EGP
                      </div>
                    </div>

                    {/* Status - Col span 2 */}
                    <div className="col-span-2 flex justify-center items-center px-2">
                      {item.quantity > 0 ? (
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
                      <button 
                        onClick={() => handleAddToCart(item)}
                        className="flex-1 flex items-center justify-center gap-2 h-10 px-2 sm:px-4 bg-[#16A34A] hover:bg-[#15803D] text-white rounded-lg transition-colors shadow-sm min-w-[120px]"
                      >
                        <ShoppingCart className="w-[15px] h-[15px]" />
                        <span className="text-[14px] font-medium leading-[20px] whitespace-nowrap">Add to Cart</span>
                      </button>
                      <button 
                        onClick={() => handleRemove(item._id)}
                        className="w-10 h-10 shrink-0 flex items-center justify-center text-[#99A1AF] hover:text-red-500 bg-white border border-[#E5E7EB] hover:border-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
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
