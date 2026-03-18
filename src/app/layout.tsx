import type { Metadata } from "next";
import { Exo } from "next/font/google";
import "./globals.css";


const exo = Exo({
  variable: "--font-exo",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FreshCart | E-commerce",
  description: "E-commerce website for fresh products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${exo.className}  antialiased`} >
        {/* <Navbar/> */}
        <div className="container mx-auto">
          {children}
        </div>
      </body>
    </html>
  );
}








