"use client"
import { useRouter } from 'next/navigation';
import { FaRegUser } from 'react-icons/fa';
const NavbarTopInformationLogIn = () => {
    const nav = useRouter();
    const handleClick = () => {
        nav.push('/login');
    }
    return (
        <div onClick={handleClick} className='cursor-pointer flex gap-2 items-center hover:text-primary transition-all duration-200'> 
            <span className='text-sm'><FaRegUser /></span>
            <p>Sign In</p>
        </div>
    );
}

export default NavbarTopInformationLogIn;
