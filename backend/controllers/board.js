const catchAsync = require('../utils/catchAsync')
const Board = require('../models/Board')
const Column = require('../models/Column')

exports.createBoard = catchAsync(async (req, res, next) => {
  const { user } = req
  const { title, columns } = req.body
  const board = new Board({
    userId: user.id,
    title,
    columns: [],
  })

  if (columns) {
    for (let column of columns) {
      const createdColumn = await Column.create({
        title: column,
        tasks: [],
        boardId: board._id,
        userId: user.id,
      })
      board.columns.push(createdColumn.id)
    }
  }

  await board.save()
  await board.populate('columns')
  res.send(board)
})

exports.getBoard = catchAsync(async (req, res, next) => {
  const { user } = req
  const { id } = req.params
  const board = await Board.findById(id).populate({
    path: 'columns',
    populate: {
      path: 'tasks',
      model: 'Task',
      populate: {
        path: 'subtasks',
        model: 'Subtask',
      },
    },
  })

  if (board)
    return res.json({
      board,
    })

  return res.status(401).send('No Data')
})

exports.getAllBoards = catchAsync(async (req, res, next) => {
  const boards = await Board.find({ userId: req.user.id })
    .populate({
      path: 'columns',
      populate: {
        path: 'tasks',
        model: 'Task',
        populate: {
          path: 'subtasks',
          model: 'Subtask',
        },
      },
    })
    .lean()
  res.send(boards)
})

exports.updateBoard = catchAsync(async (req, res, next) => {
  const { title, columns } = req.body
  const { id } = req.params

  const board = await Board.findById(id)

  if (!board) res.status(404).json(null)

  // check if title needs to change
  if (board.title !== title) board.title = title

  // create a map

  const newColumns = {}

  for (let column of columns) {
    if (!column.id) {
      const newColumn = await Column.create({
        title: column.title,
        tasks: [],
        boardId: board.id,
        userId: req.user.id,
      })
      if (newColumn) {
        newColumns[newColumn.id] = true
      }
    } else {
      const existingColumn = await Column.findById(column.id)
      if (existingColumn.title !== column.title) {
        existingColumn.title = column.title
        await existingColumn.save()
        newColumns[existingColumn.id] = true
      } else {
        newColumns[existingColumn.id] = true
      }
    }
  }

  for (let column of board.columns) {
    if (!newColumns[column.toString()]) {
      await Column.findByIdAndDelete(column)
    }
  }

  board.columns = Object.keys(newColumns)
  await board.save()
  await board.populate('columns')

  res.send(board)
})

exports.deleteBoard = catchAsync(async (req, res, next) => {
  const { user } = req
  const { id } = req.params
  const board = await Board.findById(req.params.id)
  await board.deleteOne()
  res.status(204).send(true)
})
