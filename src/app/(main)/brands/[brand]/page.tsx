"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Loader2, X } from "lucide-react";

type Brand = {
  _id: string;
  name: string;
  image: string;
};

type Product = {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
  priceAfterDiscount?: number;
  ratingsAverage?: number;
  ratingsQuantity?: number;
  category?: { name?: string };
};

const API_BASE = "https://ecommerce.routemisr.com/api/v1";

export default function BrandProductsPage() {
  const params = useParams<{ brand: string }>();
  const brandId = params?.brand;

  const [brand, setBrand] = useState<Brand | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBrandAndProducts = async () => {
      if (!brandId) return;

      setIsLoading(true);
      setError(null);

      try {
        const [brandRes, productsRes] = await Promise.all([
          fetch(`${API_BASE}/brands/${brandId}`),
          fetch(`${API_BASE}/products?brand=${brandId}&limit=50`),
        ]);

        if (!brandRes.ok || !productsRes.ok) {
          throw new Error("Failed to load brand page data.");
        }

        const brandJson = await brandRes.json();
        const productsJson = await productsRes.json();

        setBrand(brandJson?.data ?? null);
        setProducts(Array.isArray(productsJson?.data) ? productsJson.data : []);
      } catch {
        setError("Failed to load this brand page. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    loadBrandAndProducts();
  }, [brandId]);

  const hasProducts = useMemo(() => products.length > 0, [products.length]);

  return (
    <section className="min-h-screen bg-[rgba(249,250,251,0.5)] font-['Exo']">
      <div className="w-full bg-gradient-to-r from-[#16A34A] to-[#22C55E] py-10">
        <div className="container max-w-[1536px] mx-auto px-4 md:px-12">
          <nav className="text-sm text-white/80 mb-5">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/brands" className="hover:text-white transition-colors">
              Brands
            </Link>
            {brand?.name && (
              <>
                <span className="mx-2">/</span>
                <span className="text-white">{brand.name}</span>
              </>
            )}
          </nav>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center">
              {brand?.image ? (
                <Image
                  src={brand.image}
                  alt={brand.name}
                  width={40}
                  height={40}
                  className="object-contain"
                />
              ) : (
                <span className="text-white text-lg font-bold">B</span>
              )}
            </div>

            <div>
              <h1 className="text-4xl font-bold text-white">{brand?.name || "Brand"}</h1>
              <p className="text-white/85 text-base">
                Shop {brand?.name || "brand"} products
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-[1536px] mx-auto px-4 md:px-12 py-8">
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[#16A34A]" />
          </div>
        )}

        {error && !isLoading && (
          <div className="text-center py-20">
            <p className="text-[#6A7282] mb-2">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="text-[#16A34A] hover:underline font-medium"
            >
              Refresh
            </button>
          </div>
        )}

        {!isLoading && !error && (
          <>
            <div className="flex items-center gap-3 mb-5 text-sm">
              <span className="text-[#4A5565] font-medium">Active Filters:</span>
              <span className="inline-flex items-center gap-2 bg-[#F3F0FF] text-[#7F22FE] px-3 py-1 rounded-full font-medium">
                {brand?.name || "Brand"}
                <X className="w-3 h-3" />
              </span>
              <Link href="/brands" className="text-[#6A7282] underline">
                Clear all
              </Link>
            </div>

            <p className="text-[#6A7282] mb-6">Showing {products.length} products</p>

            {hasProducts ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => {
                  const hasDiscount =
                    product.priceAfterDiscount &&
                    product.priceAfterDiscount < product.price;

                  return (
                    <Link
                      key={product._id}
                      href={`/categories/${product._id}`}
                      className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="relative h-56 bg-white">
                        <Image
                          src={product.imageCover}
                          alt={product.title}
                          fill
                          className="object-contain p-4"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-xs text-[#6A7282] mb-1">
                          {product.category?.name || "Category"}
                        </p>
                        <h3 className="text-[#364153] font-medium line-clamp-2 min-h-12">
                          {product.title}
                        </h3>
                        <p className="text-xs text-[#6A7282] mt-1">
                          {product.ratingsAverage || 0} ({product.ratingsQuantity || 0})
                        </p>
                        <div className="mt-3 flex items-end gap-2">
                          <span className="text-[#111827] font-bold text-xl">
                            {hasDiscount ? product.priceAfterDiscount : product.price} EGP
                          </span>
                          {hasDiscount && (
                            <span className="text-[#9CA3AF] line-through text-sm">
                              {product.price} EGP
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-[#6A7282]">No products found for this brand.</p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
