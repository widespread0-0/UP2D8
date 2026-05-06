"use client"

import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

type Post = {
  id: string | number
  course: string
  title: string
  date?: string
  time?: string
  venue?: string
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [query, setQuery] = useState("")

  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error(error)
      return
    }

    setPosts(data || [])
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Updates</h1>

      <input
        placeholder="Search by course or title"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring"
      />

      <button
        onClick={fetchPosts}
        className="text-sm text-blue-600 hover:underline"
      >
        Refresh Feed
      </button>

      <div className="space-y-3">
        {posts
          .filter((p) =>
            (p.course || "").toLowerCase().includes(query.toLowerCase()) ||
            (p.title || "").toLowerCase().includes(query.toLowerCase())
          )
          .map((p) => (
            <div
              key={p.id}
              className="bg-white border rounded-xl p-4 shadow-sm space-y-1"
            >
              <h3 className="font-semibold text-lg">
                {p.course} {p.title}
              </h3>

              <p className="text-sm text-gray-500">
                {p.date} • {p.time}
              </p>

              <p className="text-sm text-gray-700">{p.venue}</p>
            </div>
          ))}
      </div>
    </div>
  )
}