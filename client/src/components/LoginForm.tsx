import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import InputField from '../inputs/InputField'
import Button from './Button'
import { useAuth } from '../providers/AuthProvider'

const baseUrl = '/'

export default function LoginForm() {
  const { login } = useAuth()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setEmail(e.target.value)

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPassword(e.target.value)
  }

  const clearInput = (): void => {
    setEmail('')
    setPassword('')
  }

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      const { data } = await axios.post(
        `${baseUrl}/auth/login`,
        { email, password },
        { withCredentials: true }
      )
      await login(data)
      clearInput()
    } catch (err) {
      console.log(err)
      clearInput()
    }
  }

  return (
    <div>
      <div className='new-board-form bg-white w-full max-w-[480px] mx-auto relative dark:bg-dark-gray mb-5'>
        <form onSubmit={handleSubmit}>
          <h2 className='heading-l mb-6 text-black dark:text-white'>Login</h2>
          <InputField
            label='Email'
            placeholder='youremail@address.com'
            value={email}
            type='email'
            onChange={handleEmailChange}
            optionalStyling={'mb-6'}
          />

          <InputField
            label='Password'
            placeholder='&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;'
            value={password}
            type='password'
            onChange={handlePasswordChange}
            optionalStyling={'mb-6'}
          />

          <Button
            styling='primary-s'
            text='Login'
            disabled={false}
            type='submit'
          />
        </form>
      </div>
      <div className='block text-center text-main-purple heading-s'>
        <Link to='/register'>Sign Up</Link>
      </div>
    </div>
  )
}
