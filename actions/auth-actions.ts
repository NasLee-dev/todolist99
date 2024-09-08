'use server'

import { Database } from '@/types_db'
import { createServerSupabaseClient } from '@/utils/supabase/server'

export type UserRow = Database['public']['Tables']['user']['Row']
export type UserRowInsert = Database['public']['Tables']['user']['Insert']
export type UserRowUpdate = Database['public']['Tables']['user']['Update']

interface User {
  email: string
  password: string
  name?: string | undefined
  phoneNo?: string | undefined
}

function handleError(e: Error) {
  console.error(e)
}

export async function getUser({ email, password }: User): Promise<UserRow[]> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('user')
    .select('*')
    .eq('userId', email)
    .eq('password', password)

  if (!data) {
    handleError(error as any)
    return []
  }
  return data
}

export async function createUser({
  email,
  password,
  name,
  phoneNo,
}: User): Promise<UserRowInsert | null> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase.from('user').insert({
    userId: email,
    password,
    name,
    phoneNo,
    created_at: new Date().toISOString(),
  })
  if (!data) {
    handleError(error as any)
    return null
  }
  return data
}
