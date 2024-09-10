'use client'
import Button from '@/components/Button'
import Divider from '@/components/Divider'
import Spacing from '@/components/Spacing'
import TextField from '@/components/TextField'
import { SetStateAction } from 'jotai'
import { ChangeEvent, Dispatch, useCallback, useState } from 'react'
import useMutateUser from '../hooks/useMutateUser'

interface SignUpProps {
  setIsSignUp: Dispatch<SetStateAction<boolean>>
}

export default function SignUp({ setIsSignUp }: SignUpProps) {
  const [isDirty, setIsDirty] = useState(false)
  const [formDataMsg, setFormDataMsg] = useState({
    name: '',
    email: '',
    phoneNo: '',
    password: '',
    passwordConfirm: '',
  })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNo: '',
    password: '',
    passwordConfirm: '',
  })

  const handleInputValue = useCallback((key: string, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: value,
    }))
  }, [])

  const handleValidation = useCallback(() => {
    const { email, phoneNo, password, passwordConfirm, name } = formData
    const newFormDataMsg = {
      name: '',
      email: '',
      phoneNo: '',
      password: '',
      passwordConfirm: '',
    }

    let isValid = true
    if (!isDirty) isValid = false

    if (!email.includes('@')) {
      newFormDataMsg.email = '이메일 형식이 아닙니다.'
      isValid = false
    }
    if (password !== passwordConfirm) {
      newFormDataMsg.password = '비밀번호가 일치하지 않습니다.'
      isValid = false
    }
    if (password.length < 8) {
      newFormDataMsg.password = '비밀번호는 8자 이상이어야 합니다.'
      isValid = false
    }
    if (email === '') {
      newFormDataMsg.email = '이메일을 입력해주세요.'
      isValid = false
    }
    if (phoneNo === '') {
      newFormDataMsg.phoneNo = '전화번호를 입력해주세요.'
      isValid = false
    }
    if (name === '') {
      newFormDataMsg.name = '이름을 입력해주세요.'
      isValid = false
    }
    if (password === '') {
      newFormDataMsg.password = '비밀번호를 입력해주세요.'
      isValid = false
    }
    if (passwordConfirm === '') {
      newFormDataMsg.passwordConfirm = '비밀번호 확인을 입력해주세요.'
      isValid = false
    }

    setFormDataMsg(newFormDataMsg)
    return isValid
  }, [formData, isDirty])
  const createUser = useMutateUser({
    email: formData.email,
    password: formData.password,
    name: formData.name,
    phoneNo: formData.phoneNo,
  })
  return (
    <div className="flex flex-col w-full h-full items-center justify-center bg-white">
      <div className="flex flex-col items-start justify-start w-[400px] border border-gray-200 rounded-xl p-5">
        <TextField
          label="Email"
          type="email"
          placeholder="Email"
          className="w-full"
          errorMsg={formDataMsg.email}
          onChange={(e) => {
            setIsDirty(true)
            handleInputValue('email', e.target.value)
          }}
        />
        <Spacing mg={5} />
        <TextField
          label="Name"
          type="text"
          placeholder="Name"
          className="w-full"
          errorMsg={formDataMsg.name}
          onChange={(e) => {
            setIsDirty(true)
            handleInputValue('name', e.target.value)
          }}
        />
        <Spacing mg={5} />
        <TextField
          label="Phone Number"
          type="text"
          placeholder="01012341234"
          className="w-full"
          errorMsg={formDataMsg.phoneNo}
          onChange={(e) => {
            setIsDirty(true)
            handleInputValue('phoneNo', e.target.value)
          }}
        />
        <Spacing mg={10} />
        <TextField
          label="Password"
          type="password"
          placeholder="Password"
          className="w-full"
          errorMsg={formDataMsg.password}
          onChange={(e) => {
            setIsDirty(true)
            handleInputValue('password', e.target.value)
          }}
        />
        <Spacing mg={5} />
        <TextField
          label="Password Confirm"
          type="password"
          placeholder="Password Confirm"
          className="w-full"
          errorMsg={formDataMsg.passwordConfirm}
          onChange={(e) => {
            setIsDirty(true)
            handleInputValue('passwordConfirm', e.target.value)
          }}
        />
        <Spacing mg={5} />
        <Button
          label="회원가입 하기"
          className="w-full bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:bg-blue-700 focus:outline-none transition-all duration-200"
          width={360}
          height={50}
          onClick={() => {
            if (handleValidation()) {
              createUser.mutateAsync()
              setIsSignUp(false)
            } else {
              console.log('회원가입 실패')
            }
          }}
        />
        <Spacing mg={10} />
        <Divider />
        <Spacing mg={10} />
        <div className="flex w-full">
          <Button
            label="로그인 하기"
            className="w-full bg-white text-gray-500 rounded-md border border-gray-200 hover:border-blue-500 hover:text-blue-500 focus:outline-none transition-all duration-200"
            width={360}
            height={50}
            onClick={() => {
              setIsSignUp(false)
            }}
          />
        </div>
      </div>
    </div>
  )
}
