const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const keys = require('./config/keys')
const authRoutes = require('./routes/authRoutes')
const billingRoutes = require('./routes/billingRoutes')
const bodyParser = require('body-parser')
require('./models/user')
require('./services/passport')

mongoose.connect(keys.mongoURI)

const app = express()

app.use(bodyParser.json())
const days30 = 30 * 24 * 60 * 60 * 1000
app.use(
  cookieSession({
    maxAge: days30,
    keys: [keys.cookieKey]
  })
)
app.use(passport.initialize())
app.use(passport.session())

authRoutes(app)
billingRoutes(app)

const PORT = process.env.PORT || 5000
app.listen(PORT)
