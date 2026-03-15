import React from 'react'
import NavbarTopInformation from './navbarTopInformation/navbarTopInformation'
import NavbarBottomInformation from './navbarBottomInformation/navbarBottomInformation'
export default function Navbar() {
    return (
        <React.Fragment>
            <div className='border-b'>
                <div className='container mx-auto hidden md:block'>
                    <NavbarTopInformation />
                </div>
            </div>
            <div className='py-4 container mx-auto'>
                <NavbarBottomInformation />
            </div>
        </React.Fragment>
    )
}
