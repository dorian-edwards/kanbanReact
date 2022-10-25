import { SubtaskInterface } from '../Interfaces/ObjectInterfaces'

export default function SubtaskSummary({
  subtasks,
}: {
  subtasks: SubtaskInterface[]
}) {
  let completedTasks = 0
  let totalSubtasks = 0
  if (subtasks) {
    totalSubtasks = subtasks.length

    for (let subtask of subtasks) {
      if (subtask.complete) completedTasks++
    }
  }

  return (
    <>
      <p className='body-m text-med-gray'>
        {completedTasks} of {totalSubtasks} subtasks
      </p>
    </>
  )
}
