import React from 'react'
import NavbarDownSideLayout from './navbarDownSide/-navbarDownSideLayout'
import NavbarTopSideLayout from './navbarTopSide/-navbarTopSideLayout'

export default function Navbar() {
    return (
        <React.Fragment>
            <div>
                <div className='border-b border-muted-foreground/10 hidden lg:block'>
                    <NavbarTopSideLayout />
                </div>
                <NavbarDownSideLayout />
            </div>
        </React.Fragment>
    )
}
