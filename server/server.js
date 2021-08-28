const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const path = require('path')
const users = require('./routes/api/users')
const port = process.env.PORT || 5004
const { getRoot } = require('./controllers')
const passport = require('passport')


const app = express()

// DB config
const db = require('./config/keys').mongoURI
// Connect to MongoDB
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err))

// Passport middleware
app.use(passport.initialize())

// Passport config
require('./config/passport')(passport)

// app.use(session({ secret: 'UniqueSession'}))
app.use(express.json())
app.use(
    express.urlencoded({
        extended: true
    })
)

// use routes
app.use('/api/users', users)

// fetch css
app.use('/', express.static(path.join(__dirname, 'css')))

// routes with GET and POST requests
app.get('/', getRoot)

app.listen(port, function () {
    console.log(`Listening at http://localhost:${port}`);
});