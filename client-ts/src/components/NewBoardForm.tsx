import React, { useState } from 'react'
import InputField from './inputs/InputField'
import Button from './Button'
import cross from '../assets/icon-cross.svg'

export default function NewBoardForm() {
  const [title, setTitle] = useState<string>('')
  const [columnInputs, setColumnInputs] = useState<string[]>([])

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value)
  }

  const handleColumnInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    const data = [...columnInputs]
    data[index] = e.target.value
    setColumnInputs(data)
  }

  const createNewColumnInput = (): void => {
    setColumnInputs([...columnInputs, ''])
  }

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>): void => {
    e.preventDefault()
    console.log('submit form')
  }

  return (
    <div className='new-board-form bg-white w-full max-w-[480px] mx-auto relative dark:bg-dark-gray top-[279px]'>
      <form onSubmit={handleSubmit}>
        <h2 className='heading-l mb-6 text-black dark:text-white'>
          Add New Board
        </h2>
        <InputField
          label='Board Name'
          placeholder='e.g. Web Design'
          value={title}
          onChange={handleTitleChange}
          optionalStyling={'mb-6'}
        />
        <h2 className='body-m text-med-gray mb-2 dark:text-white'>
          Board Columns
        </h2>
        {columnInputs.map((column: string, index: number) => {
          return (
            <div
              className='column-inpt-control flex items-center justify-between mb-3 gap-x-4'
              key={index}
            >
              <InputField
                placeholder='e.g Done'
                value={columnInputs[index]}
                onChange={(e) => handleColumnInputChange(e, index)}
                optionalStyling={'w-full'}
              />
              <button>
                <img src={cross} alt='' className='block' />
              </button>
            </div>
          )
        })}
        <Button
          styling='secondary mb-6'
          text='+ Add New Column'
          disabled={false}
          onClick={createNewColumnInput}
          type='button'
        />
        <Button
          styling='primary-s'
          text='Create New Board'
          disabled={false}
          type='submit'
        />
      </form>
    </div>
  )
}
