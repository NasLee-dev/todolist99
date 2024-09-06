import { useDeleteTodo, useUpdateTodo } from '@/hooks/useMutateTodos'
import { TodoType } from '@/models/todo'
import { useState } from 'react'
import Button from './Button'

interface TodoProps {
  todo: TodoType
}

export default function Todos({ todo }: TodoProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [completed, setCompleted] = useState(todo.completed)
  const [title, setTitle] = useState(todo.title)

  const updateTodoMutation = useUpdateTodo({
    id: todo.id,
    title: title ?? '',
    completed: completed ?? false,
  })

  const deleteTodoMutation = useDeleteTodo({
    id: todo.id,
  })
  return (
    <div className="flex flex-row items-center w-full gap-4 bg-white shadow-md rounded-lg p-4 hover:bg-gray-50 transition duration-200">
      <input
        className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
        type="checkbox"
        checked={completed ?? false}
        onChange={async (e) => {
          setCompleted(e.target.checked)
          await updateTodoMutation.mutateAsync()
        }}
      />
      {isEditing ? (
        <input
          className="flex-1 border-b-2 border-blue-500 focus:outline-none focus:border-blue-700 transition duration-200 z-10"
          type="text"
          value={title ?? ''}
          onChange={(e) => {
            setTitle(e.target.value)
          }}
        />
      ) : (
        <p
          className={`flex-1 ${
            completed ? 'line-through text-gray-500' : 'text-gray-700'
          }`}
        >
          {title}
        </p>
      )}
      {isEditing ? (
        <Button
          width={8}
          height={8}
          label=""
          className="text-green-600 hover:text-green-800 transition duration-200 mr-2"
          icon={<i className="fas fa-check"></i>}
          onClick={async () => {
            await updateTodoMutation.mutateAsync()
            setIsEditing(false)
          }}
        />
      ) : (
        <Button
          width={8}
          height={8}
          label=""
          className="text-blue-600 hover:text-blue-800 transition duration-200 mr-2"
          onClick={() => {
            setIsEditing(true)
          }}
          icon={<i className="fas fa-pencil-alt"></i>}
        />
      )}
      <Button
        width={8}
        height={8}
        label=""
        icon={<i className="fas fa-trash"></i>}
        className="text-red-600 hover:text-red-800 transition duration-200"
        onClick={async () => {
          await deleteTodoMutation.mutateAsync()
        }}
      />
    </div>
  )
}
