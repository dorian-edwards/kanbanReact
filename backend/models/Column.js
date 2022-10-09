const {
  Schema,
  Schema: {
    Types: { ObjectId },
  },
  model,
} = require('mongoose')
const Task = require('../models/Task')

const columnSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  tasks: [{ type: ObjectId, ref: 'Task' }],
  boardId: { type: ObjectId, required: true, ref: 'Board' },
  userId: { type: ObjectId, required: true, ref: 'User' },
})

columnSchema.pre('deleteMany', async function (next) {
  const column = this
  await Task.deleteMany({ status: column.id })
  next()
})

module.exports = model('Column', columnSchema)
