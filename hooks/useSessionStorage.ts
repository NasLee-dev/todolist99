import { useEffect, useState } from 'react'

interface UseSessionStorageOptions<T> {
  key: string
  initialValue: T
}

const useSessionStorage = <T>({
  key,
  initialValue,
}: UseSessionStorageOptions<T>): [T, (value: T) => void, () => void] => {
  const [state, setState] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue
    try {
      const sessionStorageValue = window.sessionStorage.getItem(key)
      return sessionStorageValue
        ? JSON.parse(sessionStorageValue)
        : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        window.sessionStorage.setItem(key, JSON.stringify(state))
      } catch (error) {
        console.error(error)
      }
    }
  }, [key, state])

  const setSessionStorage = (value: T) => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value))
      setState(value)
    } catch (error) {
      console.error(error)
    }
  }

  const removeSessionStorage = () => {
    try {
      window.sessionStorage.removeItem(key)
      setState(initialValue)
    } catch (error) {
      console.error(error)
    }
  }
  return [state, setSessionStorage, removeSessionStorage] as const
}

export default useSessionStorage
