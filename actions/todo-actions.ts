'use server'

import { Database } from '@/types_db'
import { createServerSupabaseClient } from '@/utils/supabase/server'

export type TodoRow = Database['public']['Tables']['todo']['Row']
export type TodoRowInsert = Database['public']['Tables']['todo']['Insert']
export type TodoRowUpdate = Database['public']['Tables']['todo']['Update']

function handleError(e: Error) {
  console.error(e)
}

export async function getTodos({ searchInput = '' }): Promise<TodoRow[]> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('todo')
    .select('*')
    .ilike('title', `%${searchInput}%`)
    .order('created_at', { ascending: true })
  if (!data) {
    handleError(error as any)
    return []
  }
  return data
}

export async function createTodo(todo: TodoRowInsert): Promise<TodoRow | null> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase.from('todo').insert({
    ...todo,
    created_at: new Date().toISOString(),
  })
  if (!data) {
    handleError(error as any)
    return null
  }
  return data
}

export async function updateTodo(todo: TodoRowUpdate): Promise<TodoRow | null> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('todo')
    .update({
      ...todo,
      updated_at: new Date().toISOString(),
    })
    .eq('id', Number(todo.id))
  if (!data) {
    handleError(error as any)
    return null
  }
  return data
}

export async function deleteTodo(id: number): Promise<boolean> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase.from('todo').delete().eq('id', id)
  if (!data) {
    handleError(error as any)
    return false
  }
  return data
}
