const path = require('path')

function getSignUp(req, res) {
    res.sendFile(path.join(__dirname, 'signup.html'))
}

module.exports = {
    getSignUp
}