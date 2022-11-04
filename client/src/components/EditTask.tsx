import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../providers/AuthProvider'
import InputField from '../inputs/InputField'
import Button from './Button'
import cross from '../assets/icon-cross.svg'
import {
  BoardInterface,
  ColumnInterface,
  TaskInterface,
} from '../Interfaces/ObjectInterfaces'
import StatusDropDown from './StatusDropDown'
import TextArea from '../inputs/TextArea'
import { useNavigate } from 'react-router-dom'

const baseUrl = process.env.REACT_APP_BASE_URL_DEV

export interface EditTaskProps {
  close: () => void
  closeEditPanel: () => void
  currentBoard?: BoardInterface | undefined
  task: TaskInterface | undefined
}

export interface SubtaskEditInputs {
  id: string
  content: string
}

export default function EditTask({
  close,
  closeEditPanel,
  task,
  currentBoard,
}: EditTaskProps) {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [status, setStatus] = useState<ColumnInterface | undefined>(undefined)
  const [subtaskInputs, setSubtaskInputs] = useState<SubtaskEditInputs[]>([])

  const { updateBoards } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (task) {
      const { title, description, subtasks } = task
      setTitle(title)
      setDescription(description)
      setSubtaskInputs(
        subtasks.map((subtask) => {
          return { id: subtask._id, content: subtask.content }
        })
      )

      if (currentBoard) {
        const { columns } = currentBoard
        const column = columns.find((col) => col._id === task.status)
        setStatus(column)
      }
    }
  }, [task, currentBoard])

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value)
  }

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setDescription(e.target.value)
  }

  const handleSubtaskInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    const data = [...subtaskInputs]
    data[index].content = e.target.value
    setSubtaskInputs(data)
  }

  const createNewSubtaskInput = (): void => {
    setSubtaskInputs([...subtaskInputs, { id: '', content: '' }])
  }

  const deleteSubtaskInput = (index: number): void => {
    const editedSubtaskInputs = subtaskInputs.filter(
      (subtask, i) => index !== i
    )
    setSubtaskInputs(editedSubtaskInputs)
  }

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newTask = { title, description, status, subtaskInputs }
    const { data } = await axios.put(`${baseUrl}/task/${task?._id}`, newTask, {
      withCredentials: true,
    })

    updateBoards(data.status.boardId)
    return navigate('/home')
  }

  const closeAll = () => {
    close()
    closeEditPanel()
  }

  return (
    <div className='new-board-form bg-white w-[90%] max-w-[480px] dark:bg-dark-gray'>
      <form onSubmit={handleSubmit}>
        <div className='new-board-form-header flex justify-between items-center mb-6'>
          <h2 className='heading-l text-black dark:text-white'>Edit Task</h2>
          <button type='button' onClick={closeAll}>
            <img src={cross} alt='cross icon' />
          </button>{' '}
        </div>
        <InputField
          label='Title'
          placeholder='e.g. Web Design'
          value={title}
          type='text'
          onChange={handleTitleChange}
          optionalStyling={'mb-6'}
        />
        <TextArea
          label='Description'
          placeholder='e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little.'
          value={description}
          onChange={handleDescriptionChange}
        />
        <h2 className='body-m text-med-gray mb-2 dark:text-white'>Subtasks</h2>
        {subtaskInputs.map((column: SubtaskEditInputs, index: number) => {
          return (
            <div
              className='column-inpt-control flex items-center justify-between mb-3 gap-x-4'
              key={index}
            >
              <InputField
                placeholder='e.g Done'
                value={subtaskInputs[index].content}
                type='text'
                onChange={(e) => handleSubtaskInputChange(e, index)}
                optionalStyling={'w-full'}
              />
              <button type='button' onClick={() => deleteSubtaskInput(index)}>
                <img src={cross} alt='x icon' className='block' />
              </button>
            </div>
          )
        })}
        <Button
          styling='secondary mb-6'
          text='+ Add New Subtask'
          disabled={false}
          onClick={createNewSubtaskInput}
          type='button'
        />
        <div className='subtask-wrapper'>
          <h3 className='body-m text-med-gray mb-4'>Status</h3>
          <StatusDropDown
            selectedColumn={status}
            currentBoard={currentBoard}
            currentTask={task}
          />
        </div>
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
