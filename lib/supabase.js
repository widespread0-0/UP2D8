import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://gofwkdtofpxwvjapniod.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvZndrZHRvZnB4d3ZqYXBuaW9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNjY1NjMsImV4cCI6MjA5MzY0MjU2M30.4B9Wq9ufbtdXq68TUMkA90u1Js2EDxLFNPvdCdVj4Ws"

export const supabase = createClient(supabaseUrl, supabaseKey)