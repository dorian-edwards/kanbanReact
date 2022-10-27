import { useState } from 'react'
import { SubtaskProps } from '../Interfaces/ObjectInterfaces'
import CheckInput from './CheckInput'

export default function Subtask({ _id, content, complete }: SubtaskProps) {
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
