const express = require('express')
const session = require('express-session')
const path = require('path')
const pg = require('pg')
const bcrypt = require('bcrypt')

const pool = new pg.Pool({
    user: 'tbot',
    host: 'localhost',
    database: 'ttrack',
    password: 'tbot',
    port: 5432
})

const app = express()

app.use(session({ secret: 'UniqueSession'}))
app.use(express.json())
app.use(
    express.urlencoded({
        extended: true
    })
)

// fetch css
app.use('/css/', express.static(path.join(__dirname, 'css')))

// routes with GET and POST requests
app.get('/', (req, res) => {
    if(req.session.count === undefined) {
        req.session.count = 0
    }
    const count = req.session.count
    req.session.count = req.session.count + 1
    res.send(`You've visited ${count} times!`)
})

// sign up
app.get('signup', (req, res) => {
    let username = req.body.username
    let password = req.body.password
    let password_confirm = req.body.confirm_password
    if(!username || !password || !password_confirm) {
        res.send('Error! Please fill in all fields')
    }
})