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
    ref: 'User',
  },
  columns: [{ type: Schema.Types.ObjectId, ref: 'Column' }],
})

// boardSchema.set('toJSON', {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString()
//     delete returnedObject._id
//     delete returnedObject.__v
//   },
// })

boardSchema.pre('deleteOne', async function (next) {
  const board = this
  await Column.deleteMany({ boardID: board.id })
  next()
})

module.exports = model('Board', boardSchema)
