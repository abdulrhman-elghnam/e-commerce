import React from 'react'
import NavbarTopSideShippedInformation from './navbarTopSide-ShippedInformation'
import NavbarTopSideContactAuth from './navbarTopSide-Contact-Auth'

export default function NavbarTopSideLayout() {
    return (
        <React.Fragment>
            <div className='flex justify-between items-center text-sm py-4 text-muted-foreground'>
                <NavbarTopSideShippedInformation />
                <NavbarTopSideContactAuth />
            </div>
        </React.Fragment>
    )
}
