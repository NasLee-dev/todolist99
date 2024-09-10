'use client'

import { getUser, UserRow } from '@/actions/auth-actions'
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
      if (data === 201) {
        alert('아이디가 없거나 비밀번호가 틀렸습니다')
        return
      } else if (typeof data === 'object') {
        setUser({
          userId: data.userId,
          name: data.name,
        })
        setSessionStorage({
          userId: data.userId,
          name: data.name,
        })
      }
    },
  })
}
