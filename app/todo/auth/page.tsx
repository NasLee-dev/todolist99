'use client'
import { useEffect, useState } from 'react'
import SignIn from './signin/page'
import SignUp from './signup/page'
import MyTodos from '../page'

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [sessionUser, setSessionUser] = useState<{
    userId: string
    name: string
  }>({ userId: '', name: '' })

  useEffect(() => {
    const storageData = JSON.parse(
      sessionStorage.getItem('auth') || '{"userId": "", "name": ""}',
    )
    setSessionUser(storageData)

    // 사용자가 로그인되어 있는지 확인
    setIsSignUp(storageData.userId !== '')
  }, [])

  return sessionUser.userId === '' ? (
    isSignUp ? (
      <SignUp setIsSignUp={setIsSignUp} />
    ) : (
      <SignIn setIsSignUp={setIsSignUp} />
    )
  ) : (
    <MyTodos />
  )
}