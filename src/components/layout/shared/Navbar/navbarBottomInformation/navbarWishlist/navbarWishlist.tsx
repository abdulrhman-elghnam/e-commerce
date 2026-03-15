"use client"
import { useRouter } from "next/navigation";
import { IoHeart } from "react-icons/io5";

const NavbarWishlist = () => {
        const nav = useRouter();
        function handleClick() {
            nav.push('/wishlist')
        }
    return (
        <div onClick={handleClick}>
            <IoHeart className="text-xl  text-neutral-600 hover:text-primary duration-200"  />
        </div>
    );
}

export default NavbarWishlist;
