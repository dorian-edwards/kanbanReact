const SubTask = require('../models/SubTask')
const catchAsync = require('../utils/catchAsync')

exports.getAllSubtasks = catchAsync(async (req, res, next) => {
  res.send('get all subtasks')
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
