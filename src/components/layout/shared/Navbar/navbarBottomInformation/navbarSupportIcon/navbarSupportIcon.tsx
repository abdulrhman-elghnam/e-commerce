"use client"
import { useRouter } from 'next/navigation';
import React from 'react';
import { BiSupport } from "react-icons/bi";
const NavbarSupportIcon = () => {
    const nav = useRouter();
    function handleClick() {
        nav.push('/contact')
    }
    return (
        <React.Fragment>
            <div className='flex items-center px-5 border-r-2 cursor-pointer' onClick={handleClick} >
                <div className='me-3 text-primary text-lg bg-primary/10 p-2 rounded-full'>
                    <BiSupport />
                </div>
                <div className='flex flex-col'>
                    <span className='text-neutral-600 text-sm '>support</span>
                    <span className='font-extrabold text-xs'>24/7 Help</span>
                </div>
            </div>
        </React.Fragment>
    );
}

export default NavbarSupportIcon;
