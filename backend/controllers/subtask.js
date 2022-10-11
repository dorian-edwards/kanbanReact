const Subtask = require('../models/Subtask')
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
  res.send('deleting a route')
})
