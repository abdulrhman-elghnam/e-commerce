import React from 'react';
import Image from 'next/image';
import { Eye, Star } from 'lucide-react';
import Link from 'next/link';
import { getAllProducts } from '@/service/Products.service';
import AddToCartButton from '@/components/layout/shared/AddToCartButton';
import WishlistButton from '@/app/(main)/categories/[id]/WishlistButton';
import type { Product } from '@/lib/services/catalogService';

export default async function FeaturedProducts() {
    const response = await getAllProducts();
    const data: Product[] = response?.data || [];
    
    return (
        <section className="app-container py-12 flex flex-col gap-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-8 bg-gradient-to-b from-[#16A34A] to-[#15803D] rounded-full"></div>
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#1E2939]">Featured Products</h2>
                        <p className="text-sm text-[#6A7282] mt-0.5">Handpicked premium items with top discounts</p>
                    </div>
                </div>
                <Link href="/shop" className="text-sm font-semibold text-[#16A34A] hover:text-[#15803D] transition-colors">
                    Browse All Products →
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6">
                {data.slice(0, 10).map((item: Product) => {
                    const price = item.priceAfterDiscount || item.price;
                    const isDiscounted = Boolean(item.priceAfterDiscount && item.priceAfterDiscount < item.price);
                    const discountPercentage = isDiscounted 
                        ? Math.round(((item.price - item.priceAfterDiscount!) / item.price) * 100) 
                        : 0;

                    return (
                        <div key={item._id} className="group flex flex-col bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative">
                            {/* Clickable Card Overlay */}
                            <Link href={`/categories/${item._id}`} className="absolute inset-0 z-0" aria-label={item.title}></Link>
                            
                            {/* Image & Badges */}
                            <div className="relative w-full aspect-square bg-[#F9FAFB] overflow-hidden">
                                {item.imageCover ? (
                                    <Image 
                                        src={item.imageCover} 
                                        alt={item.title}
                                        fill
                                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                                        No Image
                                    </div>
                                )}
                                
                                {isDiscounted && (
                                    <span className="absolute left-3 top-3 bg-[#FB2C36] text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm z-10">
                                        Save {discountPercentage}%
                                    </span>
                                )}

                                {/* Hover Action Buttons */}
                                <div className="absolute right-3 top-3 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 z-10">
                                    <WishlistButton productId={item._id} variant="icon" />
                                    <Link 
                                        href={`/categories/${item._id}`}
                                        className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md text-[#4A5565] hover:bg-[#16A34A] hover:text-white transition-colors"
                                        title="Quick View"
                                    >
                                        <Eye size={16} />
                                    </Link>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4 flex flex-col gap-2 flex-grow bg-white relative z-10 pointer-events-none">
                                <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                                    {item.category?.name || "Essentials"}
                                </div>
                                
                                <h3 className="text-sm font-semibold text-[#364153] line-clamp-2 min-h-[2.5rem] group-hover:text-[#16A34A] transition-colors">
                                    {item.title}
                                </h3>

                                <div className="flex items-center gap-1.5 mt-1">
                                    <div className="flex items-center gap-0.5 text-[#FCC800]">
                                        {[...Array(5)].map((_, i) => (
                                            <Star 
                                                key={i} 
                                                size={13} 
                                                fill={i < Math.round(item.ratingsAverage || 0) ? "currentColor" : "none"} 
                                                stroke={i < Math.round(item.ratingsAverage || 0) ? "none" : "currentColor"} 
                                                className={i < Math.round(item.ratingsAverage || 0) ? "" : "text-gray-300"}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-xs font-medium text-[#6A7282]">
                                        {item.ratingsAverage || "New"} ({item.ratingsQuantity || 0})
                                    </span>
                                </div>

                                <div className="flex justify-between items-end mt-auto pt-3 border-t border-slate-100 pointer-events-auto">
                                    <div className="flex flex-col">
                                        <span className="text-base font-bold text-[#1E2939]">{price} EGP</span>
                                        {isDiscounted && (
                                            <span className="text-xs text-[#6A7282] line-through">{item.price} EGP</span>
                                        )}
                                    </div>

                                    <AddToCartButton productId={item._id} variant="icon" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
