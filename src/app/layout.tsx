import type { Metadata } from "next"
import { Exo } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/layout/shared/navbar/navbar"
import Footer from "@/components/layout/shared/footer/footer";

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
    <html lang="en">
      <body className={`${exo.className} flex min-h-screen flex-col antialiased`}>
        <main className="flex-1 pb-16 md:pb-0">
          <Navbar />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  )
}