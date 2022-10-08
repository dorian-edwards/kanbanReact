const Column = require('./Column')
const {
  Schema: {
    Types: { ObjectId },
  },
  model,
} = require('mongoose')

const boardSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  columns: [{ type: ObjectId, ref: 'Column' }],
  userId: {
    type: ObjectId,
    required: true,
    ref: 'User',
  },
})

boardSchema.pre('deleteOne', async function (next) {
  const board = this
  await Column.deleteMany({ boardID: board.id })
  next()
})

module.exports = model('Board', boardSchema)
