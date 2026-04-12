import Image from "next/image"
import Link from "next/link"
import { BiCategory } from "react-icons/bi"
import { FiHeadphones, FiHeart, FiLogOut, FiMenu, FiSearch, FiShoppingCart, FiUser, FiX } from "react-icons/fi"

import freshcartLogo from "@/assets/images/freshcart-logo.svg"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const categoryItems = [
    { label: "All Categories", href: "/categories" },
    { label: "Electronics", href: "/categories/electronics" },
    { label: "Women's Fashion", href: "/categories/womens-fashion" },
    { label: "Men's Fashion", href: "/categories/mens-fashion" },
    { label: "Beauty & Health", href: "/categories/beauty-health" },
]

export default function NavbarDownSide() {
    return (
        <div className="w-full bg-white sticky z-[50] top-0 border-b border-[#F3F4F6] shadow-sm">
            <div className="app-container flex h-[72px] items-center justify-between gap-4">
                <Link href="/" className="shrink-0">
                    <Image src={freshcartLogo} alt="FreshCart" priority className="h-8 w-auto" />
                </Link>

                <form className="relative hidden max-w-[672px] flex-1 lg:block">
                    <Input
                        type="text"
                        placeholder="Search for products, brands and more..."
                        className="h-[46px] rounded-full border-[#E5E7EB] bg-[#F9FAFB80] pr-14 pl-5 shadow-none placeholder:text-[#36415380]"
                    />
                    <Button
                        type="submit"
                        size="icon"
                        className="absolute top-1/2 right-1.5 size-9 -translate-y-1/2 rounded-full bg-[#16A34A] text-white hover:bg-[#15803D]"
                    >
                        <FiSearch className="size-4" />
                    </Button>
                </form>

                <nav className="hidden items-center gap-6 xl:flex">
                    <Link href="/" className="text-base font-medium text-[#364153] hover:text-[#16A34A]">
                        Home
                    </Link>
                    <Link href="/shop" className="text-base font-medium text-[#364153] hover:text-[#16A34A]">
                        Shop
                    </Link>
                    <div className="group relative">
                        <button type="button" className="flex items-center gap-1.5 text-base font-medium text-[#364153] hover:text-[#16A34A]">
                            <span>Categories</span>
                            <BiCategory className="size-4" />
                        </button>
                        <div className="invisible absolute top-full left-0 z-30 mt-2 w-56 rounded-xl border border-[#E5E7EB] bg-white p-2 opacity-0 shadow-sm transition-all duration-200 group-hover:visible group-hover:opacity-100">
                            {categoryItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="block rounded-lg px-3 py-2 text-sm font-medium text-[#364153] hover:bg-[#F3F4F6] hover:text-[#16A34A]"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <Link href="/brands" className="text-base font-medium text-[#364153] hover:text-[#16A34A]">
                        Brands
                    </Link>
                </nav>

                <div className="flex items-center gap-2 md:gap-3">
                    <Link
                        href="/support"
                        className="hidden items-center gap-2 pr-2 xl:flex"
                    >
                        <span className="flex size-10 items-center justify-center rounded-full bg-[#F0FDF4] text-[#16A34A]">
                            <FiHeadphones className="size-5" />
                        </span>
                        <span className="text-xs">
                            <span className="block text-[#99A1AF]">Support</span>
                            <span className="block font-semibold text-[#364153]">24/7 Help</span>
                        </span>
                    </Link>

                    <Link href="/wishlist" className="rounded-full p-2.5 text-[#6A7282] hover:bg-[#F3F4F6]">
                        <FiHeart className="size-5" />
                    </Link>
                    <Link href="/cart" className="rounded-full p-2.5 text-[#6A7282] hover:bg-[#F3F4F6]">
                        <FiShoppingCart className="size-5" />
                    </Link>
                    <Link href="/account" className="hidden rounded-full p-2.5 text-[#6A7282] hover:bg-[#F3F4F6] md:block">
                        <FiUser className="size-5" />
                    </Link>
                    <Sheet>
                        <SheetTrigger asChild>
                            <button type="button" className="rounded-full p-2.5 text-[#6A7282] hover:bg-[#F3F4F6] xl:hidden">
                                <FiMenu className="size-5" />
                            </button>
                        </SheetTrigger>
                        <SheetContent
                            side="right"
                            showCloseButton={false}
                            className="w-[320px] max-w-[331.5px] gap-0 overflow-y-auto border-l-0 bg-white p-0 sm:max-w-[331.5px]"
                        >
                            <SheetTitle className="sr-only">Mobile navigation menu</SheetTitle>

                            <div className="flex h-[69px] items-center justify-between bg-[#F9FAFB80] p-4">
                                <Link href="/" className="shrink-0">
                                    <Image src={freshcartLogo} alt="FreshCart" className="h-8 w-auto" />
                                </Link>
                                <SheetClose asChild>
                                    <button
                                        type="button"
                                        className="flex size-9 items-center justify-center rounded-full bg-[#F3F4F6] text-[#4A5565]"
                                    >
                                        <FiX className="size-5" />
                                    </button>
                                </SheetClose>
                            </div>

                            <form className="p-4">
                                <div className="relative">
                                    <Input
                                        type="text"
                                        placeholder="Search products..."
                                        className="h-[46px] rounded-xl border-[#E5E7EB] bg-[#F9FAFB] pr-12 pl-4 placeholder:text-[#36415380]"
                                    />
                                    <Button
                                        type="submit"
                                        size="icon-sm"
                                        className="absolute top-1/2 right-2 h-8 w-8 -translate-y-1/2 rounded-lg bg-[#16A34A] text-white hover:bg-[#15803D]"
                                    >
                                        <FiSearch className="size-4" />
                                    </Button>
                                </div>
                            </form>

                            <div className="space-y-1 px-4 py-4">
                                <Link href="/" className="flex h-12 items-center rounded-xl px-4 text-base font-medium text-[#364153] hover:bg-[#F3F4F6]">
                                    Home
                                </Link>
                                <Link href="/shop" className="flex h-12 items-center rounded-xl px-4 text-base font-medium text-[#364153] hover:bg-[#F3F4F6]">
                                    Shop
                                </Link>
                                <Link
                                    href="/categories"
                                    className="flex h-12 items-center rounded-xl px-4 text-base font-medium text-[#364153] hover:bg-[#F3F4F6]"
                                >
                                    Categories
                                </Link>
                                <div className="space-y-1 px-4 pb-1">
                                    {categoryItems.map((item) => (
                                        <Link
                                            key={`mobile-${item.href}`}
                                            href={item.href}
                                            className="block rounded-lg px-3 py-2 text-sm font-medium text-[#6A7282] hover:bg-[#F3F4F6] hover:text-[#16A34A]"
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                                <Link href="/brands" className="flex h-12 items-center rounded-xl px-4 text-base font-medium text-[#364153] hover:bg-[#F3F4F6]">
                                    Brands
                                </Link>
                            </div>

                            <div className="mx-4 border-t border-[#F3F4F6]" />

                            <div className="space-y-1 p-4">
                                <Link
                                    href="/wishlist"
                                    className="flex h-[60px] items-center justify-between rounded-xl px-4 hover:bg-[#F3F4F6]"
                                >
                                    <span className="flex items-center gap-3">
                                        <span className="flex size-9 items-center justify-center rounded-full bg-[#FEF2F2] text-[#FB2C36]">
                                            <FiHeart className="size-5" />
                                        </span>
                                        <span className="text-base font-medium text-[#364153]">Wishlist</span>
                                    </span>
                                    <span className="rounded-full bg-[#FB2C36] px-2.5 py-1 text-xs font-bold text-white">5</span>
                                </Link>
                                <Link href="/cart" className="flex h-[60px] items-center justify-between rounded-xl px-4 hover:bg-[#F3F4F6]">
                                    <span className="flex items-center gap-3">
                                        <span className="flex size-9 items-center justify-center rounded-full bg-[#F0FDF4] text-[#16A34A]">
                                            <FiShoppingCart className="size-5" />
                                        </span>
                                        <span className="text-base font-medium text-[#364153]">Cart</span>
                                    </span>
                                    <span className="rounded-full bg-[#16A34A] px-2.5 py-1 text-xs font-bold text-white">3</span>
                                </Link>
                            </div>

                            <div className="mx-4 border-t border-[#F3F4F6]" />

                            <div className="space-y-1 p-4 pb-6">
                                <Link href="/account" className="flex h-[60px] items-center gap-3 rounded-xl px-4 hover:bg-[#F3F4F6]">
                                    <span className="flex size-9 items-center justify-center rounded-full bg-[#F3F4F6] text-[#6A7282]">
                                        <FiUser className="size-5" />
                                    </span>
                                    <span className="text-base font-medium text-[#364153]">Usama</span>
                                </Link>
                                <button type="button" className="flex h-[60px] w-full items-center gap-3 rounded-xl px-4 hover:bg-[#F3F4F6]">
                                    <span className="flex size-9 items-center justify-center rounded-full bg-[#FEF2F2] text-[#FB2C36]">
                                        <FiLogOut className="size-5" />
                                    </span>
                                    <span className="text-base font-medium text-[#E7000B]">Sign Out</span>
                                </button>
                            </div>

                            <Link
                                href="/support"
                                className="mx-4 mb-4 flex items-center gap-3 rounded-xl border border-[#F3F4F6] bg-[#F9FAFB] p-4"
                            >
                                <span className="flex size-10 items-center justify-center rounded-full bg-[#DCFCE7] text-[#16A34A]">
                                    <FiHeadphones className="size-5" />
                                </span>
                                <span>
                                    <span className="block text-sm font-semibold text-[#364153]">Need Help?</span>
                                    <span className="block text-sm font-medium text-[#16A34A]">Contact Support</span>
                                </span>
                            </Link>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </div>
    )
}
