const Column = require('./Column')
const {
  Schema,
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

boardSchema.pre(
  'deleteOne',
  { document: true, query: false },
  async function () {
    await Column.deleteMany({ boardId: this.id })
  }
)

module.exports = model('Board', boardSchema)
