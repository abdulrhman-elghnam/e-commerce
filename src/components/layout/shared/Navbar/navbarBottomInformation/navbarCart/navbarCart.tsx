"use client"
import { useRouter } from 'next/navigation';
import { IoMdCart } from "react-icons/io";
const NavbarCart = () => {
    const nav = useRouter();
    function handleClick() {
        nav.push('/cart')
    }
    return (
        <div onClick={handleClick}>
            <IoMdCart className="text-xl text-neutral-600 hover:text-primary duration-200" />
        </div>
    );
}

export default NavbarCart;
