import { getTodos } from '@/actions/todo-actions'
import { useQuery } from '@tanstack/react-query'

export default function useGetTodos({ searchInput }: { searchInput: string }) {
  return useQuery({
    queryKey: ['todos'],
    queryFn: () => getTodos({ searchInput }),
  })
}
