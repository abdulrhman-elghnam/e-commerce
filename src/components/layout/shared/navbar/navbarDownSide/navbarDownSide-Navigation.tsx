import React from 'react'
import Link from "next/link"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export default function NavbarDownSideNavigation() {
    return (
        <React.Fragment>
            <div>
                <NavigationMenu viewport={false}>
                    <NavigationMenuList>
                    <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link href="/">Home</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link href="/shop">Shop</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="w-48 text-sm py-2">
                                    <ListItem href="/categories" title="All Categories"></ListItem>
                                    <ListItem href="/categories/electronics" title="Electronics"></ListItem>
                                    <ListItem href="/categories/women-fashion" title="Women's Fashion"></ListItem>
                                    <ListItem href="/categories/men-fashion" title="Mens's Fashion"></ListItem>
                                    <ListItem href="/categories/Beauty-Health" title="Beauty & Health"></ListItem>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link href="/brands">Brands</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </React.Fragment>
    )
}

function ListItem({
    title,
    href,
    ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
    return (
        <li {...props}>
            <NavigationMenuLink>
                <Link href={href} className='hover:bg-muted-foreground/10 rotate-2 transition-all duration-200'>
                    <div className="flex flex-col gap-1 text-sm">
                        <div className="leading-none font-medium">{title}</div>
                    </div>
                </Link>
            </NavigationMenuLink>
        </li>
    )
}
