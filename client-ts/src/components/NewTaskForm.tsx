import React, { useState } from 'react'
import InputField from './InputField'

const flashError = (): void => {
  const inputFieldWrapper = document.querySelector('.input-wrapper')

  if (inputFieldWrapper !== null) {
    inputFieldWrapper.classList.add('error')

    const run = setTimeout(() => {
      inputFieldWrapper.classList.remove('error')
      clearInterval(run)
    }, 3000)
  }
}

export default function NewTaskForm() {
  const [title, setTitle] = useState<string>('')

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value)
  }

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!title.trim()) {
      console.log('empty')
      return flashError()
    }
  }

  return (
    <div className='new-task-form-wrapper'>
      <h1>Add Task</h1>
      <form onSubmit={handleSubmit}>
        <InputField
          label='Title'
          placeholder='e.g. Take a coffee break'
          value={title}
          onChange={handleTitleChange}
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
