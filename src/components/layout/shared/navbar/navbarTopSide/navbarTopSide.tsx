import Link from "next/link"
import { FaGift, FaPhone, FaTruck } from "react-icons/fa"
import { FiLogOut, FiUser } from "react-icons/fi"
import { MdOutlineEmail } from "react-icons/md"

export default function NavbarTopSide() {
    return (
        <div className="hidden h-[41px] w-full border-b bg-white text-sm text-[#6A7282] lg:block">
            <div className="mx-auto flex h-10 w-full max-w-screen-2xl items-center justify-between px-4 lg:px-6 xl:px-10 2xl:px-16">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <FaTruck className="text-primary" />
                        <span className="font-medium">Free Shipping on Orders 500 EGP</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaGift className="text-primary" />
                        <span className="font-medium">New Arrivals Daily</span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-4">
                        <Link href="tel:+18001234567" className="flex items-center gap-2 hover:text-primary">
                            <FaPhone />
                            <span className="font-medium">+1 (800) 123-4567</span>
                        </Link>
                        <Link href="mailto:support@freshcart.com" className="flex items-center gap-2 hover:text-primary">
                            <MdOutlineEmail />
                            <span className="font-medium">support@freshcart.com</span>
                        </Link>
                    </div>

                    <span className="h-4 w-px bg-[#E5E7EB]" />

                    <div className="flex items-center gap-4 text-[#4A5565]">
                        <button type="button" className="flex items-center gap-2 hover:text-primary">
                            <FiUser />
                            <span className="font-medium">Usama</span>
                        </button>
                        <button type="button" className="flex items-center gap-2 hover:text-primary">
                            <FiLogOut />
                            <span className="font-medium">Sign Out</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
