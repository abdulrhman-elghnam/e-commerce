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
                className="relative h-[400px]"
            >
                <CarouselContent className="ml-0">
                    {slides.map((slide, idx) => (
                        <CarouselItem key={slide.title} className="pl-0">
                            <div className="relative h-[400px]">
                                <Image src={bannerImage} alt={`Banner ${idx + 1}`} fill priority={idx === 0} className="object-cover" />
                                <div className="absolute inset-0 bg-linear-to-r from-[rgba(0,201,80,0.9)] to-[rgba(5,223,114,0.5)]" />

                                <div className="absolute inset-0 mx-auto flex w-[90%] max-w-screen-2xl items-center px-4 lg:px-6 xl:px-10 2xl:px-16">
                                    <div className="max-w-[860px] space-y-4">
                                        <h2 className="max-w-[384px] text-3xl leading-9 font-bold text-white">{slide.title}</h2>
                                        <p className="text-base font-medium text-white">{slide.subtitle}</p>
                                        <div className="mt-4 flex items-center gap-2">
                                            <Link
                                                href="/shop"
                                                className="rounded-lg border-2 border-white/50 bg-white px-6 py-2 text-base font-semibold text-[#00C950]"
                                            >
                                                Shop Now
                                            </Link>
                                            <Link href="/shop" className="rounded-lg border-2 border-white/50 px-6 py-2 text-base font-semibold text-white">
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
          className="absolute top-1/2 left-2 z-20 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#00C950] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] sm:left-4 lg:left-6"
                    aria-label="Previous slide"
                >
                    <ArrowLeft className="size-5" />
                </button>

                <button
                    type="button"
                    onClick={() => api?.scrollNext()}
          className="absolute top-1/2 right-2 z-20 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#00C950] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] sm:right-4 lg:right-6"
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
                            className={`h-3 rounded-full transition-all ${activeIndex === idx ? "w-8 bg-white" : "w-3 bg-white/50"}`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            </Carousel>
        </section>
    )
}
