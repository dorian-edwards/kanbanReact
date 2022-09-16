const Column = require('./Column')
const { Schema, model } = require('mongoose')

const boardSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  userID: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  columns: [Schema.Types.ObjectId],
})

boardSchema.pre('deleteOne', async function (next) {
  const board = this
  await Column.deleteMany({ boardID: board.id })
  next()
})

module.exports = model('Board', boardSchema)
