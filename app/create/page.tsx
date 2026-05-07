"use client"

import { useState } from "react"
import { supabase } from "../../lib/supabase"
import Link from "next/link"

export default function Create() {
  const [course, setCourse] = useState("")
  const [title, setTitle] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [venue, setVenue] = useState("")

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!course || !title || !date || !time || !venue) {
      alert("All fields are required.")
      return
    }

    setLoading(true)

    const { error } = await supabase
      .from("posts")
      .insert([
        {
          course,
          title,
          date,
          time,
          venue,
        },
      ])

    setLoading(false)

    if (error) {
      console.error(error)
      alert("Failed to publish update.")
      return
    }

    const generatedMessage = `${course} — ${title}

Date: ${date}
Time: ${time}
Venue: ${venue}

Source: UP2D8`

    setMessage(generatedMessage)
    setSuccess(true)

    setCourse("")
    setTitle("")
    setDate("")
    setTime("")
    setVenue("")
  }

  const whatsappUrl =
    `https://wa.me/?text=${encodeURIComponent(message)}`

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold">
          New Update
        </h1>

        <p className="text-sm text-gray-500">
          Enter structured academic information
        </p>
      </div>

      {/* Form */}
      <div className="border border-gray-200 rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Course Code (e.g. CSC301)"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
          />

          <input
            type="text"
            placeholder="Update Title (e.g. Test Announcement)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
          />

          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
          />

          <input
            type="text"
            placeholder="Venue"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 text-white p-3 rounded-lg text-sm hover:bg-black"
          >
            {loading ? "Publishing..." : "Publish Update"}
          </button>

        </form>
      </div>

      {/* Success */}
      {success && (
        <div className="border border-gray-200 rounded-lg p-6 space-y-5">

          <div>
            <h2 className="text-lg font-semibold">
              Update Published
            </h2>

            <p className="text-sm text-gray-500">
              Ready for distribution
            </p>
          </div>

          <pre className="
            whitespace-pre-wrap 
            break-words 
            bg-[#DCF8C6] 
            text-gray-900 
            p-4 
            rounded-xl 
            rounded-tr-none 
            text-sm 
            font-sans 
            leading-relaxed 
            shadow-sm 
            border border-green-200
          ">
            {message}
          </pre>

          <div className="flex gap-3 mt-4">
            <button
              onClick={() => navigator.clipboard.writeText(message)}
              className="flex-1 flex items-center justify-center gap-2 border border-gray-200 p-3 rounded-2xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {/* Optional: Add a small icon here */}
              Copy Message
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center bg-[#25D366] text-white p-3 rounded-2xl text-sm font-medium hover:bg-[#128C7E] transition-colors shadow-sm"
            >
              Open WhatsApp
            </a>
          </div>


          <Link
            href="/"
            className="block text-center text-sm text-blue-600 hover:underline"
          >
            Back to Updates
          </Link>

        </div>
      )}
    </div>
  )
}