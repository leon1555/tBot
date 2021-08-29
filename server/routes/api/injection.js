const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Injection model
const Injection = require("../../models/Injection");
const Profile = require("../../models/Profile");

// Validation
const validateInjectionInput = require("../../validation/injection");

// @route   GET api/injection/test
// @desc    Tests injection route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Injection works" }));

// @route   GET api/injection
// @desc    Gets all injections
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Injection.find()
      .sort({ date: -1 })
      .then((injections) => res.json(injections))
      .catch((err) => res.status(404).json({ nopostsfound: "No posts found" }));
  }
);

// @route   GET api/injection/:id
// @desc    Gets injection by id
// @access  Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Injection.findById(req.params.id)
      .then((injection) => res.json(injection))
      .catch((err) =>
        res.status(404).json({ nopostfound: "No post found with that ID" })
      );
  }
);

// @route   POST api/injection
// @desc    Log injection
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateInjectionInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }
    const newInjection = new Injection({
      user: req.user.id,
      avatar: req.body.avatar,
      dosecc: req.body.dosecc,
      drugname: req.body.drugname,
      injectiondate: req.body.injectiondate,
      injectionsite: req.body.injectionsite,
    });

    newInjection.save().then((injection) => res.json(injection));
  }
);

// @route   DELETE api/injection/:id
// @desc    Delete post
// @access  Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Injection.findById(req.params.id)
            .then(injection => {
                // Check for injection owner
                if(injection.user.toString() !== req.user.id) {
                    return res.status(401).json({ notauthorized: 'User not authorized' })
                }

                // Delete
                injection.remove().then(() => res.json({ success: true}))
            })
            .catch(err => res.status(404).json({ postnotfound: 'No post found' }))
        })
})

module.exports = router;
