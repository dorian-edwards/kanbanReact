import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../components/providers/AuthProvider'
import InputField from './inputs/InputField'
import Button from './Button'
import cross from '../assets/icon-cross.svg'

const baseUrl = process.env.REACT_APP_BASE_URL_DEV

export default function NewBoardForm() {
  const [title, setTitle] = useState<string>('')
  const [columnInputs, setColumnInputs] = useState<string[]>([])
  const navigate = useNavigate()
  const { updateBoards } = useAuth()

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

  const handleDeleteColumnInput = (index: number): void => {
    const editedColumnInputs = columnInputs.filter((column, i) => index !== i)
    setColumnInputs(editedColumnInputs)
  }

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    const board = {
      title,
      columns: columnInputs,
    }

    const { data } = await axios.post(`${baseUrl}/board`, board, {
      withCredentials: true,
    })

    updateBoards(data)
  }

  return (
    <div className='new-board-form bg-white w-[90%] max-w-[480px] dark:bg-dark-gray'>
      <form onSubmit={handleSubmit}>
        <h2 className='heading-l mb-6 text-black dark:text-white'>
          Add New Board
        </h2>
        <InputField
          label='Board Name'
          placeholder='e.g. Web Design'
          value={title}
          type='text'
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
                type='text'
                onChange={(e) => handleColumnInputChange(e, index)}
                optionalStyling={'w-full'}
              />
              <button onClick={() => handleDeleteColumnInput(index)}>
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
          disabled={!title.trim()}
          type='submit'
        />
      </form>
    </div>
  )
}
