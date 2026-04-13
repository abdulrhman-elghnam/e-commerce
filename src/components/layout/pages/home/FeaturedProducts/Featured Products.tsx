import React from 'react';
import { Eye, Heart, ArrowLeftRight, Star, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getAllProducts } from '@/service/Products.service';
import AddToCartButton from '@/components/layout/shared/AddToCartButton';

export default async function FeaturedProducts() {
    const response = await getAllProducts();
    const data = response?.data || [];
    
    return (
        <section className="container mx-auto px-4 sm:px-8 py-16 flex flex-col gap-8">
            <div className="flex items-center gap-3">
                <div className="w-[6px] h-8 bg-gradient-to-b from-[#00BC7D] to-[#007A55] rounded-full"></div>
                <h2 className="text-3xl font-bold text-[#1E2939]">Featured Products</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {data.map((item: any) => {
                    const isDiscounted = item.priceAfterDiscount && item.priceAfterDiscount < item.price;
                    const discountPercentage = isDiscounted 
                        ? Math.round(((item.price - item.priceAfterDiscount) / item.price) * 100) 
                        : 0;

                    return (
                        <div key={item._id} className="flex flex-col bg-white border border-[#E5E7EB] rounded-xl group hover:shadow-lg transition-shadow duration-300 relative overflow-hidden">
                            {/* Clickable Card Overlay */}
                            <Link href={`/categories/${item._id}`} className="absolute inset-0 z-0"></Link>
                            
                            {/* Image & Badges */}
                            <div className="relative w-full aspect-[4/5] sm:h-[240px] bg-white overflow-hidden pointer-events-none">
                                <img 
                                    src={item.imageCover} 
                                    alt={item.title} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                
                                {isDiscounted && (
                                    <span className="absolute left-3 top-3 bg-[#FB2C36] text-white text-xs font-medium px-2 py-1 rounded">
                                        -{discountPercentage}%
                                    </span>
                                )}

                                {/* Action Buttons */}
                                <div className="absolute right-3 top-3 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 z-10 pointer-events-auto">
                                    <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md text-[#4A5565] hover:bg-[#16A34A] hover:text-white transition-colors" title="Quick View">
                                        <Eye size={16} />
                                    </button>
                                    <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md text-[#4A5565] hover:bg-[#FB2C36] hover:text-white transition-colors" title="Add to Wishlist">
                                        <Heart size={16} />
                                    </button>
                                    <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md text-[#4A5565] hover:bg-[#16A34A] hover:text-white transition-colors" title="Compare">
                                        <ArrowLeftRight size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4 flex flex-col gap-2 flex-grow bg-white relative z-10 pointer-events-none">
                                <div className="text-xs font-medium text-[#6A7282]">
                                    {item.category?.name || "Category"}
                                </div>
                                
                                <span className="text-base font-medium text-[#364153] line-clamp-2 h-12 group-hover:text-[#16A34A] transition-colors">
                                    {item.title}
                                </span>

                                <div className="flex items-center mt-1">
                                    <div className="flex items-center gap-0.5 text-[#FCC800]">
                                        {[...Array(5)].map((_, i) => (
                                            <Star 
                                                key={i} 
                                                size={14} 
                                                fill={i < Math.round(item.ratingsAverage || 0) ? "currentColor" : "none"} 
                                                stroke={i < Math.round(item.ratingsAverage || 0) ? "none" : "currentColor"} 
                                                className={i < Math.round(item.ratingsAverage || 0) ? "" : "text-gray-300"}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-xs font-medium text-[#6A7282] ml-2 mt-0.5">
                                        {item.ratingsAverage} ({item.ratingsQuantity || 0})
                                    </span>
                                </div>

                                <div className="flex justify-between items-end mt-auto pt-4 pointer-events-auto">
                                    <div className="flex flex-col">
                                        {isDiscounted ? (
                                            <>
                                                <span className="text-lg leading-none font-bold text-[#16A34A]">{item.priceAfterDiscount} EGP</span>
                                                <span className="text-sm font-medium text-[#6A7282] line-through mt-1">{item.price} EGP</span>
                                            </>
                                        ) : (
                                            <span className="text-lg leading-none font-bold text-[#1E2939]">{item.price} EGP</span>
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
