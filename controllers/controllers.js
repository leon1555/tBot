const path = require("path");
const bcrypt = require("bcrypt");
const client = require("../db");
const gravatar = require("gravatar");
const bcryptjs = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

// shorthand for MongoDB collection
const collection = client.db("sprint3").collection("ttrack");

// GET requests
const getCurrent = (req, res) => {
  res.json({
    id: req.user.id,
    email: req.user.email,
  });
};

// POST requests
// register
const postRegister = (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //size
        r: "pg", //rating
        d: "mm", // default
      });
      const newUser = new User({
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
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  User.findOne({ email }).then((user) => {
    // Check for user
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }
    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        const payload = { id: user.id, email: user.email, avatar: user.avatar }; // Create JWT payload
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
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
};

module.exports = {
  postLogIn,
  postRegister,
  getCurrent,
};
