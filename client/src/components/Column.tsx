import { useState, useEffect } from 'react'
import { ColumnInterface, TaskInterface } from '../Interfaces/ObjectInterfaces'
import Overlay from '../Overlays/Overlay'
import FullTask from './FullTask'
import Task from './Task'

export default function Column({
  column,
  color,
}: {
  column: ColumnInterface
  color: string
}) {
  const [taskOpen, setTaskOpen] = useState<boolean>(false)
  return (
    <>
      <Overlay open={taskOpen} close={() => setTaskOpen(false)}>
        <FullTask />
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
                <button type='button' onClick={() => setTaskOpen(true)}>
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
