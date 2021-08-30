const express = require("express");
const router = express.Router();
const {
  postRegister,
  postLogIn,
  getCurrent,
} = require("../../controllers/controllers");
const passport = require("passport");

// load user model
const User = require("../../models/User");

// routes following api/users/

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  getCurrent
);

// @route   POST api/users/register
// @desc    Adds new user
// @access  Public
router.post("/register", postRegister);

// @route   POST api/users/login
// @desc    Logs in user
// @access  Public
router.post("/login", postLogIn);

module.exports = router;
