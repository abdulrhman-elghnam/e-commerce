"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"
import { BiCategory } from "react-icons/bi"
import { FiHome, FiShoppingCart, FiHeart, FiUser, FiLogIn } from "react-icons/fi"
import { useSelector } from "react-redux"
import { RootState } from "@/lib/redux/store"

export default function NavbarMobileBottom() {
    const { data: session, status } = useSession()
    const isAuthenticated = status === "authenticated"
    const wishlistCount = useSelector((state: RootState) => state.wishlist.count)
    const cartCount = useSelector((state: RootState) => state.cart.count)

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex h-[72px] items-center justify-around bg-white border-t border-[#F3F4F6] lg:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] pb-safe">
            <Link href="/" className="flex flex-col items-center gap-1.5 text-[#16A34A]">
                <FiHome className="size-[22px]" />
                <span className="text-[10px] font-medium">Home</span>
            </Link>
            <Link href="/categories" className="flex flex-col items-center gap-1.5 text-[#6A7282] hover:text-[#16A34A] transition-colors">
                <BiCategory className="size-[22px]" />
                <span className="text-[10px] font-medium">Categories</span>
            </Link>

            {isAuthenticated ? (
                <>
                    <Link href="/cart" className="flex flex-col items-center gap-1.5 text-[#6A7282] hover:text-[#16A34A] transition-colors relative">
                        <div className="relative">
                            <FiShoppingCart className="size-[22px]" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1.5 -right-2 bg-[#16A34A] text-white text-[10px] font-bold h-[16px] min-w-[16px] px-1 flex items-center justify-center rounded-full border border-white">
                                    {cartCount > 99 ? '99+' : cartCount}
                                </span>
                            )}
                        </div>
                        <span className="text-[10px] font-medium">Cart</span>
                    </Link>
                    <Link href="/wishlist" className="flex flex-col items-center gap-1.5 text-[#6A7282] hover:text-[#16A34A] transition-colors relative">
                        <div className="relative">
                            <FiHeart className="size-[22px]" />
                            {wishlistCount > 0 && (
                                <span className="absolute -top-1.5 -right-2 bg-[#FB2C36] text-white text-[10px] font-bold h-[16px] min-w-[16px] px-1 flex items-center justify-center rounded-full border border-white">
                                    {wishlistCount > 99 ? '99+' : wishlistCount}
                                </span>
                            )}
                        </div>
                        <span className="text-[10px] font-medium">Wishlist</span>
                    </Link>
                    <Link href="/account" className="flex flex-col items-center gap-1.5 text-[#6A7282] hover:text-[#16A34A] transition-colors">
                        <FiUser className="size-[22px]" />
                        <span className="text-[10px] font-medium">Account</span>
                    </Link>
                </>
            ) : (
                <>
                    <Link href="/signin" className="flex flex-col items-center gap-1.5 text-[#6A7282] hover:text-[#16A34A] transition-colors">
                        <FiLogIn className="size-[22px]" />
                        <span className="text-[10px] font-medium">Sign In</span>
                    </Link>
                    <Link href="/signup" className="flex flex-col items-center gap-1.5 text-[#6A7282] hover:text-[#16A34A] transition-colors">
                        <FiUser className="size-[22px]" />
                        <span className="text-[10px] font-medium">Sign Up</span>
                    </Link>
                </>
            )}
        </div>
    )
}
