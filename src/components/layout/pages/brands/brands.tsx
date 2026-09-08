"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Loader2, ArrowRight, Tag } from "lucide-react";

const API_BASE = "https://ecommerce.routemisr.com/api/v1";

interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

interface BrandsResponse {
  data?: Brand[];
  metadata?: {
    numberOfPages?: number;
  };
  message?: string;
}

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllBrands = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const limit = 10;
        const keyword = "";
        const queryBase = new URLSearchParams({ limit: String(limit) });
        if (keyword.trim()) {
          queryBase.set("keyword", keyword);
        }

        const firstPageHttpResponse = await fetch(
          `${API_BASE}/brands?${queryBase.toString()}`
        );

        if (!firstPageHttpResponse.ok) {
          throw new Error("Failed to fetch first brands page.");
        }

        const firstPageResponse =
          (await firstPageHttpResponse.json()) as BrandsResponse;

        const firstPageBrands = firstPageResponse.data ?? [];
        if (!Array.isArray(firstPageBrands)) {
          throw new Error(firstPageResponse.message || "Invalid brands response.");
        }
        const totalPages = firstPageResponse.metadata?.numberOfPages ?? 1;

        if (totalPages <= 1) {
          setBrands(firstPageBrands);
          return;
        }

        const remainingPages = await Promise.all(
          Array.from({ length: totalPages - 1 }, (_, index) => {
            const page = index + 2;
            const params = new URLSearchParams({
              limit: String(limit),
              page: String(page),
            });
            if (keyword.trim()) {
              params.set("keyword", keyword);
            }
            return fetch(`${API_BASE}/brands?${params.toString()}`).then(async (r) => {
              if (!r.ok) {
                throw new Error(`Failed to fetch brands page ${page}.`);
              }
              return (await r.json()) as BrandsResponse;
            });
          })
        );

        const remainingBrands = remainingPages.flatMap((page) => page.data ?? []);
        setBrands([...firstPageBrands, ...remainingBrands]);
      } catch {
        setError("Failed to load brands. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllBrands();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center pb-10 gap-10 bg-[rgba(249,250,251,0.5)] font-['Exo']">
      {/* Hero Header */}
      <div className="w-full flex flex-col items-start px-4 md:px-12 lg:px-[192px] bg-gradient-to-r from-[#15803D] via-[#16A34A] to-[#22C55E]">
        <div className="container max-w-[1536px] w-full mx-auto flex flex-col items-start px-4 py-16 gap-6" style={{ height: 240 }}>
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2">
            <Link
              href="/"
              className="text-[14px] leading-[20px] font-medium text-white/70 hover:text-white transition-colors"
            >
              Home
            </Link>
            <span className="text-[14px] leading-[20px] font-medium text-white/40">
              /
            </span>
            <span className="text-[14px] leading-[20px] font-medium text-white">
              Brands
            </span>
          </nav>

          {/* Title Section */}
          <div className="flex items-center gap-5">
            {/* Icon */}
            <div className="relative w-16 h-16 flex items-center justify-center rounded-2xl bg-white/20 backdrop-blur-[4px] shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] border border-white/30">
              <Tag className="w-[30px] h-[30px] text-white" strokeWidth={2.2} />
            </div>

            {/* Text */}
            <div className="flex flex-col gap-1">
              <h1 className="text-[36px] leading-[40px] font-bold text-white tracking-[-0.9px]">
                Top Brands
              </h1>
              <p className="text-[16px] leading-[24px] font-medium text-white/80">
                Shop authentic products from your favorite certified brands
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-[#16A34A]" />
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <p className="text-[16px] text-[#6A7282] font-medium">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-[14px] font-medium text-[#16A34A] hover:underline"
          >
            Try again
          </button>
        </div>
      )}

      {!isLoading && !error && brands.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-2">
          <p className="text-[16px] text-[#6A7282] font-medium">No brands found.</p>
          <button
            onClick={() => window.location.reload()}
            className="text-[14px] font-medium text-[#16A34A] hover:underline"
          >
            Refresh
          </button>
        </div>
      )}

      {/* Brands Grid */}
      {!isLoading && !error && brands.length > 0 && (
        <div className="container max-w-[1536px] w-full mx-auto px-4 md:px-12 lg:px-4 -mt-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
            {brands.map((brand) => (
              <Link
                key={brand._id}
                href={`/brands/${brand._id}`}
                className="group relative flex flex-col bg-white border border-[#F3F4F6] hover:border-[#16A34A]/30 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                style={{
                  boxShadow:
                    "0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1)",
                }}
              >
                {/* Brand Image Container */}
                <div className="flex items-center justify-center p-4 mx-[21px] mt-[21px] bg-[#F9FAFB] rounded-xl aspect-square group-hover:bg-emerald-50/50 transition-colors">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    width={160}
                    height={160}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Brand Name */}
                <div className="flex flex-col items-center px-[21px] pt-3 pb-2">
                  <h3 className="text-[14px] leading-[20px] font-semibold text-[#101828] group-hover:text-[#16A34A] transition-colors text-center">
                    {brand.name}
                  </h3>
                </div>

                {/* View Products Link - appears on hover */}
                <div className="flex justify-center items-start px-[21px] pb-[21px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="flex items-center gap-1 text-[12px] leading-[16px] font-semibold text-[#16A34A]">
                    View Products
                    <ArrowRight className="w-[12.5px] h-[10px]" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
