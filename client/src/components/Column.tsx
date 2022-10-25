import { useState, useEffect } from 'react'
import { ColumnInterface, TaskInterface } from '../Interfaces/ObjectInterfaces'
import Task from './Task'

export default function Column({
  column,
  color,
}: {
  column: ColumnInterface
  color: string
}) {
  return (
    <div className='column-wrapper w-[280px] flex-shrink-0'>
      <div className='column-header flex gap-3 items-center mb-6'>
        <div className={`bauble w-[15px] h-[15px] rounded-full ${color}`}></div>
        <div className='column-title uppercase heading-s'>{column.title}</div>
      </div>
      {column.tasks?.length === 0 ? (
        ''
      ) : (
        <ul className='task-wrapper'>
          {column.tasks?.map((task: TaskInterface) => (
            <li key={task._id}>
              <Task task={task} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
