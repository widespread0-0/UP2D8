"use client"

import { useState } from "react"
import { supabase } from "../../lib/supabase"
import { useRouter } from "next/navigation"

export default function Create() {
  const router = useRouter()

  const [course, setCourse] = useState("")
  const [title, setTitle] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [venue, setVenue] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.from("posts").insert([
      { course, title, date, time, venue }
    ])

    setLoading(false)

    if (error) {
      alert("Failed to create post")
      console.error(error)
      return
    }

    router.push("/")
    router.refresh()
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Create Post</h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          placeholder="Course"
          className="w-full p-2 border rounded-lg"
          onChange={(e) => setCourse(e.target.value)}
        />

        <input
          placeholder="Title"
          className="w-full p-2 border rounded-lg"
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Date"
          className="w-full p-2 border rounded-lg"
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          placeholder="Time"
          className="w-full p-2 border rounded-lg"
          onChange={(e) => setTime(e.target.value)}
        />

        <input
          placeholder="Venue"
          className="w-full p-2 border rounded-lg"
          onChange={(e) => setVenue(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white p-2 rounded-lg hover:bg-gray-800"
        >
          {loading ? "Posting..." : "Generate Post"}
        </button>
      </form>
    </div>
  )
}