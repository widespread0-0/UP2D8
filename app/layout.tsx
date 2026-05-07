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
          
          {/* Header */}
          <header className="mb-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* Placeholder for logo */}
              <div className="w-6 h-6 bg-gray-900 rounded-sm" />

              <h1 className="text-lg font-semibold tracking-tight">
                UP2D8
              </h1>
            </div>

            <nav className="text-sm text-gray-500 flex gap-4">
              <a href="/">Updates</a>
              <a href="/create">New</a>
            </nav>
          </header>

          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}