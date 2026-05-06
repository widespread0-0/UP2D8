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
  description: "Simple updates app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          min-h-screen
          bg-gray-50
          text-gray-900
          antialiased
        `}
      >
        {/* App container */}
        <div className="max-w-3xl mx-auto p-4">
          {/* Header */}
          <header className="mb-6">
            <h1 className="text-xl font-bold tracking-tight">
              UP2D8
            </h1>
            <p className="text-sm text-gray-500">
              Stay updated
            </p>
          </header>

          {/* Page content */}
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}