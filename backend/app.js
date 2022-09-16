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
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
)
app.use(passport.initialize())
app.use(passport.session())

//
app.get('/', (req, res) => {
  res.send('Hello World')
})

app.use('/auth', authRouter)
app.use('/workspace/board', checkAuth, boardRouter)

module.exports = app
