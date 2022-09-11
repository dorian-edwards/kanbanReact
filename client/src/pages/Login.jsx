import { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../components/AuthProvider'

const baseUrl = process.env.REACT_APP_BASE_URL_DEV
console.log(baseUrl)

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const value = useAuth()
  console.log(value)
  const { login } = useAuth()

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const clearInput = () => {
    setEmail('')
    setPassword('')
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const { data } = await axios.post(
        `${baseUrl}/login`,
        { email, password },
        { withCredentials: true }
      )
      console.log(data)
      await login(data)
      clearInput()
    } catch (err) {
      console.log(err)
      clearInput()
    }
  }

  return (
    <>
      <h1>Login</h1>
      <div className='form-wrapper'>
        <form onSubmit={handleSubmit}>
          <label htmlFor='email'>Email: </label>
          <input
            className='border-solid border-[1px] border-black'
            type='email'
            required
            value={email}
            onChange={handleEmail}
          />
          <label htmlFor='password'>Password: </label>
          <input
            className='border-solid border-[1px] border-black'
            type='password'
            required
            value={password}
            onChange={handlePassword}
          />
          <button className='bg-slate-400 text-white' type='submit'>
            Submit
          </button>
        </form>
      </div>
    </>
  )
}
