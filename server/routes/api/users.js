const express = require('express')
const router = express.Router()
const { getSignUp, postSignUp, getLogIn, postLogIn, postRegister, getMain } = require('../../controllers')
const passport = require('passport')


// load user model
const User = require('../../models/User')

// routes following api/users/

// @route   GET api/auth/test
// @desc    Tests auth route
// @access  Public
router.get('/test', (req, res) => res.json({msg: 'Users Works'}));


// @route   GET api/auth/signup
// @desc    Tests auth route
// @access  Public
// sign up
router.get('/signup', getSignUp)
router.post('/signup', postSignUp)

// register
router.post('/register', postRegister)

// log in
router.get('/login', getLogIn)
router.post('/login', postLogIn)

// main
router.get('/main', getMain)

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    })
})
module.exports = router
