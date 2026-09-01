import React from 'react'
import {
    Home, ChevronRight, Star, ShoppingCart, Zap, Heart,
    ArrowLeftRight, Truck, RefreshCcw, ShieldCheck, FileText,
    MessageSquare, CheckCircle2, Eye
} from 'lucide-react'
import Link from 'next/link'

// shadcn UI imports
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent } from '@/components/ui/card'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from '@/components/ui/carousel'
import { Data } from './interface';
import ProductGallery from './ProductGallery';
import WishlistButton from './WishlistButton';
import AddToCartButton from '@/components/layout/shared/AddToCartButton';
import ReviewsPanel from './ReviewsPanel';

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`, { cache: "no-store" });
    if (!res.ok) return <section className="app-container py-32 text-center text-slate-600">This product is no longer available.</section>;
    const result = await res.json();
    const item:Data = result.data;

    return (
        <section className="container mx-auto px-4 sm:px-8 lg:px-12 py-8 flex flex-col gap-8">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm font-medium text-[#6A7282] gap-2 flex-wrap">
                <span className="flex items-center gap-1 hover:text-[#101828] cursor-pointer transition-colors">
                    <Home size={14} /> Home
                </span>
                <ChevronRight size={14} className="text-[#99A1AF]" />
                <span className="hover:text-[#101828] cursor-pointer transition-colors">{item?.category?.name || 'Category'}</span>
                <ChevronRight size={14} className="text-[#99A1AF]" />
                <span className="text-[#101828]">{item?.title || 'Loading...'}</span>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start">

                {/* Left: Product Images */}
                <ProductGallery 
                    images={item?.images || []} 
                    imageCover={item?.imageCover} 
                    title={item?.title || 'Product Image'} 
                />

                {/* Right: Product Info */}
                <Card className="flex-1 rounded-xl shadow-sm border-[#E5E7EB] flex flex-col w-full">
                    <CardContent className="p-6 md:p-8">
                        {/* Tags */}
                        <div className="flex items-center gap-3 mb-4">
                            <Badge variant="outline" className="px-4 py-1.5 bg-[#F0FDF4] text-[#15803D] hover:bg-[#F0FDF4] border-transparent font-semibold uppercase tracking-wide">
                                Official Brand
                            </Badge>
                            <Badge variant="secondary" className="px-4 py-1.5 bg-[#F3F4F6] text-[#364153] hover:bg-[#F3F4F6] border-transparent font-semibold uppercase tracking-wide">
                                {item?.brand?.name || item?.slug || 'Brand'}
                            </Badge>
                        </div>

                        <h1 className="text-2xl sm:text-3xl font-bold text-[#101828] mb-3 leading-snug">{item?.title || 'Loading...'}</h1>

                        {/* Ratings */}
                        <div className="flex items-center gap-3 mb-5">
                            <div className="flex items-center gap-0.5 text-[#FCC800]">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} fill={i < Math.round(item?.ratingsAverage || 0) ? "currentColor" : "none"} className={i < Math.round(item?.ratingsAverage || 0) ? "" : "text-slate-300"} stroke="currentColor" />
                                ))}
                            </div>
                            <span className="text-sm font-medium text-[#4A5565]">{item?.ratingsAverage || '4.8'} ({item?.ratingsQuantity || '0'} reviews)</span>
                        </div>

                        {/* Price */}
                        <div className="text-3xl font-bold text-[#101828] mb-4">{item?.price} EGP</div>

                        {/* Stock status */}
                        <Badge variant="outline" className="flex items-center gap-2 px-3 py-1.5 bg-[#F0FDF4] text-[#008236] hover:bg-[#F0FDF4] border-transparent w-fit mb-6 text-sm font-medium">
                            <div className="w-2 h-2 rounded-full bg-[#00C950]"></div>
                            In Stock
                        </Badge>

                        <Separator className="bg-[#F3F4F6] mb-7 mt-6" />

                        {/* Short Description */}
                        <div className="mb-7">
                            <p className="text-base font-medium text-[#4A5565] leading-relaxed line-clamp-3">
                                {item?.description}
                            </p>
                        </div>

                        {/* Quantity Picker */}
                        <div className="mb-7 flex flex-col gap-3">
                            <label className="text-sm font-semibold text-[#364153]">Quantity</label>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center justify-between border-2 border-[#E5E7EB] rounded-xl w-[140px] h-12 overflow-hidden bg-white">
                                    <button className="w-12 h-full flex items-center justify-center text-[#4A5565] opacity-50 hover:bg-gray-50 transition-colors text-lg font-medium">-</button>
                                    <span className="font-semibold text-[#364153] text-lg">1</span>
                                    <button className="w-12 h-full flex items-center justify-center text-[#4A5565] hover:bg-gray-50 transition-colors text-lg font-medium">+</button>
                                </div>
                                <span className="text-sm font-medium text-[#6A7282]">{item?.quantity || 0} available</span>
                            </div>
                        </div>

                        {/* Total Price Summary */}
                        <div className="flex items-center justify-between bg-[#F9FAFB] p-5 rounded-xl mb-7 border border-gray-100">
                            <span className="text-base font-semibold text-[#4A5565]">Price:</span>
                            <span className="text-2xl font-bold text-[#16A34A]">{item?.price} EGP</span>
                        </div>

                        {/* Primary Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-5">
                            <AddToCartButton productId={item?._id || item?.id || ''} />
                            <Button className="flex-1 h-14 bg-[#101828] text-white rounded-xl shadow-lg shadow-gray-900/20 gap-3 font-semibold text-base hover:bg-gray-800">
                                <Zap size={20} strokeWidth={2.5} /> Buy Now
                            </Button>
                        </div>

                        {/* Secondary Actions */}
                        <div className="flex items-center gap-4 mb-8">
                            <WishlistButton productId={item?._id || item?.id || ''} />
                            <Button variant="outline" size="icon" className="w-[56px] h-[52px] shrink-0 border-2 border-[#E5E7EB] rounded-xl text-[#364153] hover:bg-gray-50 hover:text-[#364153]">
                                <ArrowLeftRight size={18} strokeWidth={2.5} />
                            </Button>
                        </div>

                        <Separator className="bg-[#F3F4F6] mb-7" />

                        {/* Guarantees */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-auto">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-[#DCFCE7] rounded-full flex items-center justify-center text-[#16A34A] shrink-0">
                                    <Truck size={18} strokeWidth={2.5} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-[#101828]">Free Delivery</h4>
                                    <p className="text-xs font-medium text-[#6A7282] mt-0.5">Orders over $50</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-[#DCFCE7] rounded-full flex items-center justify-center text-[#16A34A] shrink-0">
                                    <RefreshCcw size={18} strokeWidth={2.5} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-[#101828]">30 Days Return</h4>
                                    <p className="text-xs font-medium text-[#6A7282] mt-0.5">Money back</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-[#DCFCE7] rounded-full flex items-center justify-center text-[#16A34A] shrink-0">
                                    <ShieldCheck size={18} strokeWidth={2.5} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-[#101828]">Secure Payment</h4>
                                    <p className="text-xs font-medium text-[#6A7282] mt-0.5">100% Protected</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Details Tabs Section */}
            <Card className="rounded-xl shadow-sm border-[#E5E7EB] flex flex-col mt-4">
                <div className="flex border-b border-[#E5E7EB] overflow-x-auto scrollbar-hide">
                    <button className="px-6 py-5 flex items-center gap-2 bg-[#F0FDF4] border-b-[3px] border-[#16A34A] text-[#16A34A] font-semibold shrink-0">
                        <FileText size={18} strokeWidth={2.5} /> Product Details
                    </button>
                    <button className="px-6 py-5 flex items-center gap-2 text-[#4A5565] hover:bg-gray-50 border-b-[3px] border-transparent font-medium shrink-0 transition-colors">
                        <MessageSquare size={18} strokeWidth={2.5} /> Reviews ({item?.ratingsQuantity || 0})
                    </button>
                    <button className="px-6 py-5 flex items-center gap-2 text-[#4A5565] hover:bg-gray-50 border-b-[3px] border-transparent font-medium shrink-0 transition-colors">
                        <RefreshCcw size={18} strokeWidth={2.5} /> Shipping & Returns
                    </button>
                </div>

                <CardContent className="p-6 md:p-8 lg:p-10 flex flex-col gap-8">
                    <div>
                        <h3 className="text-lg font-bold text-[#101828] mb-3">About this Product</h3>
                        <p className="text-base font-medium text-[#4A5565] leading-relaxed max-w-4xl">
                            {item?.description}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Product Information List */}
                        <div className="bg-[#F9FAFB] rounded-xl p-6 border border-gray-100">
                            <h4 className="text-base font-bold text-[#101828] mb-5">Product Information</h4>
                            <ul className="flex flex-col gap-4">
                                <li className="flex justify-between items-center pb-3 border-b border-gray-200">
                                    <span className="text-sm font-medium text-[#6A7282]">Category</span>
                                    <span className="text-sm font-semibold text-[#101828]">{item?.category?.name || 'N/A'}</span>
                                </li>
                                <li className="flex justify-between items-center pb-3 border-b border-gray-200">
                                    <span className="text-sm font-medium text-[#6A7282]">Subcategory</span>
                                    <span className="text-sm font-semibold text-[#101828]">{item?.subcategory?.[0]?.name || 'N/A'}</span>
                                </li>
                                <li className="flex justify-between items-center pb-3 border-b border-gray-200">
                                    <span className="text-sm font-medium text-[#6A7282]">Brand</span>
                                    <span className="text-sm font-semibold text-[#101828]">{item?.brand?.name || 'N/A'}</span>
                                </li>
                                <li className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-[#6A7282]">Items Sold</span>
                                    <span className="text-sm font-semibold text-[#101828]">{item?.sold || 0}+ sold</span>
                                </li>
                            </ul>
                        </div>

                        {/* Key Features */}
                        <div className="bg-[#F9FAFB] rounded-xl p-6 border border-gray-100">
                            <h4 className="text-base font-bold text-[#101828] mb-5">Key Features</h4>
                            <ul className="flex flex-col gap-4">
                                <li className="flex items-center gap-3">
                                    <CheckCircle2 size={18} className="text-[#16A34A]" strokeWidth={2.5} />
                                    <span className="text-sm font-medium text-[#4A5565]">Premium Quality Product</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle2 size={18} className="text-[#16A34A]" strokeWidth={2.5} />
                                    <span className="text-sm font-medium text-[#4A5565]">100% Authentic Guarantee</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle2 size={18} className="text-[#16A34A]" strokeWidth={2.5} />
                                    <span className="text-sm font-medium text-[#4A5565]">Fast & Secure Packaging</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle2 size={18} className="text-[#16A34A]" strokeWidth={2.5} />
                                    <span className="text-sm font-medium text-[#4A5565]">Quality Tested</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <ReviewsPanel productId={item?._id || item?.id || ''} />

        </section>
    )
}
