import React from 'react'

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import Link from 'next/link';
import { IoMenu } from 'react-icons/io5';

export const title = "Sidebar Navigation Sheet";

export default function NavbarDownSideResponseDesign() {
    return (
        <React.Fragment>
            <div>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button className='rounded-full size-8.5 text-white' ><IoMenu /></Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                        <SheetHeader>
                            <SheetTitle>Navigation</SheetTitle>
                        </SheetHeader>
                        <nav className="flex flex-col gap-4 p-4">
                            <div className="flex flex-col gap-2">
                                <h3 className="font-semibold text-sm">Dashboard</h3>
                                <a className="pl-4 text-muted-foreground text-sm hover:text-foreground" href="#" >
                                    Overview
                                </a>
                                <Link className="pl-4 text-muted-foreground text-sm hover:text-foreground" href="#">
                                    Analytics
                                </Link>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="font-semibold text-sm">Settings</h3>
                                <Link className="pl-4 text-muted-foreground text-sm hover:text-foreground" href="#">
                                    Profile
                                </Link>
                                <Link className="pl-4 text-muted-foreground text-sm hover:text-foreground" href="#">
                                    Account
                                </Link>
                            </div>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </React.Fragment>
    )
}
