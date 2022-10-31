import { useState } from 'react'
import {
  BoardInterface,
  ColumnInterface,
  TaskInterface,
} from '../Interfaces/ObjectInterfaces'
import Overlay from '../Overlays/Overlay'
import EditTask from './EditTask'
import FullTask from './FullTask'
import Task from './Task'

export default function Column({
  column,
  color,
  currentBoard,
}: {
  column: ColumnInterface
  currentBoard: BoardInterface
  color: string
}) {
  const [taskOpen, setTaskOpen] = useState<boolean>(false)
  const [taskToView, setTaskToView] = useState<TaskInterface | undefined>(
    undefined
  )
  const [taskEditOpen, setTaskEditOpen] = useState<boolean>(false)
  const [taskToEdit, setTaskToEdit] = useState<TaskInterface | undefined>(
    undefined
  )

  const viewTask = (task: TaskInterface) => {
    setTaskToView(task)
    setTaskOpen(true)
  }

  return (
    <>
      <Overlay open={taskOpen} close={() => setTaskOpen(false)}>
        {taskToView && (
          <FullTask task={taskToView} currentBoard={currentBoard} />
        )}
      </Overlay>
      <Overlay open={taskEditOpen} close={() => setTaskEditOpen(false)}>
        {taskToEdit && <EditTask />}
      </Overlay>
      <div className='column-wrapper w-[280px] flex-shrink-0'>
        <div className='column-header flex gap-3 items-center mb-6'>
          <div
            className={`bauble w-[15px] h-[15px] rounded-full ${color}`}
          ></div>
          <div className='column-title uppercase heading-s'>{column.title}</div>
        </div>
        {column.tasks?.length === 0 ? (
          ''
        ) : (
          <ul className='task-wrapper'>
            {column.tasks?.map((task: TaskInterface) => (
              <li key={task._id}>
                <button type='button' onClick={() => viewTask(task)}>
                  <Task task={task} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}
