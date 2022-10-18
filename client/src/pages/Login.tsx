import LoginForm from '../components/LoginForm'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../providers/AuthProvider'

export default function Login() {
  const { user } = useAuth()
  if (user) return <Navigate to='/home' replace={true} />

  return (
    <div className='login-form-wrapper pt-40 px-4'>
      <LoginForm />
    </div>
  )
}
