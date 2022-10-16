import React, { useState } from 'react'
import InputField from './inputs/InputField'
import TextArea from './inputs/TextArea'
import Button from './Button'

import cross from '../assets/icon-cross.svg'

// for now this seems to cover only title. It'll need some tweaking later
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
  const [subtaskInputs, setSubtaskInputs] = useState<string[] | []>([])

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value)
  }

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setDescription(e.target.value)
  }

  const createNewSubtaskInput = (): void => {
    setSubtaskInputs([...subtaskInputs, ''])
  }

  const deleteSubtaskInput = (index: number): void => {
    const editedSubtaskInputs = subtaskInputs.filter(
      (subtask, i) => index !== i
    )
    setSubtaskInputs(editedSubtaskInputs)
  }

  const handleSubtaskInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    const data = [...subtaskInputs]
    data[index] = e.target.value
    setSubtaskInputs(data)
  }

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    //e.preventDefault()
    if (!title.trim()) {
      return flashError()
    }
  }

  return (
    <div className='new-task-form-wrapper'>
      <h2 className='heading-l mb-6'>Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          label='Title'
          placeholder='e.g. Take a coffee break'
          value={title}
          type='text'
          onChange={handleTitleChange}
          optionalStyling='mb-6'
        />
        <TextArea
          label='Description'
          placeholder='e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little.'
          value={description}
          onChange={handleDescriptionChange}
        />
        <h2 className='body-m text-med-gray mb-2 dark:text-white'>Subtasks</h2>
        {subtaskInputs.map((subtask: string, index: number) => (
          <div
            className='column-inpt-control flex items-center justify-between mb-3 gap-x-4'
            key={index}
          >
            <InputField
              placeholder={`subtask ${index + 1}`}
              value={subtaskInputs[index]}
              type='text'
              onChange={(e) => handleSubtaskInputChange(e, index)}
              optionalStyling={'w-full'}
            />
            <button onClick={() => deleteSubtaskInput(index)}>
              <img src={cross} alt='x icon' className='block' />
            </button>
          </div>
        ))}
        <Button
          styling='secondary mb-6'
          text='+ Add New Subtask'
          disabled={false}
          onClick={createNewSubtaskInput}
          type='button'
        />
        <Button
          styling='primary-s'
          text='Create Task'
          disabled={!title.trim() || !description.trim()}
          type='submit'
        />
      </form>
    </div>
  )
}
