import { SubtaskInterface } from '../Interfaces/ObjectInterfaces'

export default function SubtaskSummary({
  subtasks,
}: {
  subtasks: SubtaskInterface[]
}) {
  const totalSubtasks = subtasks.length
  let completedTasks = 0

  for (let subtask of subtasks) {
    if (subtask.complete) completedTasks++
  }
  return (
    <>
      <p className='body-m text-med-gray'>
        {completedTasks} of {totalSubtasks} subtasks
      </p>
    </>
  )
}
