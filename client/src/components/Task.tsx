import SubtaskSummary from './SubtaskSummary'
import { TaskInterface } from './Interfaces/ObjectInterfaces'

export default function Task({ task }: { task: TaskInterface }) {
  return (
    <div className='task bg-white dark:bg-dark-gray dark:text-white px-4 py-[23px] w-full min-w-[280px] rounded-lg'>
      <h3 className='heading-m mb-2'>{task.title}</h3>
      <SubtaskSummary subtasks={task.subtasks} />
    </div>
  )
}
