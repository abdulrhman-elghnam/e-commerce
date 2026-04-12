import Image from "next/image"
import Link from "next/link"
import { FaFacebookF, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaPinterestP, FaTwitter } from "react-icons/fa"
import { MdEmail } from "react-icons/md"
import { RiSecurePaymentLine } from "react-icons/ri"
import { TbTruckDelivery } from "react-icons/tb"
import { VscRefresh } from "react-icons/vsc"

import freshcartLogo from "@/assets/images/freshcart-logo.svg"

const shopLinks = [
    { label: "All Products", href: "/shop" },
    { label: "Categories", href: "/categories" },
    { label: "Brands", href: "/brands" },
    { label: "Electronics", href: "/categories/electronics" },
    { label: "Men's Fashion", href: "/categories/mens-fashion" },
    { label: "Women's Fashion", href: "/categories/womens-fashion" },
]

const accountLinks = [
    { label: "My Account", href: "/signin" },
    { label: "Order History", href: "/cart" },
    { label: "Wishlist", href: "/wishlist" },
    { label: "Shopping Cart", href: "/cart" },
    { label: "Sign In", href: "/signin" },
    { label: "Create Account", href: "/signup" },
]

const supportLinks = [
    { label: "Contact Us", href: "/contact" },
    { label: "Help Center", href: "/contact" },
    { label: "Shipping Info", href: "/contact" },
    { label: "Returns & Refunds", href: "/contact" },
    { label: "Track Order", href: "/cart" },
]

const legalLinks = [
    { label: "Privacy Policy", href: "/contact" },
    { label: "Terms of Service", href: "/contact" },
    { label: "Cookie Policy", href: "/contact" },
]

function FooterLinkColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
    return (
        <div>
            <h3 className="mb-5 text-lg font-semibold text-white">{title}</h3>
            <ul className="space-y-3">
                {links.map((link) => (
                    <li key={link.label}>
                        <Link href={link.href} className="text-sm font-medium text-[#99A1AF] transition-colors hover:text-primary">
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default function Footer() {
    return (
        <>
            <div className="w-full border-y border-[#DCFCE7] bg-[#F0FDF4]">
                <div className="app-container grid gap-5 py-6 sm:grid-cols-2 xl:grid-cols-4">
                    <div className="flex items-center gap-3">
                        <span className="flex size-12 items-center justify-center rounded-xl bg-[#DCFCE7] text-primary">
                            <TbTruckDelivery className="size-6" />
                        </span>
                        <div>
                            <h4 className="text-sm font-semibold text-[#101828]">Free Shipping</h4>
                            <p className="text-xs font-medium text-[#6A7282]">On orders over 500 EGP</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="flex size-12 items-center justify-center rounded-xl bg-[#DCFCE7] text-primary">
                            <VscRefresh className="size-6" />
                        </span>
                        <div>
                            <h4 className="text-sm font-semibold text-[#101828]">Easy Returns</h4>
                            <p className="text-xs font-medium text-[#6A7282]">14-day return policy</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="flex size-12 items-center justify-center rounded-xl bg-[#DCFCE7] text-primary">
                            <RiSecurePaymentLine className="size-6" />
                        </span>
                        <div>
                            <h4 className="text-sm font-semibold text-[#101828]">Secure Payment</h4>
                            <p className="text-xs font-medium text-[#6A7282]">100% secure checkout</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="flex size-12 items-center justify-center rounded-xl bg-[#DCFCE7] text-primary">
                            <FaPhoneAlt className="size-5" />
                        </span>
                        <div>
                            <h4 className="text-sm font-semibold text-[#101828]">24/7 Support</h4>
                            <p className="text-xs font-medium text-[#6A7282]">Contact us anytime</p>
                        </div>
                    </div>
                </div>
            </div>

            <footer id="footer" className="w-full bg-[#101828] pt-12">
                <div className="app-container grid gap-10 pb-12 xl:grid-cols-[2fr_1fr_1fr_1fr_1fr]">
                    <div>
                        <div className="mb-7 inline-flex rounded-lg bg-white px-4 py-2">
                            <Link href="/" className="shrink-0">
                                <Image src={freshcartLogo} alt="FreshCart Logo" className="h-8 w-auto" />
                            </Link>
                        </div>

                        <p className="mb-6 max-w-[431px] text-sm leading-[23px] font-medium text-[#99A1AF]">
                            FreshCart is your one-stop destination for quality products. From fashion to electronics, we bring you
                            the best brands at competitive prices with a seamless shopping experience.
                        </p>

                        <div className="space-y-3">
                            <Link href="tel:+18001234567" className="flex items-center gap-3 text-sm font-medium text-[#99A1AF] hover:text-primary">
                                <FaPhoneAlt className="text-green-500" />
                                <span>+1 (800) 123-4567</span>
                            </Link>
                            <Link href="mailto:support@freshcart.com" className="flex items-center gap-3 text-sm font-medium text-[#99A1AF] hover:text-primary">
                                <MdEmail className="text-green-500" />
                                <span>support@freshcart.com</span>
                            </Link>
                            <div className="flex items-center gap-3 text-sm font-medium text-[#99A1AF]">
                                <FaMapMarkerAlt className="text-green-500" />
                                <span>123 Commerce Street, New York, NY 10001</span>
                            </div>
                        </div>

                        <div className="mt-7 flex items-center gap-3">
                            <Link href="https://facebook.com" className="flex size-10 items-center justify-center rounded-full bg-[#1E2939] text-[#99A1AF] hover:text-primary">
                                <FaFacebookF />
                            </Link>
                            <Link href="https://twitter.com" className="flex size-10 items-center justify-center rounded-full bg-[#1E2939] text-[#99A1AF] hover:text-primary">
                                <FaTwitter />
                            </Link>
                            <Link href="https://instagram.com" className="flex size-10 items-center justify-center rounded-full bg-[#1E2939] text-[#99A1AF] hover:text-primary">
                                <FaInstagram />
                            </Link>
                            <Link href="https://pinterest.com" className="flex size-10 items-center justify-center rounded-full bg-[#1E2939] text-[#99A1AF] hover:text-primary">
                                <FaPinterestP />
                            </Link>
                        </div>
                    </div>

                    <FooterLinkColumn title="Shop" links={shopLinks} />
                    <FooterLinkColumn title="Account" links={accountLinks} />
                    <FooterLinkColumn title="Support" links={supportLinks} />
                    <FooterLinkColumn title="Legal" links={legalLinks} />
                </div>

                <div className="border-t border-[#1E2939]">
                    <div className="app-container flex flex-col gap-4 py-6 text-sm lg:flex-row lg:items-center lg:justify-between">
                        <p className="font-medium text-[#6A7282]">© 2026 FreshCart. All rights reserved.</p>
                        <div className="flex flex-wrap items-center gap-4 text-[#6A7282]">
                            <div className="flex items-center gap-2">
                                <span>Visa</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span>Mastercard</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span>PayPal</span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}
