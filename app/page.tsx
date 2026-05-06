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
  const [query, setQuery] = useState("") // FIXED: missing state

  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {
    let { data } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false })

    setPosts(data || [])
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Updates</h1>
      
      <button onClick={fetchPosts} style={{ marginBottom: 10 }}>
        Refresh Feed
      </button>

      {/* SEARCH INPUT (must be above filter logic visually) */}
      <input
        placeholder="Search by course or title"
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{ marginBottom: 20, padding: 5, width: "100%" }}
      />

      {posts
        .filter(p =>
          (p.course || "").toLowerCase().includes(query.toLowerCase()) ||
          (p.title || "").toLowerCase().includes(query.toLowerCase()) 
        )
        .map(p => (
          <div key={p.id} style={{ border: "1px solid #ccc", marginBottom: 10, padding: 10 }}>
            <h3>{p.course} {p.title}</h3>
            <p>{p.date} | {p.time}</p>
            <p>{p.venue}</p>
          </div>
        ))}
    </div>
  )
}
