import React from 'react'
import NavbarDownSide from './navbarDownSide/navbarDownSide';
import NavbarTopSide from './navbarTopSide/navbarTopSide';
import NavbarMobileBottom from './navbarMobileBottom/navbarMobileBottom';

export default function Navbar() {
    return (
        <React.Fragment>
            <NavbarTopSide/>
            <NavbarDownSide/>
            <NavbarMobileBottom/>
        </React.Fragment>
    )
}
