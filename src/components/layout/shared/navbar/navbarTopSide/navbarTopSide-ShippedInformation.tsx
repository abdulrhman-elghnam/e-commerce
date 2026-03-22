import React from 'react'
import { FaGift, FaTruck } from 'react-icons/fa'

export default function NavbarTopSideShippedInformation() {
    return (
        <React.Fragment>
            <div className='flex items-center gap-6'>
                <div className='flex items-center gap-2'>
                    <span className='text-primary'><FaTruck /></span>
                    <span className='text-muted-foreground'>Free Shipping on Orders 500 EGP</span>
                </div>
                <div className='flex items-center gap-2'>
                    <span className='text-primary'><FaGift /></span>
                    <span className='text-muted-foreground'>New Arrivals Daily</span>
                </div>
            </div>
        </React.Fragment>
    )
}
