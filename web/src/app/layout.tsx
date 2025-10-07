import type React from "react"
import type { Metadata } from "next"
import { Open_Sans } from "next/font/google"
import "./globals.css"

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-open-sans",
})

export const metadata: Metadata = {
  title: "brev.ly - Encurtador de URLs",
  description: "Encurte seus links de forma rápida e fácil com brev.ly",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`font-sans ${openSans.variable}`}>
        {children}
      </body>
    </html>
  )
}
