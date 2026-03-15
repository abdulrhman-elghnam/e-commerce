import React from 'react';
import { FaGift, FaTruck } from 'react-icons/fa';
import { FiPhone } from 'react-icons/fi';
import { HiOutlineMail } from 'react-icons/hi';
import NavbarTopInformationLogIn from './navbarTopInformationLogIn/navbarTopInformationLogIn';
import NavbarTopInformationSignUp from './navbarTopInformationSignUp/navbarTopInformationSignUp';



const NavbarTopInformation = () => {
    return (
        <React.Fragment>
            <div className='hidden lg:flex justify-between items-center lg:py-2'>
                <div className='flex gap-4'>
                    <div className='flex items-center h-10 gap-2'>
                        <span className='text-primary '> <FaTruck /> </span>
                        <p className=' text-xs'>Free Shipping on Orders 500 EGP</p>
                    </div>
                    <div className='flex items-center  h-10 gap-2'>
                        <span className='text-primary'><FaGift /></span>
                        <p className=' text-xs'>New Arrivals Daily</p>
                    </div>
                </div>
                <div className='flex gap-4 items-center'>
                    <div className='flex items-center h-10 gap-2 hover:text-primary transition-all duration-200'>
                        <span className='text-sm'><FiPhone /> </span>
                        <a target='_blank' href='tel:+1 (800) 123-4567' className='text-sm' >+1 (800) 123-4567</a>
                    </div>
                    <div className='flex items-center  h-10 gap-2 hover:text-primary transition-all duration-200'>
                        <span className='text-sm' ><HiOutlineMail /></span>
                        <a target='_blank' href='mailto:support@freshcart.com' className=' text-xs'>support@freshcart.com</a>
                        <div className=' pl-4 border-r-2 h-1/2'></div>
                    </div>
                    <div className='flex items-center h-10 gap-5 ps-4'>
                        <NavbarTopInformationLogIn />
                        <NavbarTopInformationSignUp />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default NavbarTopInformation;
