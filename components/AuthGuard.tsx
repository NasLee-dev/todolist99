'use client'
import Auth from '@/app/auth'
import useSessionStorage from '@/hooks/useSessionStorage'
import { userAtom } from '@/store/userAtom'
import { useAtom } from 'jotai'
import Link from 'next/link'

interface AuthGuardProps {
  children: React.ReactNode
}
export default function AuthGuard({ children }: AuthGuardProps) {
  const [user] = useAtom(userAtom)
  const [sessionStorage] = useSessionStorage({
    key: 'auth',
    initialValue: { userId: '', name: '' },
  })
  const 로그인이되었는가 = user.userId !== '' || sessionStorage.userId !== ''
  return 로그인이되었는가 ? children : <Auth />
}