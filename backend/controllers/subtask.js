const Subtask = require('../models/Subtask')
const Task = require('../models/Task')
const catchAsync = require('../utils/catchAsync')

exports.getAllSubtasks = catchAsync(async (req, res, next) => {
  const subtasks = await Subtask.find({ userId: req.user.id })
  res.send(subtasks)
})

exports.getSubtask = catchAsync(async (req, res, next) => {
  const subtask = await Subtask.findById(req.params.id)
  if (!subtask) return res.status(401).end()

  res.send(subtask)
})

exports.createSubtask = catchAsync(async (req, res, next) => {
  const { content, parentTask } = req.body
  if (!content || !content.trim()) return res.status(400).end()
  const subtask = new Subtask({
    content,
    complete: false,
    parentTask,
    userId: req.user.id,
  })

  const task = await Task.findById(parentTask)
  task.subtasks = [...task.subtasks, subtask.id]
  await subtask.save()
  await task.save()
  res.send(subtask)
})

exports.update = catchAsync(async (req, res, next) => {
  const subtask = await Subtask.findById(req.params.id)
  if (!subtask) return res.status(401).end()

  subtask.content = req.body.content
  await subtask.save()
  res.send(subtask)
})

exports.toggleComplete = catchAsync(async (req, res, next) => {
  const subtask = await Subtask.findById(req.params.id)
  if (!subtask) return res.status(401).end()

  subtask.complete = !subtask.complete
  await subtask.save()
  res.send(subtask)
})

exports.deleteSubtask = catchAsync(async (req, res, next) => {
  const subtask = await Subtask.findById(req.params.id)
  if (!subtask) return res.status(401).end()

  const { parentTask } = subtask
  const task = await Task.findById(parentTask)
  task.subtasks = task.subtasks.filter(
    (subtaskID) => subtaskID._id !== subtask.id
  )

  await subtask.deleteOne()
  await task.save()

  res.status(204).send(true)
})
