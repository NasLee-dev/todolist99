import { render, screen } from '@testing-library/react'
import TextField from '../components/TextField'

describe('TextField', () => {
  it('렌더링 테스트', async () => {
    await render(<TextField />)
    const textField = screen.getByPlaceholderText('Type here')
    expect(textField).toBeInTheDocument()
  })
})
