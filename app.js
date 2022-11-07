// Module Imports
const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')

// Middleware imports
const checkAuth = require('./middleware/checkAuth')

// Route Imports
const authRouter = require('./routes/auth')
const boardRouter = require('./routes/board')
const taskRouter = require('./routes/task')
const subtaskRouter = require('./routes/subtask')
const columnRouter = require('./routes/column')

// Configuration
const app = express()
require('./config/passport')(passport)

// MiddleWare
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(logger('dev'))
app.use(
  session({
    secret: 'Sniff those lima beans, a bit funny aint they?',
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 8 * 60 * 60 * 1000,
    },
    store: MongoStore.create({ mongoUrl: process.env.URI }),
  })
)
app.use(express.static('build'))

// will need to change names later
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:5000',
      'https://uptight-hare-robe.cyclic.app',
      'https://kanban-100hours.herokuapp.com',
    ],
    credentials: true,
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type, Accept'],
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', authRouter)
app.use('/board', checkAuth, boardRouter)
app.use('/task', checkAuth, taskRouter)
app.use('/subtask', checkAuth, subtaskRouter)
app.use('/column', checkAuth, columnRouter)
app.use('/*', checkAuth, (req, res) => {
  res.sendFile('index.html')
})

module.exports = app
