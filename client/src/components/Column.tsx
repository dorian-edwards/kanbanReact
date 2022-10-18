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
    <div className='column-wrapper w-full max-w-[280px]'>
      <div className='column-header flex gap-3 items-center mb-6'>
        <div className={`bauble w-[15px] h-[15px] rounded-full ${color}`}></div>
        <div className='column-title uppercase heading-s'>{column.title}</div>
      </div>
      <ul className='task-wrapper'>
        {column.tasks.map((task: TaskInterface) => (
          <li key={task._id}>
            <Task task={task} />
          </li>
        ))}
      </ul>
    </div>
  )
}
