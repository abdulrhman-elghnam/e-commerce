"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { FaGift, FaPhone, FaTruck } from "react-icons/fa"
import { FiLogIn, FiLogOut, FiUser } from "react-icons/fi"
import { MdOutlineEmail } from "react-icons/md"

export default function NavbarTopSide() {
    const { data: session, status } = useSession()
    const isAuthenticated = status === "authenticated"
    const userName = session?.user?.name || "User"

    return (
        <div className="hidden h-[41px] z-20 relative w-full border-b bg-[#F9FAFB] text-sm text-[#6A7282] lg:block">
            <div className="app-container flex h-10 items-center justify-between">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <FaTruck className="text-[#16A34A]" />
                        <span className="font-medium">Free Shipping on Orders 500 EGP</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaGift className="text-[#16A34A]" />
                        <span className="font-medium">New Arrivals Daily</span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-4">
                        <Link href="tel:+18001234567" className="flex items-center gap-2 hover:text-[#16A34A]">
                            <FaPhone />
                            <span className="font-medium">+1 (800) 123-4567</span>
                        </Link>
                        <Link href="mailto:support@freshcart.com" className="flex items-center gap-2 hover:text-[#16A34A]">
                            <MdOutlineEmail />
                            <span className="font-medium">support@freshcart.com</span>
                        </Link>
                    </div>

                    <span className="h-4 w-px bg-[#E5E7EB]" />

                    {isAuthenticated ? (
                        <div className="flex items-center gap-4 text-[#4A5565]">
                            <Link href="/account" className="flex items-center gap-2 hover:text-[#16A34A]">
                                <FiUser />
                                <span className="font-medium">{userName}</span>
                            </Link>
                            <button
                                type="button"
                                onClick={() => signOut({ callbackUrl: "/" })}
                                className="flex items-center gap-2 hover:text-[#16A34A]"
                            >
                                <FiLogOut />
                                <span className="font-medium">Sign Out</span>
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4 text-[#4A5565]">
                            <Link href="/signin" className="flex items-center gap-2 hover:text-[#16A34A]">
                                <FiLogIn />
                                <span className="font-medium">Sign In</span>
                            </Link>
                            <Link href="/signup" className="flex items-center gap-2 hover:text-[#16A34A]">
                                <FiUser />
                                <span className="font-medium">Sign Up</span>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
