"use client"

import * as React from "react"
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

const components: { title: string, ref: string }[] = [
    { title: "All Categories", ref: "/categories" },
    { title: "Electronics", ref: "/categories/electronics" },
    { title: "Women's Fashion", ref: "/categories/women-fashion" },
    { title: "Men Fashion", ref: "/categories/men-fashion" },
    { title: "Beauty & Health", ref: "/categories/beauty-health" },
]

export function NavbarNavigationMenu() {
    return (
        <NavigationMenu viewport={false} delayDuration={100}>
            <NavigationMenuList>
                <NavigationMenuItem className="hidden md:flex">
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/">Home</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem className="hidden md:flex">
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/shop">shop</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem className="hidden md:flex">
                    <NavigationMenuTrigger className="active:bg-transparent! focus:bg-transparent!">Categories</NavigationMenuTrigger>
                    <NavigationMenuContent data-motion="to-end">
                        <ul className="w-45 gap-2 md:w-45 lg:w-45 flex flex-col items-center">
                            {components.map((component) => (
                                <ListItem
                                className="w-full text-center hover:bg-primary/5 hover:rounded-sm py-1 hover:duration-100 hover:text-primary"
                                    href={component.ref}
                                    key={component.title}
                                    title={component.title} >
                                    {component.title}
                                </ListItem>
                            ))}
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
    )
}

function ListItem({
    title,
    href,
    ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
    return (
        <li {...props}>
            <Link href={href}>
                <div>
                    <h5>{title}</h5>
                </div>
            </Link>
        </li>
    )
}

export default NavbarNavigationMenu;