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
    for (let { _id } of this.columns) {
      const col = await Column.findById(_id)
      await col.deleteOne()
    }
  }
)

module.exports = model('Board', boardSchema)
