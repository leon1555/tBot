const path = require("path");
const bcrypt = require("bcrypt");
const client = require("./db");
const gravatar = require("gravatar");
const bcryptjs = require("bcryptjs");
const User = require("./models/User");
const jwt = require("jsonwebtoken");
const keys = require("./config/keys");

// load input validation
const validateRegisterInput = require('./validation/register')
const validateLoginInput = require('./validation/login')

// shorthand for MongoDB collection
const collection = client.db("sprint3").collection("ttrack");

// GET requests
// root
const getRoot = (req, res) => {
  if (req.session.count === undefined) {
    req.session.count = 0;
  }
  const count = req.session.count;
  req.session.count = req.session.count + 1;
  res.send(`You've visited ${count} times!`);
};

// /signup
const getSignUp = (req, res) => {
  res.sendFile(path.join(__dirname, "signup.html"));
};

// /login
const getLogIn = (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
};
// /main
const getMain = (req, res) => {
  res.sendFile(path.join(__dirname, "main.html"));
};

// POST requests
// signup
const postSignUp = (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let password_confirm = req.body.confirm_password;
  if (!username || !password || !password_confirm) {
    res.send("Error! Please fill in all fields");
  } else {
    let checkDbForUsername = { username: username };
    client.connect((err) => {
      if (err) throw err;
      collection.find(checkDbForUsername).toArray(async function (err, result) {
        if (err) throw err;
        if (result.length > 0) {
          res.send(
            "Username already exists! Log in or select a different username"
          );
        } else {
          if (password !== password_confirm) {
            res.send(
              "Password confirmation does not match password. Please try again."
            );
          } else {
            let encryptedPassword = await bcrypt.hash(password, 10);
            let newDocument = {
              username: username,
              password: encryptedPassword,
            };
            collection.insertOne(newDocument, function (err, res) {
              if (err) throw err;
              console.log("New user added!");
            });
            res.send("New user added!");
          }
        }
      });
    });
  }
};
// register
const postRegister = (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body)
    // Check validation
    if(!isValid) {
        return res.status(400).json(errors)
    }
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
        errors.email = 'Email already exists'
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //size
        r: "pg", //rating
        d: "mm", // default
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
      });
      bcryptjs.genSalt(10, (err, salt) => {
        bcryptjs.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
};

// login
const postLogIn = (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body)
    // Check validation
    if(!isValid) {
        return res.status(400).json(errors)
    }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  User.findOne({ email }).then((user) => {
    // Check for user
    if (!user) {
        errors.email = 'User not found'
      return res.status(404).json(errors);
    }
    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        const payload = { id: user.id, name: user.name, avatar: user.avatar }; // Create JWT payload
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
          errors.password = 'Password incorrect'
        return res.status(400).json(errors);
      }
    });
  });
  // const username = req.body.username
  // const password = req.body.password
  // let checkDbForUsername = { username: username }
  // client.connect(err => {
  //     if(err) throw err
  //     collection.find(checkDbForUsername).toArray(async (err, result) => {
  //         if(err) throw err;
  //         if(result.length < 1) {
  //             res.send('Account not found. Try again, or sign up if you don\'t yet have an account.')
  //         }
  //         else if(result.length > 1) {
  //             res.send('That\'s weird... Multiple accounts with this username exist. This shouldn\'t normally happen.')
  //         } else {
  //             const stored_password = result[0].password
  //             bcrypt.compare(password, stored_password, async(err, passwordResult) => {
  //                 if(passwordResult) {
  //                     req.session.loggedIn = true
  //                     res.send('You are logged in!')
  //                 } else {
  //                     res.send('Invalid password! Please try again!')
  //                 }
  //             })
  //         }
  //     })
  // })
};

module.exports = {
  getRoot,
  getSignUp,
  getLogIn,
  postSignUp,
  postLogIn,
  postRegister,
  getMain,
};
