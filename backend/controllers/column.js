const catchAsync = require('../utils/catchAsync')
const Column = require('../models/Column')
const Task = require('../models/Task')

exports.getAll = catchAsync(async (req, res, next) => {
  const columns = await Column.find({ userId: req.user.id })
  res.send(columns)
})

exports.get = catchAsync(async (req, res, next) => {
  const column = await Column.findById(req.params.id)
  res.send(column)
})

exports.create = catchAsync(async (req, res, next) => {
  const { title, boardId, tasks } = req.body

  const column = await Column.create({
    title: title,
    tasks: [],
    boardId,
    userId: req.user.id,
  })

  res.send(column)
})