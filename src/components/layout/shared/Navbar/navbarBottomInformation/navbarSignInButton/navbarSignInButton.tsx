"use client"
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaRegUser } from 'react-icons/fa';

const NavbarSignInButton = () => {
    const nav = useRouter();
    function handleClick() {
        nav.push('/login')
    }
    return (
        <div>
            <Button className='rounded-3xl' onClick={handleClick} ><FaRegUser />Sign In</Button>
        </div>
    );
}

export default NavbarSignInButton;
