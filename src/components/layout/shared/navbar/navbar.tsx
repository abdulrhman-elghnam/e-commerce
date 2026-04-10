import React from 'react'
import NavbarDownSide from './navbarDownSide/navbarDownSide';
import NavbarTopSide from './navbarTopSide/navbarTopSide';

export default function Navbar() {
    return (
        <React.Fragment>
            <div className="text-foreground">
                <NavbarTopSide/>
                <NavbarDownSide/>
            </div>
        </React.Fragment>
    )
}
