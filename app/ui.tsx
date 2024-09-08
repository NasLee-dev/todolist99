'use client'
import AuthGuard from '@/components/AuthGuard'
import MyTodos from './MyTodos'

export default function UI() {
  return (
    <AuthGuard>
      <MyTodos />
    </AuthGuard>
  )
}
