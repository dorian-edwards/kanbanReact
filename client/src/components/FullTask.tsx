import verticalEllipses from '../assets/icon-vertical-ellipsis.svg'
import check from '../assets/icon-check.svg'
import { useState } from 'react'
import { SubtaskInterface } from '../Interfaces/ObjectInterfaces'

const dummySubtask: SubtaskInterface = {
  _id: '123',
  content: 'I be listening to jazz yo',
  complete: true,
  parentTask: '1234',
  userId: '1234',
}

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
    <div className='subtask-wrapper bg-light-gray-bg rounded-[4px] p-4 flex gap-x-4 items-center'>
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

export default function FullTask() {
  return (
    <div className='task-wrapper w-full max-w-[480px] bg-white rounded-md p-8'>
      <div className='task-heading flex justify-between items-center'>
        <h2 className='heading-l mb-6'>Filler</h2>
        <button type='button'>
          <img src={verticalEllipses} alt='vertical ellipses' />
        </button>
      </div>
      <p className='body-l text-med-gray mb-6'>
        Here is something to talk about
      </p>
      <div className='subtask-wrapper'>
        <h3 className='body-m text-med-gray mb-4'>{'Subtasks (2 of 3)'}</h3>
        <SubtaskListing />
      </div>
    </div>
  )
}
