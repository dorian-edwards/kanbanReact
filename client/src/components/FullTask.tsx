import verticalEllipses from '../assets/icon-vertical-ellipsis.svg'
import check from '../assets/icon-check.svg'
import { useState } from 'react'
import { TaskInterface } from '../Interfaces/ObjectInterfaces'

export interface CheckInputProps {
  complete: boolean
  toggleComplete: () => void
}

export interface SubtaskProps {
  _id: string
  content: string
  complete: boolean
}

export function CheckInput({ complete, toggleComplete }: CheckInputProps) {
  return (
    <button
      type='button'
      onClick={toggleComplete}
      className={`w-4 h-4 rounded-sm ${
        complete ? 'bg-main-purple' : 'bg-white'
      }  text-center`}
    >
      {complete && <img src={check} alt='white check' className='m-auto' />}
    </button>
  )
}

export function Subtask({ _id, content, complete }: SubtaskProps) {
  const [isComplete, setIsComplete] = useState<boolean>(complete)

  const toggleComplete = () => {
    setIsComplete(!isComplete)
  }

  return (
    <div className='subtask-wrapper bg-light-gray-bg rounded-[4px] p-4 flex gap-x-4 items-center hover:bg-main-purple-opaque-hover'>
      <CheckInput complete={isComplete} toggleComplete={toggleComplete} />
      <p
        className={`body-m text-black ${
          isComplete ? 'opacity-50 line-through' : ''
        }`}
      >
        {content}
      </p>
    </div>
  )
}

export function SubtaskListing() {
  return <Subtask _id='123' content='listening to jazz yo' complete={true} />
}

export default function FullTask({
  task,
}: {
  task: TaskInterface | undefined
}) {
  let completedTasks = 0
  if (task) {
    for (let subtask of task.subtasks) {
      if (subtask.complete) completedTasks++
    }
  }

  return (
    <div className='task-wrapper w-full max-w-[480px] bg-white rounded-md p-8'>
      <div className='task-heading flex justify-between items-center  mb-6'>
        <h2 className='heading-l'>{task?.title || ''}</h2>
        <button type='button'>
          <img src={verticalEllipses} alt='vertical ellipses' />
        </button>
      </div>
      <p className='body-l text-med-gray mb-6'>{task?.description || ''}</p>
      <div className='subtask-wrapper'>
        <h3 className='body-m text-med-gray mb-4'>{`Subtasks (${completedTasks} of ${
          task?.subtasks.length || 0
        })`}</h3>
        <>
          {task?.subtasks.map((subtask) => (
            <Subtask
              key={subtask._id}
              _id={subtask._id}
              content={subtask.content}
              complete={subtask.complete}
            />
          ))}
        </>
      </div>
    </div>
  )
}
