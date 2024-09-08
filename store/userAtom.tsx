import { User } from '@/models/user'
import { atom } from 'jotai'

export const userAtom = atom<User>({
  userId: '',
  name: '',
})
