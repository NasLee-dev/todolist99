'use client'
import Button from '@/components/Button'
import Divider from '@/components/Divider'
import Spacing from '@/components/Spacing'
import TextField from '@/components/TextField'
import UseGetUser from '../hooks/useGetUser'
import React, { Dispatch, SetStateAction, useState } from 'react'

interface Props {
  setIsSignUp?: Dispatch<SetStateAction<boolean>>
}

const SignIn: React.FC<Props> = ({ setIsSignUp }) => {
  const [auth, setAuth] = useState({
    email: '',
    password: '',
  })
  const getUser = UseGetUser(auth)
  return (
    <div className="flex flex-col w-full h-full items-center justify-center bg-white">
      <div className="flex flex-col items-start justify-start w-[400px] border border-gray-200 rounded-xl p-5">
        <TextField
          label="Email"
          type="email"
          placeholder="Email"
          className="w-full"
          onChange={(e) => setAuth({ ...auth, email: e.target.value })}
        />
        <Spacing mg={10} />
        <TextField
          label="Password"
          type="password"
          placeholder="Password"
          className="w-full"
          onChange={(e) => setAuth({ ...auth, password: e.target.value })}
        />
        <Spacing mg={10} />
        <Button
          label="로그인 하기"
          className="w-full bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:bg-blue-700 focus:outline-none transition-all duration-200"
          width={360}
          height={50}
          onClick={() => getUser.mutate()}
        />
        <Spacing mg={10} />
        <Divider />
        <Spacing mg={10} />
        <div className="flex w-full">
          <Button
            label="회원가입 하기"
            className="w-full bg-white text-gray-500 rounded-md border border-gray-200 hover:border-blue-500 hover:text-blue-500 focus:outline-none transition-all duration-200"
            width={360}
            height={50}
            onClick={() => {
              setIsSignUp && setIsSignUp(true)
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default SignIn
