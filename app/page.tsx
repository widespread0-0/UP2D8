"use client"

import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

type Post = {
  id: string
  course: string
  title: string
  date: string
  time: string
  venue: string
  created_at: string
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {
    setLoading(true)

    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error(error)
      setLoading(false)
      return
    }

    setPosts(data || [])
    setLoading(false)
  }

  function formatTimeAgo(dateString: string) {
    const date = new Date(dateString)
    const now = new Date()

    const seconds =
      Math.floor((now.getTime() - date.getTime()) / 1000)

    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes} mins ago`
    if (hours < 24) return `${hours} hrs ago`

    return date.toLocaleDateString()
  }

  const filteredPosts = posts.filter((p) =>
    p.course.toLowerCase().includes(query.toLowerCase()) ||
    p.title.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Updates
          </h1>

          <p className="text-gray-500 mt-1">
            Latest academic updates
          </p>
        </div>

        <button
          onClick={fetchPosts}
          className="
            text-sm
            text-blue-600
            hover:underline
          "
        >
          Refresh
        </button>
      </div>

      <input
        placeholder="Search by course or title..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="
          w-full
          p-3
          border
          border-gray-200
          rounded-2xl
          bg-white
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
        "
      />

      {loading && (
        <p className="text-gray-500 text-sm">
          Loading updates...
        </p>
      )}

      {!loading && filteredPosts.length === 0 && (
        <div className="bg-white border border-gray-200 rounded-3xl p-6 text-center shadow-sm">
          <p className="text-gray-500">
            No updates found.
          </p>
        </div>
      )}

      <div className="space-y-4">
        {filteredPosts.map((p) => (
          <div
            key={p.id}
            className="
              bg-white
              border
              border-gray-200
              rounded-3xl
              p-5
              shadow-sm
              space-y-4
            "
          >
            <div className="flex items-center justify-between">
              <span
                className="
                  text-xs
                  font-semibold
                  bg-blue-100
                  text-blue-700
                  px-3
                  py-1
                  rounded-full
                "
              >
                {p.course}
              </span>

              <span className="text-xs text-gray-400">
                {formatTimeAgo(p.created_at)}
              </span>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {p.title}
              </h2>
            </div>

            <div className="text-sm text-gray-600 space-y-1">
              <p>📅 {p.date}</p>
              <p>⏰ {p.time}</p>
              <p>📍 {p.venue}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}