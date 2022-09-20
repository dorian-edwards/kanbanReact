const { Schema, model } = require('mongoose')
const Task = require('../models/Task')

const columnSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  boardID: { type: Schema.Types.ObjectId, ref: 'Board' },
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
})

columnSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

columnSchema.pre('deleteMany', async function (next) {
  const column = this
  await Task.deleteMany({ status: column.id })
  next()
})

module.exports = model('Column', columnSchema)
