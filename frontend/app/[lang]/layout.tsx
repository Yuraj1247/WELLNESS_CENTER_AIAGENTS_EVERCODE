import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { getDictionary } from "./dictionaries"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Wellness Center - Your Health, Our Priority",
  description: "Professional healthcare services with modern facilities and experienced doctors.",
}

export async function generateStaticParams() {
  return [
    { lang: "en" },
    { lang: "hi" },
    { lang: "mr" },
    { lang: "gu" },
    { lang: "ta" },
    { lang: "te" },
    { lang: "kn" },
  ]
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return (
    <html lang={lang}>
      <body className={inter.className}>
        <Navbar dict={dict} lang={lang} />
        {children}
        <Footer dict={dict} />
      </body>
    </html>
  )
}
