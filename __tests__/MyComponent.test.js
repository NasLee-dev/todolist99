import { render, screen } from '@testing-library/react'
import MyTodos from '../app/todo/page'

describe('MyTodos', () => {
  test('renders MyTodos component', () => {
    render(<MyTodos />)
    const linkElement = screen.getByText(/MyTodos/i)
    expect(linkElement).toBeInTheDocument()
  })
})
