import { createUser } from '@/actions/auth-actions'
import { useMutation } from '@tanstack/react-query'

interface User {
  email: string
  password: string
  name: string
  phoneNo: string
}

export default function useMutateUser({
  email,
  password,
  name,
  phoneNo,
}: User) {
  return useMutation({
    mutationKey: ['createUser'],
    mutationFn: async () => {
      await createUser({ email, password, name, phoneNo })
    },
    onSuccess: () => {
      alert('회원가입이 완료되었습니다.')
    },
  })
}
