import React from 'react'
import NavbarDownSideLogo from './navbarDownSide-Logo'
import NavbarDownSideSearch from './navbarDownSide-Search'
import NavbarDownSideNavigation from './navbarDownSide-Navigation'
import NavbarDownSideWishListCartUser from './navbarDownSide-WishListCartUser'

export default function NavbarDownSideLayout() {
    return (
        <React.Fragment>
            <div className='py-4 flex justify-between items-center lg:gap-0 gap-8'>
                <NavbarDownSideLogo />
                <div className='lg:block hidden'>
                    <NavbarDownSideSearch />
                </div>
                <div className='hidden xl:block'>
                    <NavbarDownSideNavigation />
                </div>
                <div className='flex justify-between lg:block'>
                <NavbarDownSideWishListCartUser />
                </div>
            </div>
        </React.Fragment>
    )
}