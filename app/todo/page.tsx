'use client'
import Button from '@/components/Button'
import SkeletonComponent from '@/components/SkeletonUI'
import Todos from '@/components/Todos'
import { useGetAllTodos, useGetTodos } from '@/hooks/useGetTodos'
import { useCreateTodo } from '@/hooks/useMutateTodos'
import { userAtom } from '@/store/userAtom'
import { useAtom } from 'jotai'
import { ChangeEvent, useCallback, useState } from 'react'

export default function MyTodos() {
  const [searchInput, setSearchInput] = useState('')
  const [user, setUser] = useAtom(userAtom)
  const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchInput(value)
    handleSearchTodos()
  }, [])
  const { data: allTodos, isLoading } = useGetAllTodos()
  const getTodos = useGetTodos({ searchInput })
  const addTodo = useCreateTodo({ searchInput, setSearchInput })

  const handleSearchTodos = useCallback(() => {
    getTodos.mutateAsync()
  }, [searchInput])

  return (
    <div className="flex w-full max-w-2xl mx-auto flex-col items-center gap-2">
      <div className="flex flex-row relative w-full">
        <input
          type="text"
          name="search"
          value={searchInput}
          onChange={(e) => {
            handleSearch(e)
          }}
          placeholder="리스트를 검색하세요"
          className="w-full border border-gray-300 rounded-md p-3 pl-10 focus:outline-none focus:border-blue-500 transition duration-200"
        />
        <i
          aria-label="Search"
          className="fas fa-search absolute left-3 top-4 text-gray-400"
        ></i>
      </div>
      {isLoading && (
        <div className="flex flex-col w-full gap-[10px]">
          <SkeletonComponent />
          <SkeletonComponent />
          <SkeletonComponent />
        </div>
      )}
      <div className="flex flex-col w-full max-h-[500px] overflow-y-auto gap-2">
        {searchInput === ''
          ? allTodos?.map((todo) => <Todos key={todo.id} todo={todo} />)
          : getTodos.data?.map((todo) => <Todos key={todo.id} todo={todo} />)}
      </div>
      <Button
        width={150}
        height={50}
        label="ADD TODO"
        className="bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:bg-blue-700 focus:outline-none transition-all duration-200"
        icon={<i className="fas fa-plus mr-2"></i>}
        style={{
          gap: '2px',
          width: '150px',
          height: '50px',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
        }}
        onClick={() => {
          addTodo.mutate()
        }}
      />
    </div>
  )
}
