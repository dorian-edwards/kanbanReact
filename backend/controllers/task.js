const catchAsync = require('../utils/catchAsync')
const Task = require('../models/Task')
const Column = require('../models/Column')
const Subtask = require('../models/Subtask')

exports.getTask = catchAsync(async (req, res, next) => {
  const { id } = req.params
  const task = await Task.findById(id)

  if (!task) return res.status(401).send(false)

  return res.json(task)
})

exports.getAllTasks = catchAsync(async (req, res, next) => {
  const tasks = await Task.find({ userId: req.user.id })
    .populate('subtasks')
    .lean()
  res.json(tasks)
})

exports.createTask = catchAsync(async (req, res, next) => {
  const { title, description, subtasks, status } = req.body

  const column = await Column.findOne({ title: status })

  const task = new Task({
    title,
    description,
    subtasks: [],
    status: column._id,
    userId: req.user.id,
  })

  if (subtasks.length !== 0) {
    for (let subtask of subtasks) {
      const newSubtask = await Subtask.create({
        content: subtask,
        complete: false,
        parentTask: task._id,
        userId: req.user.id,
      })

      task.subtasks.push(newSubtask.id)
    }
  }

  column.tasks.push(task.id)
  await column.save()
  await task.save()

  await task.populate({
    path: 'status',
    populate: {
      path: 'boardId',
      model: 'Board',
      populate: {
        path: 'columns',
        model: 'Column',
        populate: {
          path: 'tasks',
          model: 'Task',
          populate: {
            path: 'subtasks',
            model: 'Subtask',
          },
        },
      },
    },
  })

  res.send(task)
})

exports.update = catchAsync(async (req, res, next) => {
  const { id } = req.params
  const task = await Task.findById(id)
  if (!task) return res.status(401).send(false)
  const newTask = { ...req.body }

  const originalColumn = await Column.findById(task.status)
  const newColumn = await Column.findById(newTask.status)

  if (originalColumn.id !== newColumn.id) {
    task.status = newTask.status
    originalColumn.tasks = originalColumn.tasks.filter(
      (taskId) => taskId.toString() !== newTask._id
    )

    newColumn.tasks = [...newColumn.tasks, newTask._id]
  }

  if (task.title !== newTask.title.trim()) task.title = newTask.title.trim()

  if (task.description !== newTask.description.trim())
    task.description = newTask.description.trim()

  const newSubtasks = []
  const newSubtaskMap = {}

  if (newTask.subtaskInputs) {
    for (let subtask of newTask.subtaskInputs) {
      console.log(subtask)
      if (!subtask.id) {
        const newSubtask = await Subtask.create({
          content: subtask.content,
          complete: false,
          parentTask: task._id,
          userId: req.user.id,
        })

        newSubtasks.push(newSubtask._id)
        newSubtaskMap[newSubtask._id.toString()] = true
      } else {
        const originalSubtask = await Subtask.findById(subtask.id)
        if (originalSubtask.content !== subtask.content)
          originalSubtask.content = subtask.content
        await originalSubtask.save()
        newSubtasks.push(originalSubtask._id)
        newSubtaskMap[originalSubtask._id.toString()] = true
      }
    }

    for (let oldSubtask of task.subtasks) {
      if (!newSubtaskMap[oldSubtask._id.toString()])
        await Subtask.findByIdAndDelete(oldSubtask._id)
    }

    task.subtasks = newSubtasks
  }
  await task.save()
  await originalColumn.save()
  await newColumn.save()

  await task.populate({
    path: 'status',
    populate: {
      path: 'boardId',
      model: 'Board',
      populate: {
        path: 'columns',
        model: 'Column',
        populate: {
          path: 'tasks',
          model: 'Task',
          populate: {
            path: 'subtasks',
            model: 'Subtask',
          },
        },
      },
    },
  })
  res.send(task)
})

exports.delete = catchAsync(async (req, res, next) => {
  const task = await Task.findById(req.params.id)
  if (!task) return res.status(401).end()

  const { status: taskId } = task
  const column = await Column.findById(taskId)

  column.tasks = column.tasks.filter((taskId) => taskId._id !== task.id)

  await task.deleteOne()
  await column.save()

  res.status(204).send(true)
})
