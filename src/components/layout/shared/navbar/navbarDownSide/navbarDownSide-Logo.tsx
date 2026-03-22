import React from 'react'
import Image from 'next/image'
import Logo from '@/assets/images/freshcart-logo.svg'

export default function NavbarDownSideLogo() {
    return (
        <React.Fragment>
            <div>
                <Image src={Logo} alt='logo' width={165.16000366210938} height={32} />
            </div>
        </React.Fragment>
    )
}
