const express = require('express')
const session = require('express-session')
const bcrypt = require('bcrypt')
const client = require('./db')
const { getSignUp } = require('./controllers')

const app = express()

app.use(session({ secret: 'UniqueSession'}))
app.use(express.json())
app.use(
    express.urlencoded({
        extended: true
    })
)

// fetch css
// app.use('/css/', express.static(path.join(__dirname, 'css')))

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
app.get('/signup', getSignUp)

app.post('/signup', (req, res) => {
    let username = req.body.username
    let password = req.body.password
    let password_confirm = req.body.confirm_password
    if(!username || !password || !password_confirm) {
        res.send('Error! Please fill in all fields')
    } else {
        let query = { username: username }
        const collection = client.db("sprint3").collection("ttrack")
        client.connect(err => {
            if(err) throw err
            collection.find(query).toArray(async function (err, result) {
                if(err) throw err;
                if(result.length > 0) {
                    res.send('Username already exists! Log in or select a different username')
                } else {
                    if(password !== password_confirm) {
                        res.send('Password confirmation does not match password. Please try again.')
                    } else {
                        let encryptedPassword = await bcrypt.hash(password, 10)
                        let newDocument = { username: username, password: encryptedPassword}
                        collection.insertOne(newDocument, function(err, res) {
                            if(err) throw err
                            console.log('New user added!')
                        })
                        res.send('New user added!')
                    }
                    
                }
            });
        });
    }
});
            
    //     });
    //     if (password !== password_confirm) {
    //         res.send('Password confirmation does not match password. Please try again.')
    //     }
    //     console.log(password, password_confirm)
    // } else {
    //     
    //     let results = await 
    // }
app.listen(3004, function () {
    console.log("Listening at http://localhost:3004");
});