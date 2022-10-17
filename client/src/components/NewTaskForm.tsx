import React, { useEffect, useState } from 'react'
import InputField from './inputs/InputField'
import TextArea from './inputs/TextArea'
import Button from './Button'

import chevronDown from '../assets/icon-chevron-down.svg'
import chevronUp from '../assets/icon-chevron-up.svg'
import cross from '../assets/icon-cross.svg'

import { BoardInterface, ColumnInterface } from './Interfaces/ObjectInterfaces'

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
// ************************ End of Error Handling ************************ //
export default function NewTaskForm({
  currentBoard,
  close,
}: {
  currentBoard: BoardInterface | undefined
  close: () => void
}) {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [subtaskInputs, setSubtaskInputs] = useState<string[] | []>([])
  const [isActive, setIsActive] = useState<boolean>(false)
  const [selectedColumn, setSelectedColumn] = useState<
    ColumnInterface | undefined
  >(undefined)

  useEffect(() => {
    setSelectedColumn(currentBoard?.columns[0])
  }, [currentBoard])

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

  const toggleActive = () => setIsActive(!isActive)

  const handleColumnSelect = (column: ColumnInterface): void => {
    setSelectedColumn(column)
    toggleActive()
  }

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    // e.preventDefault()
    if (!title.trim()) {
      return flashError()
    }
  }

  return (
    <div className='new-task-form-wrapper'>
      <div className='new-task-form-header flex justify-between items-center mb-6'>
        <h2 className='heading-l'>Add New Task</h2>
        <button type='button' onClick={close}>
          <img src={cross} alt='cross icon' />
        </button>{' '}
      </div>
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
        <h2 className='body-m text-med-gray mb-2 dark:text-white'>Status</h2>
        <div className={`status-dropdown mb-6`}>
          <div
            className={`status-dropdown-wrapper ${
              isActive
                ? 'border-solid border-[1px] border-input-idle rounded'
                : ''
            }`}
          >
            <div
              className={`flex justify-between items-center input px-4 rounded ${
                isActive ? 'border-none' : ''
              }`}
            >
              <p className='body-l text-black dark:text-white'>
                {selectedColumn?.title}
              </p>
              <button type='button' onClick={toggleActive}>
                <img
                  src={isActive ? chevronUp : chevronDown}
                  alt='downward chevron'
                />
              </button>
            </div>
            {isActive && (
              <ul className='px-4 w-[260px]bg-white dark:bg-dark-gray rounded-br-md'>
                {currentBoard?.columns
                  .filter((column) => column._id !== selectedColumn?._id)
                  .map((column) => (
                    <li
                      key={column._id}
                      className='dark:text-white body-l py-[8.5px]'
                    >
                      <button
                        type='button'
                        onClick={() => handleColumnSelect(column)}
                      >
                        {column.title}
                      </button>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
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
