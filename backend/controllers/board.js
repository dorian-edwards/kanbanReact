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

// while named update board this is really for column management...should I rename it then ???
exports.updateBoard = catchAsync(async (req, res, next) => {
  const { title, columns } = req.body
  const board = await Board.findById(req.params.id)

  const newColumns = []
  const newColumnIds = []
  const oldColumns = [...board.columns]

  for (let column of columns) {
    let res = await Column.findOne({ title: column })
    if (!res)
      res = await Column.create({
        title: column,
        tasks: [],
      })

    newColumns.push(res)
    newColumnIds.push(res.id)
  }

  for (let id of oldColumns) {
    if (!newColumnIds.includes(id.toString())) {
      await Column.findByIdAndDelete(id)
    }
  }

  const data = await Board.findByIdAndUpdate(req.params.id, {
    title,
    columns: newColumns,
  })

  res.json(data)
})

exports.deleteBoard = catchAsync(async (req, res, next) => {
  const { user } = req
  const { id } = req.params
  await Board.deleteOne({ _id: id })
  res.send('Board Deleted')
})
