import { useState, useEffect } from 'react'
import { SubtaskInterface } from '../Interfaces/ObjectInterfaces'
import Subtask from './Subtask'

export default function SubtaskListing({
  subtasks,
}: {
  subtasks: SubtaskInterface[]
}) {
  const [completedCount, setCompletedCount] = useState<number>(0)

  useEffect(() => {
    let count = 0
    for (let subtask of subtasks) {
      count = subtask.complete ? count + 1 : count
    }
    setCompletedCount(count)
  }, [subtasks])

  const setCompleted = (num: number): void => {
    setCompletedCount(completedCount + num)
  }

  return (
    <>
      <h3 className='body-m text-med-gray mb-4'>{`Subtasks (${completedCount} of ${subtasks.length})`}</h3>
      <div className='mb-6 flex flex-col gap-y-2'>
        {subtasks.map((subtask) => (
          <Subtask
            key={subtask._id}
            _id={subtask._id}
            content={subtask.content}
            complete={subtask.complete}
            setCompleted={setCompleted}
          />
        ))}
      </div>
    </>
  )
}
