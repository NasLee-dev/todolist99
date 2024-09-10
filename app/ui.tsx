'use client'
import AuthGuard from '@/components/AuthGuard'
import MyTodos from './todo/page'

export default function UI() {
  return (
    <AuthGuard>
      <MyTodos />
    </AuthGuard>
  )
}
