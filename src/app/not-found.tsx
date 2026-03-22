import Link from "next/link"
import Image from "next/image"
import { SiteShell } from "@/components/layout/shell/site-shell"
import { Button } from "@/components/ui/button"
import errorIllustration from "@/assets/images/error.svg"

export default function NotFound() {
  return (
    <SiteShell as="div" className="flex flex-col items-center py-16 text-center md:py-24">
      <div className="relative mb-8 w-full max-w-md">
        <Image
          src={errorIllustration}
          alt=""
          width={280}
          height={174}
          className="mx-auto h-auto w-full max-w-[280px] opacity-90"
          priority
        />
      </div>
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        The page you are looking for does not exist or was moved. Try the home
        page or search from the header.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link href="/">Back to home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/shop">Browse shop</Link>
        </Button>
      </div>
    </SiteShell>
  )
}
