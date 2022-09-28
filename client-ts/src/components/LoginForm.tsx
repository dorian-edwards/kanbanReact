import React, { useState } from 'react'
import InputField from './inputs/InputField'
import Button from './Button'

export default function LoginForm() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setEmail(e.target.value)

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>): void => {
    // todo
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
      <a
        href='/signup'
        className='block text-center text-main-purple heading-s'
      >
        Sign Up
      </a>
    </div>
  )
}
