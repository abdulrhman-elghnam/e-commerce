"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import { BiCategory } from "react-icons/bi"
import { FiHome, FiShoppingCart, FiHeart, FiUser, FiLogIn } from "react-icons/fi"
import { useSelector } from "react-redux"
import { RootState } from "@/lib/redux/store"

export default function NavbarMobileBottom() {
    const pathname = usePathname()
    const { status } = useSession()
    const isAuthenticated = status === "authenticated"
    const wishlistCount = useSelector((state: RootState) => state.wishlist.count)
    const cartCount = useSelector((state: RootState) => state.cart.count)

    const isActive = (path: string) => {
        if (path === "/") return pathname === "/"
        return pathname.startsWith(path)
    }

    return (
        <div className="fixed right-0 bottom-0 left-0 z-50 flex min-h-17 items-center justify-around border-t border-[#F3F4F6] bg-white px-1 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_12px_rgba(0,0,0,0.05)] lg:hidden">
            <Link
                href="/"
                className={`flex min-h-14 min-w-14 flex-col items-center justify-center gap-1 rounded-lg transition-colors ${isActive("/") ? "font-semibold text-[#16A34A]" : "text-[#6A7282] hover:text-[#16A34A]"}`}
            >
                <FiHome className="size-5" />
                <span className="text-[11px]">Home</span>
            </Link>
            <Link
                href="/categories"
                className={`flex min-h-14 min-w-14 flex-col items-center justify-center gap-1 rounded-lg transition-colors ${isActive("/categories") ? "font-semibold text-[#16A34A]" : "text-[#6A7282] hover:text-[#16A34A]"}`}
            >
                <BiCategory className="size-5" />
                <span className="text-[11px]">Categories</span>
            </Link>

            {isAuthenticated ? (
                <>
                    <Link
                        href="/cart"
                        className={`relative flex min-h-14 min-w-14 flex-col items-center justify-center gap-1 rounded-lg transition-colors ${isActive("/cart") ? "font-semibold text-[#16A34A]" : "text-[#6A7282] hover:text-[#16A34A]"}`}
                    >
                        <div className="relative">
                            <FiShoppingCart className="size-5" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1.5 -right-2 bg-[#16A34A] text-white text-[10px] font-bold h-4 min-w-4 px-1 flex items-center justify-center rounded-full border border-white">
                                    {cartCount > 99 ? '99+' : cartCount}
                                </span>
                            )}
                        </div>
                        <span className="text-[11px]">Cart</span>
                    </Link>
                    <Link
                        href="/wishlist"
                        className={`relative flex min-h-14 min-w-14 flex-col items-center justify-center gap-1 rounded-lg transition-colors ${isActive("/wishlist") ? "font-semibold text-[#16A34A]" : "text-[#6A7282] hover:text-[#16A34A]"}`}
                    >
                        <div className="relative">
                            <FiHeart className="size-5" />
                            {wishlistCount > 0 && (
                                <span className="absolute -top-1.5 -right-2 bg-[#FB2C36] text-white text-[10px] font-bold h-4 min-w-4 px-1 flex items-center justify-center rounded-full border border-white">
                                    {wishlistCount > 99 ? '99+' : wishlistCount}
                                </span>
                            )}
                        </div>
                        <span className="text-[11px]">Wishlist</span>
                    </Link>
                    <Link
                        href="/account"
                        className={`flex min-h-14 min-w-14 flex-col items-center justify-center gap-1 rounded-lg transition-colors ${isActive("/account") ? "font-semibold text-[#16A34A]" : "text-[#6A7282] hover:text-[#16A34A]"}`}
                    >
                        <FiUser className="size-5" />
                        <span className="text-[11px]">Account</span>
                    </Link>
                </>
            ) : (
                <>
                    <Link
                        href="/signin"
                        className={`flex min-h-14 min-w-14 flex-col items-center justify-center gap-1 rounded-lg transition-colors ${isActive("/signin") ? "font-semibold text-[#16A34A]" : "text-[#6A7282] hover:text-[#16A34A]"}`}
                    >
                        <FiLogIn className="size-5" />
                        <span className="text-[11px]">Sign In</span>
                    </Link>
                    <Link
                        href="/signup"
                        className={`flex min-h-14 min-w-14 flex-col items-center justify-center gap-1 rounded-lg transition-colors ${isActive("/signup") ? "font-semibold text-[#16A34A]" : "text-[#6A7282] hover:text-[#16A34A]"}`}
                    >
                        <FiUser className="size-5" />
                        <span className="text-[11px]">Sign Up</span>
                    </Link>
                </>
            )}
        </div>
    )
}
