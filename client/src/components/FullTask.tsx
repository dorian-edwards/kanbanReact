import verticalEllipses from '../assets/icon-vertical-ellipsis.svg'
import { useEffect, useState } from 'react'
import {
  BoardInterface,
  ColumnInterface,
  TaskInterface,
} from '../Interfaces/ObjectInterfaces'
import StatusDropDown from './StatusDropDown'
import SubtaskListing from './SubtaskListing'

export default function FullTask({
  task,
  currentBoard,
}: {
  task: TaskInterface
  currentBoard: BoardInterface
}) {
  const [status, setStatus] = useState<ColumnInterface | undefined>(undefined)

  useEffect(() => {
    const column = currentBoard.columns.find((col) => col._id === task.status)
    setStatus(column)
  }, [task.status, currentBoard.columns])

  return (
    <div className='task-wrapper w-full max-w-[480px] bg-white dark:bg-dark-gray dark:text-white rounded-md p-8'>
      <div className='task-heading flex justify-between items-center  mb-6'>
        <h2 className='heading-l'>{task?.title || ''}</h2>
        <button type='button'>
          <img src={verticalEllipses} alt='vertical ellipses' />
        </button>
      </div>
      <p className='body-l text-med-gray mb-6'>{task?.description || ''}</p>
      <div className='subtask-wrapper'>
        <SubtaskListing subtasks={task.subtasks} />
        <h3 className='body-m text-med-gray mb-4'>Current Status</h3>
        <StatusDropDown
          selectedColumn={status}
          currentBoard={currentBoard}
          currentTask={task}
        />
      </div>
    </div>
  )
}
