export interface StatResponse {
  id: number
  user_token: string
  content_type: 'goal' | 'dua' | 'allah_name'
  content_id: string
  last_visited_at: string | null
  view_count: number
  notes: string | null
}

export interface NoteUpdate {
  notes: string
}