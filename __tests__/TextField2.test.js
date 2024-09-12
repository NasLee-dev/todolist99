import { render, screen } from '@testing-library/react'
import TextField from '../components/TextField'

describe('TextField Component', () => {
  it('renders correctly', () => {
    const { container } = render(<TextField label="Name" />)
    expect(container).toMatchSnapshot() // 스냅샷 테스트
  })

  it('displays the label', () => {
    render(<TextField label="Name" />)
    expect(screen.getByLabelText('Name')).toBeInTheDocument() // label이 잘 렌더링되었는지 확인
  })

  it('renders an input field', () => {
    render(<TextField label="Name" />)
    expect(screen.getByRole('textbox')).toBeInTheDocument() // textbox 역할의 input이 존재하는지 확인
  })

  it('shows the correct placeholder', () => {
    render(<TextField label="Name" placeholder="Type here" />)
    expect(screen.getByPlaceholderText('Type here')).toBeInTheDocument() // placeholder가 잘 설정되었는지 확인
  })

  it('sets the value prop correctly', () => {
    render(<TextField label="Name" value="John" />)
    expect(screen.getByRole('textbox')).toHaveValue('John') // input의 value가 잘 설정되었는지 확인
  })

  it('disables the input when disabled prop is true', () => {
    render(<TextField label="Name" disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled() // input이 비활성 상태인지 확인
  })

  it('renders the error message', () => {
    render(<TextField label="Name" errorMsg="Required" />)
    expect(screen.getByText('Required')).toBeInTheDocument() // 에러 메시지가 잘 렌더링되는지 확인
  })

  it('does not render error message when there is none', () => {
    render(<TextField label="Name" />)
    expect(screen.queryByText('Required')).not.toBeInTheDocument() // 에러 메시지가 렌더링되지 않아야 함
  })
})
