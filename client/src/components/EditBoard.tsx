import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../providers/AuthProvider'
import InputField from '../inputs/InputField'
import Button from './Button'
import cross from '../assets/icon-cross.svg'
import { BoardInterface } from '../Interfaces/ObjectInterfaces'

const baseUrl = process.env.REACT_APP_BASE_URL_DEV

export interface EditBoardProps {
  close: () => void
  closeEditPanel: () => void
  currentBoard: BoardInterface | undefined
}

export interface ColumnEditInputs {
  id: string
  title: string
}

export default function EditBoard({
  currentBoard,
  close,
  closeEditPanel,
}: EditBoardProps) {
  const [title, setTitle] = useState<string>('')
  const [columnInputs, setColumnInputs] = useState<ColumnEditInputs[]>([])
  const { updateBoards } = useAuth()

  useEffect(() => {
    if (currentBoard) {
      setTitle(currentBoard.title)
      setColumnInputs(
        currentBoard.columns.map((column) => {
          return { id: column._id, title: column.title }
        })
      )
    }
  }, [currentBoard])

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value)
  }

  const handleColumnInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    const data = [...columnInputs]
    data[index].title = e.target.value
    setColumnInputs(data)
  }

  const createNewColumnInput = (): void => {
    setColumnInputs([...columnInputs, { id: '', title: '' }])
  }

  const deleteColumnInput = (index: number): void => {
    const editedColumnInputs = columnInputs.filter((column, i) => index !== i)
    setColumnInputs(editedColumnInputs)
  }

  const closeAll = () => {
    close()
    closeEditPanel()
  }

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    const board = { title, columns: columnInputs }

    const { data } = await axios.put(
      `${baseUrl}/board/${currentBoard?._id}`,
      board,
      {
        withCredentials: true,
      }
    )
    if (data) {
      updateBoards(data)
      closeEditPanel()
      return close()
    }
    close()
  }

  return (
    <div className='new-board-form bg-white w-[90%] max-w-[480px] dark:bg-dark-gray'>
      <form onSubmit={handleSubmit}>
        <div className='new-board-form-header flex justify-between items-center mb-6'>
          <h2 className='heading-l text-black dark:text-white'>Edit Board</h2>
          <button type='button' onClick={closeAll}>
            <img src={cross} alt='cross icon' />
          </button>{' '}
        </div>
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
        {columnInputs.map((column: ColumnEditInputs, index: number) => {
          return (
            <div
              className='column-inpt-control flex items-center justify-between mb-3 gap-x-4'
              key={index}
            >
              <InputField
                placeholder='e.g Done'
                value={columnInputs[index].title}
                type='text'
                onChange={(e) => handleColumnInputChange(e, index)}
                optionalStyling={'w-full'}
              />
              <button type='button' onClick={() => deleteColumnInput(index)}>
                <img src={cross} alt='x icon' className='block' />
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
          text='Save Changes'
          disabled={!title.trim()}
          type='submit'
        />
      </form>
    </div>
  )
}
