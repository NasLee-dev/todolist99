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

export async function getUser({
  email,
  password,
}: User): Promise<UserRow | number> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('user')
    .select('*')
    .eq('userId', email)
    .eq('password', password)
    .single()
  if (error) {
    console.log(error)
    if (error.code === 'PGRST116') {
      console.error('User not found or password mismatch')
      return 201
    }
  }
  return data as UserRow
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
  } as any)

  if (!data) {
    handleError(error as any)
    return null
  }
  return data ? data[0] : null
}
