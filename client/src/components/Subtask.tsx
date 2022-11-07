import { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../providers/AuthProvider'
import { SubtaskProps } from '../Interfaces/ObjectInterfaces'
import CheckInput from './CheckInput'

const baseUrl = 'https://kanban.cyclic.app'

export default function Subtask({
  _id,
  content,
  complete,
  setCompleted,
}: SubtaskProps) {
  const [isComplete, setIsComplete] = useState<boolean>(complete)
  const { updateBoards } = useAuth()

  const toggleComplete = async () => {
    const { data } = await axios.put(
      `${baseUrl}/subtask/${_id}/toggle`,
      {},
      { withCredentials: true }
    )
    setCompleted(!isComplete ? 1 : -1)
    setIsComplete(!isComplete)
    updateBoards(data.parentTask.status.boardId)
  }

  return (
    <div className='subtask-wrapper bg-light-gray-bg dark:bg-v-dark-gray rounded-[4px] p-4 flex gap-x-4 items-center hover:bg-main-purple-opaque-hover'>
      <CheckInput complete={isComplete} toggleComplete={toggleComplete} />
      <p
        className={`body-m text-black dark:text-white ${
          isComplete ? 'opacity-50 line-through' : ''
        }`}
      >
        {content}
      </p>
    </div>
  )
}
