import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../providers/AuthProvider'
import InputField from '../inputs/InputField'
import Button from './Button'
import cross from '../assets/icon-cross.svg'
import { ColumnInterface, BoardInterface } from '../Interfaces/ObjectInterfaces'

const baseUrl = '/'

export interface NewColumnInterface {
  title: string
  boardId: string
}

export default function NewColumnForm({
  board,
  close,
  updateColumns,
}: {
  board: string | undefined
  close: () => void
  updateColumns: (column: ColumnInterface) => void
}) {
  const [title, setTitle] = useState<string>('')
  const { user, updateBoards } = useAuth()

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value)
  }

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!board || !user) {
      return setTitle('')
    }

    const column: NewColumnInterface = {
      title,
      boardId: board,
    }

    const { data } = await axios.post(`${baseUrl}/column`, column, {
      withCredentials: true,
    })

    if (data) {
      //updateColumns(data)
      const { data } = await axios.get(`${baseUrl}/board/${board}`, {
        withCredentials: true,
      })

      if (data) {
        updateBoards(data.board)
      }
    }
    setTitle('')
    return close()
  }

  return (
    <div className='new-board-form bg-white w-[90%] max-w-[480px] dark:bg-dark-gray'>
      <form onSubmit={handleSubmit}>
        <div className='new-board-form-header flex justify-between items-center mb-6'>
          <h2 className='heading-l text-black dark:text-white'>
            Add New Column
          </h2>
          <button type='button' onClick={close}>
            <img src={cross} alt='cross icon' />
          </button>{' '}
        </div>
        <InputField
          label='Column Title'
          placeholder='e.g. Web Design'
          value={title}
          type='text'
          onChange={handleTitleChange}
          optionalStyling={'mb-6'}
        />
        <Button
          styling='primary-s'
          text='Create New Column'
          disabled={!title.trim()}
          type='submit'
        />
      </form>
    </div>
  )
}
