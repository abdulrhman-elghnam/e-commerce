import Link from "next/link"
import Image from "next/image"
import { FiArrowRight } from "react-icons/fi"
import type { RootShopByCat, ShopByCategoryCard } from "./ShopByCategoryInterface"
import { getCategories } from "@/service/Categories.service"

export default async function ShopByCategory() {
    const response: RootShopByCat | { data?: RootShopByCat | ShopByCategoryCard[] } = await getCategories()
    const categories: ShopByCategoryCard[] = Array.isArray((response as RootShopByCat).data)
        ? (response as RootShopByCat).data
        : Array.isArray((response as { data?: ShopByCategoryCard[] }).data)
            ? (response as { data: ShopByCategoryCard[] }).data
            : []

    return (
        <section className="w-full py-10">
            <div className="app-container flex flex-col gap-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="h-8 w-1.5 rounded-full bg-gradient-to-b from-[#16A34A] to-[#15803D]" />
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-[#1E2939]">Shop By Category</h2>
                            <p className="text-sm text-[#6A7282] mt-0.5">Explore our top collections of daily essentials</p>
                        </div>
                    </div>

                    <Link 
                        href="/categories" 
                        className="inline-flex items-center text-sm sm:text-base font-semibold text-[#16A34A] hover:text-[#15803D] group transition-colors"
                    >
                        <span>View All</span>
                        <FiArrowRight className="ml-1.5 size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
                    {categories.slice(0, 6).map((item) => (
                        <Link
                            key={item._id}
                            href={`/shop?category=${item._id}`}
                            className="group flex flex-col items-center gap-3 rounded-2xl bg-white border border-[#E5E7EB] p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#16A34A]/40 hover:shadow-md"
                        >
                            <div className="relative size-20 sm:size-24 rounded-full bg-[#F0FDF4] p-2 flex items-center justify-center overflow-hidden border border-emerald-100 group-hover:scale-105 transition-transform duration-300">
                                {item.image ? (
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        width={96}
                                        height={96}
                                        className="size-full rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="size-full rounded-full bg-emerald-100" />
                                )}
                            </div>
                            <h3 className="text-sm sm:text-base font-semibold text-[#364153] group-hover:text-[#16A34A] transition-colors line-clamp-1">
                                {item.name}
                            </h3>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
