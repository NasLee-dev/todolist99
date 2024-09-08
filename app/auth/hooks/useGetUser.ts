'use client'

import { getUser } from '@/actions/auth-actions'
import useSessionStorage from '@/hooks/useSessionStorage'
import { userAtom } from '@/store/userAtom'
import { useMutation } from '@tanstack/react-query'
import { useAtom } from 'jotai'

interface User {
  email: string
  password: string
}

export default function UseGetUser({ email, password }: User) {
  const [, setUser] = useAtom(userAtom)
  const [sessionStorage, setSessionStorage] = useSessionStorage({
    key: 'auth',
    initialValue: { userId: '', name: '' },
  })
  return useMutation({
    mutationKey: ['getUser'],
    mutationFn: () => getUser({ email, password }),
    onSuccess: (data) => {
      setUser({
        userId: data[0].userId,
        name: data[0].name,
      })
      setSessionStorage({
        userId: data[0].userId,
        name: data[0].name,
      })
    },
  })
}
