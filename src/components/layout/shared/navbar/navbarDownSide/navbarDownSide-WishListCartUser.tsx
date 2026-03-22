import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { FaHeadset } from 'react-icons/fa'
import { IoIosHeart, IoMdCart } from 'react-icons/io'

export default function NavbarDownSideWishListCartUser() {
    return (
        <React.Fragment>
            <div className='flex items-center gap-2'>
                <div className=' flex items-center gap-2 border-e-2 pe-6'>
                    <span className='bg-primary/10 text-green-900 p-2 rounded-full flex items-center justify-center'  >
                        <FaHeadset />
                    </span>
                    <span className='text-muted-foreground text-sm'>
                        Support <br /><span className='text-black font-bold text-sm'> 24/7 Help</span>
                    </span>
                </div>
                <div className='flex items-center gap-2 px-3'>
                    <span className='text-muted-foreground text-lg hover:text-primary transition-all duration-200'><IoIosHeart /></span>
                    <span className='text-muted-foreground text-lg hover:text-primary transition-all duration-200'><IoMdCart /></span>
                </div>
                <Button asChild className='rounded-full'>
                    <Link href='/signin'>Sign in</Link>
                </Button>
            </div>
        </React.Fragment>
    )
}
