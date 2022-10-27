import { TaskInterface } from '../Interfaces/ObjectInterfaces'
import Subtask from './Subtask'

export default function SubtaskListing({ task }: { task: TaskInterface }) {
  return (
    <>
      <div className='mb-6 flex flex-col gap-y-2'>
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
