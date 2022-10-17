import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../components/providers/AuthProvider'
import {
  ColumnInterface,
  BoardInterface,
  TaskInterface,
  SubtaskInterface,
} from '../components/Interfaces/ObjectInterfaces'

export function Column({
  column,
  color,
}: {
  column: ColumnInterface
  color: string
}) {
  return (
    <div className='column-wrapper w-full max-w-[280px]'>
      <div className='column-header flex gap-3 items-center mb-6'>
        <div className={`bauble w-[15px] h-[15px] rounded-full ${color}`}></div>
        <div className='column-title uppercase heading-s'>{column.title}</div>
      </div>
      <ul className='task-wrapper'>
        {column.tasks.map((task: TaskInterface) => (
          <li key={task._id}>
            <Task task={task} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export function SubtaskSummary({ subtasks }: { subtasks: SubtaskInterface[] }) {
  const totalSubtasks = subtasks.length
  let completedTasks = 0

  for (let subtask of subtasks) {
    if (subtask.complete) completedTasks++
  }
  return (
    <>
      <p className='body-m text-med-gray'>
        {completedTasks} of {totalSubtasks} subtasks
      </p>
    </>
  )
}

export function Task({ task }: { task: TaskInterface }) {
  return (
    <div className='task bg-white dark:bg-dark-gray dark:text-white px-4 py-[23px] w-full min-w-[280px] rounded-lg'>
      <h3 className='heading-m mb-2'>{task.title}</h3>
      <SubtaskSummary subtasks={task.subtasks} />
    </div>
  )
}

export default function Board() {
  const { boards } = useAuth()
  const { boardId } = useParams()
  const [currentBoard, setCurrentBoard] = useState<BoardInterface | undefined>(
    undefined
  )

  //cycles through colors for column icons
  const colorMap = ['bg-teal', 'bg-main-purple', 'bg-aqua-green']
  let color = 2
  const incrementIconColor = (): void => {
    if (color === 2) {
      color = 0
      return
    }
    color++
  }

  useEffect(() => {
    const board = boards.find((board: BoardInterface) => board._id === boardId)
    if (board) return setCurrentBoard(board)
  }, [boardId, boards])

  return (
    <div className='board flex gap-x-6 p-6 w-[100vw]'>
      {currentBoard &&
        currentBoard.columns.map((column) => {
          incrementIconColor()
          return (
            <Column key={column._id} column={column} color={colorMap[color]} />
          )
        })}
    </div>
  )
}
