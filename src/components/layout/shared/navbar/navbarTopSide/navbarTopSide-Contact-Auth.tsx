import Link from 'next/link'
import React from 'react'
import { FaUser, FaUserPlus } from 'react-icons/fa'
import { HiMail } from 'react-icons/hi'
import { IoIosCall } from 'react-icons/io'

export default function NavbarTopSideContactAuth() {
  return (
    <React.Fragment>
      <div className='flex items-center gap-6'>
        <div className='flex items-center gap-2'>
          <div className='flex items-center gap-2 hover:text-primary transition-all duration-200'>
            <IoIosCall />
            <a href='tel:+18001234567' target='_blank'>+1 (800) 123-4567</a>
          </div>
          <div className='flex items-center gap-2 hover:text-primary transition-all duration-200'>
            <HiMail />
            <a href='mailto:support@freshcart.com' target='_blank'>support@freshcart.com</a>
          </div>
        </div>
        <div className='w-px h-4 bg-muted-foreground/50'></div>
        <div className='flex items-center gap-4'>
          <Link href='/signin' className='flex hover:text-primary transition-all duration-200 items-center gap-2'><FaUser /> sign in</Link>
          <Link href='/signup' className='flex hover:text-primary transition-all duration-200 items-center gap-2'><FaUserPlus /> sign up</Link>
        </div>
      </div>
    </React.Fragment>
  )
  
}

