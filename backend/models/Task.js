const { Schema, model } = require('mongoose')
const SubTask = require('../models/SubTask')

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
  subtasks: [{ type: Schema.Types.ObjectId, ref: 'SubTask' }],
  status: { type: Schema.Types.ObjectId, ref: 'Column' },
})

taskSchema.pre('deleteMany', async function (next) {
  const task = this
  await SubTask.deleteMany({ parentTask: task.id })
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

/**
 * Possible edits:
 * - title => change title
 * - description => change description
 * - subtasks => delete missing subtask, add new subtask, alter array????
 */
