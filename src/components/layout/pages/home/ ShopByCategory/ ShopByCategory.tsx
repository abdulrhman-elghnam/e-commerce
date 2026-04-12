import Link from "next/link"
import { FiArrowRight } from "react-icons/fi"
import type { RootShopByCat, ShopByCategoryCard } from "./ ShopByCategoryInterface"
import { getCategories } from "@/service/Categories.service";
export default async function ShopByCategory() {

    const response: RootShopByCat | { data?: RootShopByCat | ShopByCategoryCard[] } = await getCategories()
    const categories: ShopByCategoryCard[] = Array.isArray((response as RootShopByCat).data)
        ? (response as RootShopByCat).data
        : Array.isArray((response as { data?: ShopByCategoryCard[] }).data)
            ? (response as { data: ShopByCategoryCard[] }).data
            : []

    return (
        <section className="w-full py-8">
            <div className="app-container flex flex-col gap-8">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col py-8">
                        <div className="flex items-center gap-3">
                            <span className="h-8 w-1.5 rounded-full bg-linear-to-b from-[#00BC7D] to-[#007A55]" />
                            <h2 className="text-3xl leading-9 font-bold text-[#1E2939]">Shop By Category</h2>
                        </div>
                    </div>

                    <Link href="/categories" className="flex items-center text-base font-medium text-[#16A34A] hover:underline">
                        <span>View All Categories</span>
                        <FiArrowRight className="ml-2 size-4" />
                    </Link>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                    {categories.map((item) => (
                        <Link
                            key={item._id}
                            href={`/categories/${item.slug}`}
                            className="flex min-h-[148px] flex-col items-center gap-3 rounded-lg bg-white p-4 text-center shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] transition-transform hover:-translate-y-0.5"
                        >
                            <div className="flex size-20 items-center justify-center rounded-full bg-[#DCFCE7]">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="size-20 rounded-full object-cover"
                                    loading="lazy"
                                />
                            </div>
                            <h3 className="text-base font-medium text-[#364153]">{item.name}</h3>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
