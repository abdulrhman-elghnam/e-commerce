import type { Metadata } from "next"
import { Exo } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/layout/shared/navbar/navbar"
import Footer from "@/components/layout/shared/footer/footer";
import NextAuthProvider from "@/components/providers/NextAuthProvider";
import ReduxProvider from "@/components/providers/ReduxProvider";
import { Toaster } from "@/components/ui/sonner";

const exo = Exo({
  variable: "--font-exo",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "FreshCart | E-commerce",
  description: "E-commerce website for fresh products",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${exo.className} flex min-h-screen flex-col antialiased`}>
        <NextAuthProvider>
          <ReduxProvider>
            <main className="flex-1 pb-16 md:pb-0">
              <Navbar />
              {children}
              <Footer />
            </main>
            <Toaster />
          </ReduxProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}