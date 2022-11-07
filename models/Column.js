const {
  Schema,
  Schema: {
    Types: { ObjectId },
  },
  model,
} = require('mongoose')
const Task = require('./Task')
const Board = require('./Board')

const columnSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  tasks: [{ type: ObjectId, ref: 'Task' }],
  boardId: { type: ObjectId, required: true, ref: 'Board' },
  userId: { type: ObjectId, required: true, ref: 'User' },
})

columnSchema.pre(
  'deleteOne',
  { document: true, query: false },
  async function () {
    const tasks = await Task.find({ status: this.id })
    for (let task of tasks) {
      await task.deleteOne()
    }
  }
)

module.exports = model('Column', columnSchema)
