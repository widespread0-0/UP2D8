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
      <div>
        <h1 className="text-xl font-semibold">
          New Update
        </h1>

        <p className="text-sm text-gray-500">
          Enter structured academic information
        </p>
      </div>

      <div className="border border-gray-200 rounded-xl p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Course Code (e.g. CSC301)"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            placeholder="Update Title (e.g. Test Announcement)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            placeholder="Venue"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            {loading ? "Publishing..." : "Publish Update"}
          </button>
        </form>
      </div>

      {success && (
        <div className="border border-gray-200 rounded-xl p-6 space-y-5">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Update Published
            </h2>

            <p className="text-sm text-gray-500">
              Ready for distribution
            </p>
          </div>

          <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded-lg text-sm">
            {message}
          </pre>

          <div className="flex gap-3">
            <button
              onClick={() =>
                navigator.clipboard.writeText(message)
              }
              className="flex-1 border border-gray-200 p-3 rounded-lg hover:bg-gray-100 font-medium"
            >
              Copy
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              className="flex-1 bg-gray-900 text-white p-3 rounded-lg text-center hover:bg-black font-medium"
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