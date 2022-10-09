const {
  Schema,
  Schema: {
    Types: { ObjectId },
  },
  model,
} = require('mongoose')
const Subtask = require('../models/Subtask')

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: { type: ObjectId, ref: 'Column' },
  subtasks: [{ type: ObjectId, ref: 'Subtask' }],
  userId: { type: ObjectId, ref: 'User' },
})

taskSchema.pre('deleteMany', async function (next) {
  const task = this
  await Subtask.deleteMany({ parentTask: task.id })
  next()
})

taskSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = model('Task', taskSchema)
