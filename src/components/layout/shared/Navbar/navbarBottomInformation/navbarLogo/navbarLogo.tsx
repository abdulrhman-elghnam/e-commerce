"use client"
import Image from 'next/image';
import logo from "@/assets/images/freshcart-logo.svg"
import React from 'react';
import { useRouter } from 'next/navigation';

const Logo = () => {
    const nav = useRouter()
    function handleClick() {
        nav.push('/')
    }
    return (
        <React.Fragment>
            <Image src={logo} alt="logo" onClick={handleClick} className='cursor-pointer' />
        </React.Fragment>
    );
}

export default Logo;
