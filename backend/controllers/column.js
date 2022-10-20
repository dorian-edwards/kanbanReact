const catchAsync = require('../utils/catchAsync')
const Column = require('../models/Column')
const Board = require('../models/Board')

exports.getAll = catchAsync(async (req, res, next) => {
  const columns = await Column.find({ userId: req.user.id })
  res.send(columns)
})

exports.get = catchAsync(async (req, res, next) => {
  const column = await Column.findById(req.params.id)
  res.send(column)
})

exports.create = catchAsync(async (req, res, next) => {
  const { title, boardId } = req.body
  const board = await Board.findById(boardId)

  const column = await Column.create({
    title: title,
    tasks: [],
    boardId,
    userId: req.user.id,
  })

  board.columns.push(column.id)
  await board.save()
  res.send(column)
})

exports.delete = catchAsync(async (req, res, next) => {
  const { id } = req.params
  const column = await Column.findById(id)
  const board = await Board.findById(column.boardId)

  board.columns = board.columns.filter((column) => column._id !== id)
  await board.save()
  await column.deleteOne()

  res.status(204).send(true)
})
