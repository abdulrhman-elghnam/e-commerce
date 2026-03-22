"use client"
import React from 'react'
import Image from 'next/image'
import Logo from '@/assets/images/freshcart-logo.svg'
import Link from 'next/link'

export default function NavbarDownSideLogo() {
    const [width, setWidth] = React.useState(window.innerWidth)
    const MOBILE_WIDTH = 768

    React.useEffect(() => {
        const handleResize = () => { setWidth(window.innerWidth);}
        window.addEventListener("resize", handleResize) 
        console.log("vvvv")
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    const isMobile = width <= MOBILE_WIDTH

    return (
        <React.Fragment>
            <div>
                <Link href='/'>
                    <Image src={Logo} alt='logo' width={isMobile ? 123.86000061035156 : 165.16000366210938} height={32} />
                </Link>
            </div>
        </React.Fragment>
    )
}
