import { useState } from 'react'
import SignIn from './signin'
import SignUp from './signup'

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false)
  return isSignUp ? (
    <SignUp setIsSignUp={setIsSignUp} />
  ) : (
    <SignIn setIsSignUp={setIsSignUp} />
  )
}
