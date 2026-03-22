import React from 'react'
import NavbarDownSideLogo from './navbarDownSide-Logo'
import NavbarDownSideSearch from './navbarDownSide-Search'
import NavbarDownSideNavigation from './navbarDownSide-Navigation'
import NavbarDownSideWishListCartUser from './navbarDownSide-WishListCartUser'

export default function NavbarDownSideLayout() {
    return (
        <React.Fragment>
            <div className='py-4 flex justify-between items-center'>
                <NavbarDownSideLogo />
                <NavbarDownSideSearch />
                <NavbarDownSideNavigation/>
                <NavbarDownSideWishListCartUser/>
            </div>
        </React.Fragment>
    )
}
