import React from 'react'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Search } from "lucide-react"

export default function NavbarDownSideSearch() {
  return (
    <React.Fragment>
      <div>
        <InputGroup className="lg:w-[542.8399658203125px] rounded-full h-12 px-1.5">
          <InputGroupInput placeholder="Search for products, brands and more..."/>
          <InputGroupAddon align="inline-end" className='bg-primary rounded-full p-1.5 text-white'>
            <Search />
          </InputGroupAddon>
        </InputGroup>
      </div>
    </React.Fragment>
  )
}