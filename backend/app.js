const express = require('express')
const authRouter = require('./routes/auth')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/auth', authRouter)

app.get('/', (req, res) => {
  res.send('Hello World')
})

module.exports = app
