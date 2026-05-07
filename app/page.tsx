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
          <h1 className="text-xl font-semibold">
            Academic Updates
          </h1>

          <p className="text-sm text-gray-500">
            Real-time. Structured. Searchable.
          </p>
        </div>

        <button
          onClick={fetchPosts}
          className="text-sm text-blue-600 hover:underline"
        >
          Refresh
        </button>
      </div>

      <input
        placeholder="Search (e.g. CSC301 test, exam this week)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
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

      {loading && (
        <p className="text-gray-500 text-sm">
          Loading updates...
        </p>
      )}

      {!loading && filteredPosts.length === 0 && (
        <div className="border border-gray-200 rounded-xl p-6 text-center">
          <p className="text-gray-500">
            No matching records.
          </p>
        </div>
      )}

      <div className="space-y-4">
        {filteredPosts.map((p) => (
          <div
            key={p.id}
            className="
              border
              border-gray-200
              rounded-xl
              p-4
              space-y-3
            "
          >
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span className="font-medium text-gray-700">
                {p.course}
              </span>

              <span>
                {formatTimeAgo(p.created_at)}
              </span>
            </div>

            <div className="text-sm font-medium text-gray-900">
              {p.title}
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
              <div>
                <p className="text-gray-400">Date</p>
                <p>{p.date}</p>
              </div>

              <div>
                <p className="text-gray-400">Time</p>
                <p>{p.time}</p>
              </div>

              <div>
                <p className="text-gray-400">Venue</p>
                <p>{p.venue}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}