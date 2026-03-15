import React from 'react';
import Logo from './navbarLogo/navbarLogo';
import NavbarSearchInput from './navbarSearchInput/navbarSearchInput';
import NavbarNavigationMenu from './navbarNavigationMenu/navbarNavigationMenu';
import NavbarSupportIcon from './navbarSupportIcon/navbarSupportIcon';
import NavbarWishlist from './navbarWishlist/navbarWishlist';
import NavbarCart from './navbarCart/navbarCart';
import NavbarSignInButton from './navbarSignInButton/navbarSignInButton';
import NavBarSheet from './_navbarRes/navbarRes';

const NavbarBottomInformation = () => {
    return (
        <React.Fragment>
            <div className='flex items-center'>
                <div>
                    <Logo />
                </div>
                <div className='px-5'>
                    <NavbarSearchInput />
                </div>
                <div>
                    <NavbarNavigationMenu/>
                </div>
                <div>
                    <NavbarSupportIcon/>
                </div>
                <div className='flex space-x-5 ms-5'>
                    <NavbarWishlist/>
                    <NavbarCart/>
                </div>
                <div className='space-x-5 ms-5 '>
                    <NavbarSignInButton/>
                </div>
                <div>
                    <NavBarSheet/>
                </div>
            </div>
        </React.Fragment>
    );
}

export default NavbarBottomInformation;
