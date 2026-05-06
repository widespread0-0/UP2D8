"use client"
import { useState } from "react"
import { supabase } from "../../lib/supabase"

export default function Create() {
  const [course, setCourse] = useState("")
  const [title, setTitle] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [venue, setVenue] = useState("")
  const [message, setMessage] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()

    const { error } = await supabase.from("posts").insert([
      { course, title, date, time, venue }
    ])

    if (!error) {
      const msg = `📌 ${course} ${title}

Date: ${date}
Time: ${time}
Venue: ${venue}

— UP2D8`

      setMessage(msg)
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Create Post</h1>

      <form onSubmit={handleSubmit}>
        <input placeholder="Course" onChange={e => setCourse(e.target.value)} /><br/>
        <input placeholder="Title" onChange={e => setTitle(e.target.value)} /><br/>
        <input placeholder="Date" onChange={e => setDate(e.target.value)} /><br/>
        <input placeholder="Time" onChange={e => setTime(e.target.value)} /><br/>
        <input placeholder="Venue" onChange={e => setVenue(e.target.value)} /><br/>

        <button type="submit">Generate</button>
      </form>

      {message && (
        <>
          <h3>WhatsApp Message</h3>
          <pre>{message}</pre>
          <button onClick={() => navigator.clipboard.writeText(message)}>
            Copy
          </button>
        </>
      )}
    </div>
  )
}