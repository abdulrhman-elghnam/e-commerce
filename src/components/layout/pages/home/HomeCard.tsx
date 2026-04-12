"use client"

import FadeAnimationLTR from "@/animation/FadeAnimationLTR"
import FadeAnimationRTL from "@/animation/FadeAnimationRTL"
import Link from "next/link"
import { FiArrowRight } from "react-icons/fi"

const cards = [
    {
        badge: "Deal of the Day",
        badgeIcon: "🔥",
        title: "Fresh Organic Fruits",
        description: "Get up to 40% off on selected organic fruits",
        discount: "40% OFF",
        code: "Use code: ORGANIC40",
        cta: "Shop Now",
        ctaHref: "/shop",
        gradient: "from-[#00BC7D] to-[#007A55]",
        ctaColor: "text-[#009966]",
    },
    {
        badge: "New Arrivals",
        badgeIcon: "✨",
        title: "Exotic Vegetables",
        description: "Discover our latest collection of premium vegetables",
        discount: "25% OFF",
        code: "Use code: FRESH25",
        cta: "Explore Now",
        ctaHref: "/shop",
        gradient: "from-[#FF8904] to-[#FF2056]",
        ctaColor: "text-[#FF6900]",
    },
]

export default function HomeCard() {
    return (
        <section className="w-full py-8">
            <div className="app-container grid grid-cols-1 gap-6 md:grid-cols-2">
                {cards.map((card, idx) => {
                    const CardContent = (
                        <div className={`relative isolate h-[300px] overflow-hidden rounded-2xl bg-linear-to-br ${card.gradient} p-8`}>
                            <div className="absolute -top-20 -right-20 size-40 rounded-full bg-white/10" />
                            <div className="absolute -bottom-16 -left-16 size-32 rounded-full bg-white/10" />

                            <div className="relative z-10 flex h-full flex-col">
                                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white">
                                    <span>{card.badgeIcon}</span>
                                    <span>{card.badge}</span>
                                </span>

                                <h3 className="mt-4 text-3xl leading-9 font-bold text-white">{card.title}</h3>
                                <p className="mt-2 text-base font-medium text-white/80">{card.description}</p>

                                <div className="mt-4 flex items-center gap-4">
                                    <span className="text-3xl leading-9 font-bold text-white">{card.discount}</span>
                                    <span className="text-sm font-medium text-white/70">{card.code}</span>
                                </div>

                                <Link
                                    href={card.ctaHref}
                                    className={`mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-base font-semibold ${card.ctaColor}`}
                                >
                                    <span>{card.cta}</span>
                                    <FiArrowRight className="size-4" />
                                </Link>
                            </div>
                        </div>
                    )

                    return (
                        <div key={card.title}>
                            {idx % 2 === 0 ? <FadeAnimationLTR>{CardContent}</FadeAnimationLTR> : <FadeAnimationRTL>{CardContent}</FadeAnimationRTL>}
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
