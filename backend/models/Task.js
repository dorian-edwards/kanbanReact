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
  },
  description: {
    type: String,
    required: true,
  },
  status: { type: ObjectId, required: true, ref: 'Column' },
  subtasks: [{ type: ObjectId, ref: 'Subtask' }],
  userId: { type: ObjectId, required: true, ref: 'User' },
})

taskSchema.pre(
  'deleteOne',
  { document: true, query: false },
  async function () {
    const subtasks = await Subtask.find({ parentTask: this.id })
    for (let subtask of subtasks) {
      await subtask.deleteOne()
    }
  }
)

module.exports = model('Task', taskSchema)
