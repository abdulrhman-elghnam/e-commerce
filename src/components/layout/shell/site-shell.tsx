import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type SiteShellProps = {
  children: ReactNode
  className?: string
  as?: "div" | "main" | "footer" | "header" | "section"
}

/**
 * Content width matches design specs: tablet cap 1024px, desktop cap 1920px.
 */
export function SiteShell({
  children,
  className,
  as: Tag = "div",
}: SiteShellProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-full px-3 sm:px-4 md:px-6",
        "md:max-w-[1024px] xl:max-w-[1920px]",
        className
      )}
    >
      {children}
    </Tag>
  )
}
