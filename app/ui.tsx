'use client'

import Button from '@/components/Button'
import useGetTodos from '@/hooks/useGetTodos'
import { ChangeEvent, useCallback, useState } from 'react'

export default function UI() {
  const [searchInput, setSearchInput] = useState('')
  const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchInput(value)
  }, [])
  const { data, isLoading } = useGetTodos({ searchInput })
  console.log(data)
  return (
    <div className="flex w-2/3 mx-auto flex-col items-center py-10 gap-5">
      <h1 className="text-xl">To Do List</h1>
      <div className="flex flex-row relative w-full">
        <input
          type="text"
          name="search"
          value={searchInput}
          onChange={handleSearch}
          placeholder="리스트를 검색하세요"
          className="w-full border border-gray-300 rounded-md p-3"
        />
        <i className=" fas fa-search absolute right-3 top-4 text-gray-400"></i>
      </div>
      <Button
        width={120}
        height={50}
        label="ADD TODO"
        className=" bg-blue-500 text-white rounded-md"
        icon={<i className="fas fa-plus mr-1"></i>}
        style={{
          gap: '5px',
          width: '120px',
          height: '50px',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
        }}
      />
    </div>
  )
}
