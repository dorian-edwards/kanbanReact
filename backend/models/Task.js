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
  status: { type: ObjectId, required: true, ref: 'Column' },
  subtasks: [{ type: ObjectId, ref: 'Subtask' }],
  userId: { type: ObjectId, required: true, ref: 'User' },
})

module.exports = model('Task', taskSchema)
