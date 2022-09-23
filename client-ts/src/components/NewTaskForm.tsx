import React, { useState } from 'react'
import InputField from './InputField'
import TextArea from './TextArea'

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
  const [description, setDescription] = useState<string>('')

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value)
  }

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setDescription(e.target.value)
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
        <TextArea
          label='Description'
          placeholder='e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little.'
          value={description}
          onChange={handleDescriptionChange}
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
