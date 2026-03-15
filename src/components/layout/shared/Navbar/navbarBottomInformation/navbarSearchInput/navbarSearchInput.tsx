import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Search } from 'lucide-react';
import React from 'react';

const NavbarSearchInput = () => {
    return (
        <React.Fragment>
            <div className='w-100'>
                <InputGroup className="rounded-4xl">
                    <InputGroupInput placeholder="Search for products, brands, and more..." />
                    <InputGroupAddon>
                        <Search />
                    </InputGroupAddon>
                    <InputGroupAddon align="inline-end"></InputGroupAddon>
                </InputGroup>
            </div>
        </React.Fragment>
    );
}

export default NavbarSearchInput;
