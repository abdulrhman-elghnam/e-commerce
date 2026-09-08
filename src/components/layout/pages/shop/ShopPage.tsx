"use client";

import Image from "next/image";
import Link from "next/link";
import { Loader2, Search, ShoppingBag, SlidersHorizontal, Star, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import AddToCartButton from "@/components/layout/shared/AddToCartButton";
import WishlistButton from "@/app/(main)/categories/[id]/WishlistButton";
import { getBrands, getCategories, getProducts, type Brand, type Category, type Product } from "@/lib/services/catalogService";

export default function ShopPage() {
  const searchParams = useSearchParams();
  const initialKeyword = searchParams.get("keyword") || "";
  const initialCategory = searchParams.get("category") || "";
  const initialBrand = searchParams.get("brand") || "";
  const initialSort = searchParams.get("sort") || "-ratingsAverage";

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [query, setQuery] = useState(initialKeyword);
  const [category, setCategory] = useState(initialCategory);
  const [brand, setBrand] = useState(initialBrand);
  const [sort, setSort] = useState(initialSort);
  const [loading, setLoading] = useState(true);

  const prevParamsRef = useRef({
    keyword: initialKeyword,
    category: initialCategory,
    brand: initialBrand,
    sort: initialSort,
  });

  useEffect(() => {
    const currentKw = searchParams.get("keyword") || "";
    const currentCat = searchParams.get("category") || "";
    const currentBrand = searchParams.get("brand") || "";
    const currentSort = searchParams.get("sort") || "-ratingsAverage";

    if (currentKw !== prevParamsRef.current.keyword) {
      prevParamsRef.current.keyword = currentKw;
      setQuery(currentKw);
    }
    if (currentCat !== prevParamsRef.current.category) {
      prevParamsRef.current.category = currentCat;
      setCategory(currentCat);
    }
    if (currentBrand !== prevParamsRef.current.brand) {
      prevParamsRef.current.brand = currentBrand;
      setBrand(currentBrand);
    }
    if (currentSort !== prevParamsRef.current.sort) {
      prevParamsRef.current.sort = currentSort;
      setSort(currentSort);
    }
  }, [searchParams]);

  useEffect(() => {
    Promise.all([getCategories(), getBrands({ limit: 50 })])
      .then(([categoryData, brandData]) => {
        setCategories(categoryData.data);
        setBrands(brandData.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLoading(true);
      getProducts({ limit: 40, keyword: query || undefined, category: category || undefined, brand: brand || undefined, sort })
        .then((data) => setProducts(data.data))
        .catch(() => setProducts([]))
        .finally(() => setLoading(false));
    }, 250);
    return () => window.clearTimeout(timer);
  }, [query, category, brand, sort]);

  const activeFilters = useMemo(() => {
    const list: { id: string; name: string; type: "category" | "brand" }[] = [];
    if (category) {
      const cat = categories.find((x) => x._id === category);
      if (cat) list.push({ id: category, name: cat.name, type: "category" });
    }
    if (brand) {
      const b = brands.find((x) => x._id === brand);
      if (b) list.push({ id: brand, name: b.name, type: "brand" });
    }
    return list;
  }, [category, brand, categories, brands]);

  const clearFilters = () => {
    setQuery("");
    setCategory("");
    setBrand("");
    setSort("-ratingsAverage");
  };

  const removeFilter = (type: "category" | "brand") => {
    if (type === "category") setCategory("");
    if (type === "brand") setBrand("");
  };

  return (
    <main className="min-h-screen bg-[#f7faf8] pb-20 pt-8 md:pt-28 font-['Exo']">
      <section className="app-container">
        <div className="rounded-3xl bg-[radial-gradient(circle_at_top_right,_#bbf7d0,_transparent_36%),linear-gradient(135deg,#052e16,#166534)] px-6 py-10 text-white sm:px-10 shadow-sm">
          <p className="mb-3 flex items-center gap-2 text-sm font-medium text-emerald-100">
            <ShoppingBag size={16} /> Curated essentials, delivered simply
          </p>
          <h1 className="max-w-xl text-3xl font-bold tracking-tight sm:text-5xl">
            Find the things you&apos;ll love every day.
          </h1>
          <p className="mt-4 max-w-xl text-emerald-50/80 text-sm sm:text-base">
            Browse verified brands, compare prices, and add favourites without losing your place.
          </p>
        </div>

        <div className="mt-7 grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="h-fit rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-bold text-slate-900">Filters</h2>
              <SlidersHorizontal size={18} className="text-emerald-700" />
            </div>

            <label className="mb-2 block text-sm font-semibold text-slate-700">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mb-5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            >
              <option value="">All categories</option>
              {categories.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>

            <label className="mb-2 block text-sm font-semibold text-slate-700">Brand</label>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="mb-5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            >
              <option value="">All brands</option>
              {brands.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>

            <button
              onClick={clearFilters}
              className="w-full rounded-xl bg-emerald-50 py-2.5 text-sm font-semibold text-emerald-800 hover:bg-emerald-100 transition-colors"
            >
              Reset filters
            </button>
          </aside>

          <div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative max-w-md flex-1">
                <Search size={18} className="absolute left-3 top-3 text-slate-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 shadow-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm"
                />
              </div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm shadow-sm outline-none focus:border-emerald-500"
              >
                <option value="-ratingsAverage">Top rated</option>
                <option value="price">Price: low to high</option>
                <option value="-price">Price: high to low</option>
              </select>
            </div>

            {activeFilters.length > 0 && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-slate-500">Active filters:</span>
                {activeFilters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => removeFilter(filter.type)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800 hover:bg-emerald-200 transition-colors"
                  >
                    <span>{filter.name}</span>
                    <X size={12} />
                  </button>
                ))}
                <button
                  onClick={clearFilters}
                  className="text-xs text-rose-500 hover:underline font-medium ml-1"
                >
                  Clear all
                </button>
              </div>
            )}

            <div className="mt-5 flex items-center justify-between">
              <p className="text-sm text-slate-500 font-medium">
                {loading ? "Finding products…" : `${products.length} products available`}
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center py-24">
                <Loader2 className="animate-spin text-emerald-600" size={32} />
              </div>
            ) : products.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-20 px-4 text-center">
                <p className="text-base font-medium text-slate-600">No products match these filters.</p>
                <button
                  onClick={clearFilters}
                  className="mt-3 text-sm font-semibold text-emerald-700 hover:underline"
                >
                  Reset filters and show all products
                </button>
              </div>
            ) : (
              <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => {
                  const price = product.priceAfterDiscount || product.price;
                  const discounted = Boolean(product.priceAfterDiscount && product.priceAfterDiscount < product.price);
                  return (
                    <article
                      key={product._id}
                      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg relative"
                    >
                      <Link
                        href={`/categories/${product._id}`}
                        className="relative block aspect-square bg-[#fbfcfb] overflow-hidden"
                      >
                        <Image
                          src={product.imageCover}
                          alt={product.title}
                          fill
                          className="object-contain p-6 transition duration-300 group-hover:scale-105"
                        />
                        {discounted && (
                          <span className="absolute left-3 top-3 rounded-full bg-rose-500 px-2.5 py-1 text-xs font-bold text-white shadow-sm">
                            Save {Math.round((1 - price / product.price) * 100)}%
                          </span>
                        )}
                        <div className="absolute right-3 top-3 z-10">
                          <WishlistButton productId={product._id} variant="icon" />
                        </div>
                      </Link>

                      <div className="p-4 flex flex-col flex-1">
                        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                          {product.category?.name || "Essentials"}
                        </p>
                        <Link
                          href={`/categories/${product._id}`}
                          className="mt-1 line-clamp-2 block min-h-[3rem] font-semibold text-slate-800 hover:text-emerald-700 transition-colors"
                        >
                          {product.title}
                        </Link>

                        <div className="mt-2 flex items-center gap-1 text-sm text-amber-500">
                          <Star size={14} fill="currentColor" />
                          <span className="font-semibold">{product.ratingsAverage || "New"}</span>
                          <span className="text-slate-400 text-xs">({product.ratingsQuantity || 0})</span>
                        </div>

                        <div className="mt-4 flex items-end justify-between border-t border-slate-100 pt-3">
                          <div>
                            <strong className="text-lg text-slate-900 font-bold">{price} EGP</strong>
                            {discounted && (
                              <span className="ml-2 text-xs text-slate-400 line-through">
                                {product.price} EGP
                              </span>
                            )}
                          </div>
                          <AddToCartButton productId={product._id} variant="icon" />
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
