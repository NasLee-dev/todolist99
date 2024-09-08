import { createTodo, deleteTodo, updateTodo } from '@/actions/todo-actions'
import { queryClient } from '@/config/ReactQueryClientProvider'
import { userAtom } from '@/store/userAtom'
import { useMutation } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { Dispatch, SetStateAction } from 'react'

export function useCreateTodo({
  searchInput = '',
  setSearchInput,
}: {
  searchInput: string
  setSearchInput: Dispatch<SetStateAction<string>>
}) {
  const [user, setUser] = useAtom(userAtom)
  return useMutation({
    mutationKey: ['createTodo'],
    mutationFn: () =>
      createTodo({
        title: searchInput,
        completed: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        userId: user.userId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['Alltodos'],
      })
      setSearchInput('')
    },
  })
}

export function useUpdateTodo({
  id,
  title,
  completed,
}: {
  id: number
  title: string
  completed: boolean
}) {
  return useMutation({
    mutationKey: ['updateTodo'],
    mutationFn: () =>
      updateTodo({
        id,
        title,
        completed,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos'],
      })
    },
  })
}

export function useDeleteTodo({ id }: { id: number }) {
  return useMutation({
    mutationKey: ['deleteTodo'],
    mutationFn: () => deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos'],
      })
    },
  })
}
