import { TaskInterface } from '../Interfaces/ObjectInterfaces'
import Subtask from './Subtask'

export default function SubtaskListing({ task }: { task: TaskInterface }) {
  return (
    <>
      <h3 className='body-m text-med-gray mb-4'>Current Status</h3>
      <div className='mb-6'>
        {task?.subtasks.map((subtask) => (
          <Subtask
            key={subtask._id}
            _id={subtask._id}
            content={subtask.content}
            complete={subtask.complete}
          />
        ))}
      </div>
    </>
  )
}
