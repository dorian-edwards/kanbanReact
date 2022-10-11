const Subtask = require('../models/Subtask')
const Task = require('../models/Task')
const catchAsync = require('../utils/catchAsync')

exports.getAllSubtasks = catchAsync(async (req, res, next) => {
  const subtasks = await Subtask.find({ userId: req.user.id })
  res.send(subtasks)
})

exports.getSubtask = catchAsync(async (req, res, next) => {
  res.send(`get single subtask: ${req.params.id}`)
})

exports.createSubtask = catchAsync(async (req, res, next) => {
  res.send('create a new subtask')
})

exports.toggleComplete = catchAsync(async (req, res, next) => {
  res.send(`Toggle complete boolean value of task: ${req.params.id}`)
})

exports.deleteSubtask = catchAsync(async (req, res, next) => {
  const subtask = await Subtask.findById(req.params.id)
  if (!subtask) return res.status(401).end()

  const { parentTask } = subtask
  const task = await Task.findById(parentTask)
  task.subtasks = task.subtasks.filter(
    (subtaskID) => subtaskID.toString() !== subtask.id
  )

  await subtask.deleteOne()
  await task.save()

  res.send('deleting a route')
})
