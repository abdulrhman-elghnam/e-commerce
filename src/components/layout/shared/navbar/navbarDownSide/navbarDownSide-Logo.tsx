import React from 'react'
import Image from 'next/image'
import Logo from '@/assets/images/freshcart-logo.svg'
import Link from 'next/link'

export default function NavbarDownSideLogo() {
    return (
        <React.Fragment>
            <div>
                <Link href='/'>
                    <Image src={Logo} alt='logo' width={165.16000366210938} height={32} />
                </Link>
            </div>
        </React.Fragment>
    )
}
