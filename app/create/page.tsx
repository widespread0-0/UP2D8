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
      alert("Please fill all fields.")
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
      alert("Failed to create post.")
      return
    }

    const generatedMessage = `📌 ${course} ${title}

Date: ${date}
Time: ${time}
Venue: ${venue}

— UP2D8`

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
        <h1 className="text-3xl font-bold tracking-tight">
          Create Post
        </h1>

        <p className="text-gray-500 mt-1">
          Generate structured academic updates
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Course Code"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="
              w-full
              p-3
              border
              border-gray-200
              rounded-xl
              bg-white
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="
              w-full
              p-3
              border
              border-gray-200
              rounded-xl
              bg-white
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="
              w-full
              p-3
              border
              border-gray-200
              rounded-xl
              bg-white
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="
              w-full
              p-3
              border
              border-gray-200
              rounded-xl
              bg-white
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

          <input
            type="text"
            placeholder="Venue"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            className="
              w-full
              p-3
              border
              border-gray-200
              rounded-xl
              bg-white
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-blue-600
              text-white
              p-3
              rounded-xl
              hover:bg-blue-700
              transition
              font-medium
            "
          >
            {loading ? "Posting..." : "Generate Update"}
          </button>
        </form>
      </div>

      {success && (
        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-5">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Post Created Successfully
            </h2>

            <p className="text-gray-500 mt-1">
              Share this directly to WhatsApp
            </p>
          </div>

          <pre
            className="
              whitespace-pre-wrap
              bg-gray-100
              text-gray-900
              p-4
              rounded-2xl
              text-sm
              leading-relaxed
            "
          >
            {message}
          </pre>

          <div className="flex gap-3">
            <button
              onClick={() =>
                navigator.clipboard.writeText(message)
              }
              className="
                flex-1
                border
                border-gray-200
                bg-white
                p-3
                rounded-xl
                hover:bg-gray-100
                font-medium
              "
            >
              Copy Message
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              className="
                flex-1
                bg-green-600
                text-white
                p-3
                rounded-xl
                text-center
                hover:bg-green-700
                font-medium
              "
            >
              Open WhatsApp
            </a>
          </div>

          <Link
            href="/"
            className="
              block
              text-center
              text-sm
              text-blue-600
              hover:underline
            "
          >
            Back to Feed
          </Link>
        </div>
      )}
    </div>
  )
}