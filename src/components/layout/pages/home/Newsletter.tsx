"use client"

import { FormEvent, useState } from "react"
import Link from "next/link"
import { FiArrowRight, FiCheck, FiMail, FiSmartphone } from "react-icons/fi"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const newsletterSchema = z.object({
    email: z.email("Please enter a valid email address"),
})

const perks = ["Fresh Picks Weekly", "Free Delivery Codes", "Members-Only Deals"]

export default function Newsletter() {
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const result = newsletterSchema.safeParse({ email })

        if (!result.success) {
            setSuccess("")
            setError(result.error.issues[0]?.message ?? "Invalid email")
            return
        }

        setError("")
        setSuccess("Thanks for subscribing! Check your inbox for confirmation.")
        setEmail("")
    }

    return (
        <section className="w-full py-10">
            <div className="app-container">
                <div className="relative grid min-h-[504px] gap-8 rounded-3xl bg-[#F0FDF4] p-6 lg:grid-cols-[1.7fr_1fr] lg:p-14">
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <span className="flex size-14 items-center justify-center rounded-2xl bg-linear-to-br from-[#00BC7D] to-[#00BBA7] text-white shadow-[0px_10px_15px_-3px_rgba(0,188,125,0.3),0px_4px_6px_-4px_rgba(0,188,125,0.3)]">
                            <FiMail className="size-6" />
                        </span>
                        <div>
                            <h3 className="text-sm font-semibold tracking-[0.35px] text-[#009966] uppercase">Newsletter</h3>
                            <p className="text-xs font-medium text-[#6A7282]">50,000+ subscribers</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-3xl leading-tight font-bold text-[#101828] lg:text-4xl">Get the Freshest Updates Delivered Free</h2>
                        <p className="text-base font-medium text-[#6A7282] lg:text-lg">Weekly recipes, seasonal offers &amp; exclusive member perks.</p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        {perks.map((perk) => (
                            <div
                                key={perk}
                                className="flex items-center gap-2 rounded-full border border-[#D0FAE5] bg-white/80 px-4 py-2.5 shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] backdrop-blur-xs"
                            >
                                <span className="flex size-7 items-center justify-center rounded-full bg-[#D0FAE5] text-[#009966]">
                                    <FiCheck className="size-4" />
                                </span>
                                <span className="text-sm font-medium text-[#364153]">{perk}</span>
                            </div>
                        ))}
                    </div>

                    <form className="space-y-3 pt-2" onSubmit={handleSubmit} noValidate>
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <Input
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                placeholder="you@example.com"
                                aria-invalid={Boolean(error)}
                                className="h-[60px] rounded-2xl border-2 border-[#E5E7EB] bg-white px-5 text-base shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]"
                            />
                            <Button
                                type="submit"
                                className="h-[60px] rounded-2xl bg-linear-to-r from-[#009966] to-[#00BC7D] px-8 text-base font-semibold text-white shadow-[0px_10px_15px_-3px_rgba(0,188,125,0.3),0px_4px_6px_-4px_rgba(0,188,125,0.3)]"
                            >
                                Subscribe
                                <FiArrowRight className="size-4" />
                            </Button>
                        </div>

                        <p className={`pl-1 text-xs font-medium ${error ? "text-red-500" : success ? "text-[#009966]" : "text-[#99A1AF]"}`}>
                            {error || success || "Unsubscribe anytime. No spam, ever."}
                        </p>
                    </form>
                </div>

                <div className="flex items-center lg:pl-4">
                    <div className="relative w-full overflow-hidden rounded-3xl bg-linear-to-br from-[#101828] to-[#1E2939] p-8">
                        <div className="absolute top-0 right-0 size-32 rounded-full bg-[#00BC7D]/20 blur-2xl" />
                        <div className="absolute bottom-0 left-0 size-24 rounded-full bg-[#00BBA7]/20 blur-2xl" />

                        <div className="relative z-10">
                            <span className="inline-block rounded-full border border-[#00BC7D]/30 bg-[#00BC7D]/20 px-3 py-1 text-xs font-semibold tracking-[0.25px] text-[#00D492] uppercase">
                                Mobile App
                            </span>

                            <h3 className="mt-5 text-2xl font-bold text-white">Shop Faster on Our App</h3>
                            <p className="mt-3 text-sm font-medium text-[#99A1AF]">Get app-exclusive deals &amp; 15% off your first order.</p>

                            <div className="mt-4 space-y-3">
                                <Link href="#" className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/10 px-4 py-3">
                                    <FiSmartphone className="size-5 text-white" />
                                    <div>
                                        <div className="text-[10px] font-medium tracking-[0.25px] text-[#99A1AF] uppercase">Download on</div>
                                        <div className="text-sm font-semibold text-white">App Store</div>
                                    </div>
                                </Link>
                                <Link href="#" className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/10 px-4 py-3">
                                    <FiSmartphone className="size-5 text-white" />
                                    <div>
                                        <div className="text-[10px] font-medium tracking-[0.25px] text-[#99A1AF] uppercase">Get it on</div>
                                        <div className="text-sm font-semibold text-white">Google Play</div>
                                    </div>
                                </Link>
                            </div>

                            <div className="mt-5 flex items-center gap-2 text-sm font-medium">
                                <span className="text-[#FDC700]">★★★★★</span>
                                <span className="text-[#99A1AF]">4.9 • 100K+ downloads</span>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
    )
}
