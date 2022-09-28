import React, { useState } from 'react'
import axios from 'axios'
import InputField from './inputs/InputField'
import Button from './Button'
import { useAuth } from './providers/AuthProvider'

const baseUrl = process.env.REACT_APP_BASE_URL_DEV

export default function RegistrationForm() {
  const { login } = useAuth()
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setUsername(e.target.value)

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setEmail(e.target.value)

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setPassword(e.target.value)

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => setConfirmPassword(e.target.value)

  const clearInput = (): void => {
    setEmail('')
    setPassword('')
  }

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      // todod
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
          <h2 className='heading-l mb-6 text-black dark:text-white'>
            Register
          </h2>
          <InputField
            label='Username'
            placeholder='username'
            value={username}
            type='text'
            onChange={handleUsernameChange}
            optionalStyling={'mb-6'}
          />

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

          <InputField
            label='Confirm Password'
            placeholder='&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;'
            value={confirmPassword}
            type='password'
            onChange={handleConfirmPasswordChange}
            optionalStyling={'mb-6'}
          />

          <Button
            styling='primary-s'
            text='Register'
            disabled={false}
            type='submit'
          />
        </form>
      </div>
      <a href='/login' className='block text-center text-main-purple heading-s'>
        Login
      </a>
    </div>
  )
}
