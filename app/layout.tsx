import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "UP2D8",
  description: "Structured academic updates",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          bg-white
          text-gray-900
          antialiased
          min-h-screen
        `}
      >
        <div className="max-w-2xl mx-auto px-4 py-8">
          <header className="mb-10 space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight">
              UP2D8
            </h1>

            <p className="text-sm text-gray-500">
              Structured. Verified. Up to date.
            </p>
          </header>

          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}