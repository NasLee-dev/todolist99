import { getAllTodos, getTodos } from '@/actions/todo-actions'
import { userAtom } from '@/store/userAtom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'

export function useGetTodos({ searchInput }: { searchInput: string }) {
  const [user, setUser] = useAtom(userAtom)
  return useMutation({
    mutationKey: ['getTodos'],
    mutationFn: () => getTodos({ searchInput, userId: user.userId }),
    onSuccess: (data) => {
      console.log(data)
    },
  })
}

export function useGetAllTodos() {
  const [user, setUser] = useAtom(userAtom)
  return useQuery({
    queryKey: ['Alltodos'],
    queryFn: () => getAllTodos({ userId: user.userId }),
  })
}
