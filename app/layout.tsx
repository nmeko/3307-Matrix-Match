import type React from "react"
import type { Metadata, Viewport } from "next"
import { Nunito, Geist_Mono } from "next/font/google"
import "./globals.css"
import { GameProvider } from "@/lib/game-context"

const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export const metadata: Metadata = {
  title: "Matrix Match: learn matrices by playing",
  description:
    "A game for learning matrix operations: addition, multiplication, determinants and inverses, with hints, five languages and a timed competitive mode.",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#2563eb",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${nunito.variable} ${geistMono.variable}`}>
      <body className={`font-sans antialiased overflow-x-hidden`}>
        <GameProvider>{children}</GameProvider>
      </body>
    </html>
  )
}
