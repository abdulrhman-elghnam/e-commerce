"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import Autoplay from "embla-carousel-autoplay"
import { ArrowLeft, ArrowRight } from "lucide-react"

import bannerImage from "@/assets/images/banner-4.jpeg"
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel"

const slides = [
    {
        title: "Fresh Products Delivered to your Door",
        subtitle: "Get 20% off your first order",
    },
    {
        title: "Farm-Fresh Deals Every Week",
        subtitle: "Save more on groceries you love",
    },
    {
        title: "Shop Smart, Eat Fresh Daily",
        subtitle: "Exclusive offers for members only",
    },
]

export default function Swiper() {
    const [api, setApi] = React.useState<CarouselApi>()
    const [activeIndex, setActiveIndex] = React.useState(0)

    React.useEffect(() => {
        if (!api) return
        const onSelect = () => setActiveIndex(api.selectedScrollSnap())
        onSelect()
        api.on("select", onSelect)
        return () => {
            api.off("select", onSelect)
        }
    }, [api])

    return (
        <section className="relative w-full">
            <Carousel
                setApi={setApi}
                opts={{ align: "start", loop: true }}
                plugins={[Autoplay({ delay: 4500, stopOnInteraction: false })]}
                className="relative aspect-[4/3] min-h-[360px] max-h-[520px] w-full sm:aspect-[16/7] sm:min-h-0 lg:h-100 lg:aspect-auto"
            >
                <CarouselContent className="ml-0">
                    {slides.map((slide, idx) => (
                        <CarouselItem key={slide.title} className="pl-0">
                            <div className="relative h-full min-h-[360px] sm:min-h-0 lg:h-100">
                                <Image src={bannerImage} alt={`Banner ${idx + 1}`} fill priority={idx === 0} className="object-cover" />
                                <div className="absolute inset-0 bg-linear-to-r from-[rgba(0,201,80,0.9)] to-[rgba(5,223,114,0.5)]" />

                                <div className="absolute inset-0 flex items-center app-container">
                                    <div className="max-w-215 space-y-3 sm:space-y-4">
                                        <h2 className="max-w-[300px] text-2xl leading-7 font-bold text-white sm:max-w-[384px] sm:text-3xl sm:leading-9">{slide.title}</h2>
                                        <p className="text-sm font-medium text-white sm:text-base">{slide.subtitle}</p>
                                        <div className="mt-3 flex flex-wrap items-center gap-2 sm:mt-4">
                                            <Link
                                                href="/shop"
                                                className="inline-flex min-h-11 items-center rounded-lg border-2 border-white/50 bg-white px-4 py-2 text-sm font-semibold text-[#00C950] sm:px-6 sm:text-base"
                                            >
                                                Shop Now
                                            </Link>
                                            <Link href="/shop" className="inline-flex min-h-11 items-center rounded-lg border-2 border-white/50 px-4 py-2 text-sm font-semibold text-white sm:px-6 sm:text-base">
                                                View Deals
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <button
                    type="button"
                    onClick={() => api?.scrollPrev()}
                    className="absolute top-1/2 left-2 z-20 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#00C950] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] sm:flex sm:left-4 lg:left-6"
                    aria-label="Previous slide"
                >
                    <ArrowLeft className="size-5" />
                </button>

                <button
                    type="button"
                    onClick={() => api?.scrollNext()}
                    className="absolute top-1/2 right-2 z-20 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#00C950] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] sm:flex sm:right-4 lg:right-6"
                    aria-label="Next slide"
                >
                    <ArrowRight className="size-5" />
                </button>

                <div className="absolute right-0 bottom-2 left-0 z-20 flex items-center justify-center gap-2">
                    {slides.map((_, idx) => (
                        <button
                            key={idx}
                            type="button"
                            onClick={() => api?.scrollTo(idx)}
                            className={`flex min-h-11 items-center justify-center rounded-full transition-all before:block before:h-3 before:rounded-full ${activeIndex === idx ? "w-10 before:w-8 before:bg-white" : "w-8 before:w-3 before:bg-white/50"}`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            </Carousel>
        </section>
    )
}
