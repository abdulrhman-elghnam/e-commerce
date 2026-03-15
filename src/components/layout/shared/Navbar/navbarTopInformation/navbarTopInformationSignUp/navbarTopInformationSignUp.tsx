"use client"
import { useRouter } from 'next/navigation';
import { FaUserPlus } from 'react-icons/fa';

const NavbarTopInformationSignUp = () => {
    const nav = useRouter();
    const handleClick = () => {
        nav.push('/signup');
    }
    return (
        <div>
            <div onClick={handleClick} className='cursor-pointer flex gap-2 items-center hover:text-primary transition-all duration-200'>
                <span className='text-sm'><FaUserPlus /></span>
                <p>Sign Up</p>
            </div>
        </div>
    );
}

export default NavbarTopInformationSignUp;
