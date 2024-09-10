'use client'

import Auth from '@/app/todo/auth/page'
import useSessionStorage from '@/hooks/useSessionStorage'
import { userAtom } from '@/store/userAtom'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'

interface AuthGuardProps {
  children: React.ReactNode
}
export default function AuthGuard({ children }: AuthGuardProps) {
  const [user] = useAtom(userAtom)
  const [sessionUser, setSessionUser] = useSessionStorage({
    key: 'auth',
    initialValue: {
      userId: '',
      name: '',
    },
  })
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const storedUser = JSON.parse(
      sessionStorage?.getItem('auth') as string,
    ) || {
      userId: '',
      name: '',
    }
    setSessionUser(storedUser)
    setIsLoggedIn(user.userId !== '' || storedUser.userId !== '')
  }, [user])

  return isLoggedIn ? children : <Auth />
}
