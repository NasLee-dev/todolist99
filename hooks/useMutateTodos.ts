import { createTodo, deleteTodo, updateTodo } from '@/actions/todo-actions'
import { queryClient } from '@/config/ReactQueryClientProvider'
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from '@tanstack/react-query'
import { Dispatch, SetStateAction } from 'react'

export function useCreateTodo({
  searchInput = '',
  refetch,
  setSearchInput,
}: {
  searchInput: string
  refetch: (options?: RefetchOptions | undefined) => Promise<
    QueryObserverResult<
      {
        completed: boolean | null
        created_at: string
        id: number
        title: string | null
        updated_at: string | null
      }[],
      Error
    >
  >
  setSearchInput: Dispatch<SetStateAction<string>>
}) {
  return useMutation({
    mutationKey: ['createTodo'],
    mutationFn: () =>
      createTodo({
        title: searchInput,
        completed: false,
      }),
    onSuccess: () => {
      setTimeout(() => {
        refetch()
      }, 500)
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
