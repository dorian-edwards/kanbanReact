const catchAsync = require('../utils/catchAsync')
const Board = require('../models/Board')
const Column = require('../models/Column')

exports.createBoard = catchAsync(async (req, res, next) => {
  const { user } = req
  const { title, columns } = req.body
  const board = new Board({
    userID: user.id,
    title,
    columns: [],
  })

  if (columns) {
    for (let column of columns) {
      const createdColumn = await Column.create({
        title: column,
        tasks: [],
      })
      board.columns.push(createdColumn.id)
    }
  }

  await board.save()
  res.status(201).json({ board })
})

exports.getBoard = async (req, res, next) => {
  const { user } = req
  const { id } = req.params
  const board = await Board.findById(id)
  if (board)
    return res.json({
      board,
    })

  return res.status(401).send('No Data')
}

exports.getAllBoards = catchAsync(async (req, res, next) => {
  // const { user } = req
  // const boards = await Board.find({ userID: user.id })
  // if (boards) return res.json(boards)

  // return res.status(401).send('No boards')

  const boards = await Board.find({ userID: req.user.id }).lean()
  console.log(boards[0]._id)
  res.send('hey')
})

exports.updateBoard = async (req, res, next) => {
  const { user } = req
  const { id } = req.params
  const { title, columns } = req.body

  // get original board
  // get list of columns that are not on new board object
  // delete these columns

  const currentBoardObject = await Board.findById(id).lean()
  const currentColumnList = [...currentBoardObject.columns]

  const deletedColumns = currentColumnList.filter(
    (column) => !columns.includes(column)
  )

  for (let column of deletedColumns) {
    await Column.findByIdAndDelete(column)
  }

  await Board.findByIdAndUpdate(id, { ...req.body })

  res.end()
}

exports.deleteBoard = async (req, res, next) => {
  const { user } = req
  const { id } = req.params
  await Board.deleteOne({ _id: id })
  res.send('Board Deleted')
}
