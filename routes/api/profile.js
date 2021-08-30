const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load validation
const validateProfileInput = require("../../validation/profile");
const validateInjectionSitesInput = require("../../validation/sites");

// Load profile model
const Profile = require("../../models/Profile");
// Load user profile
const User = require("../../models/User");

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Profile works" }));

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["email", "avatar"])
      .then((profile) => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch((err) => res.status(404).json(err));
  }
);

// @route    GET api/profile/handle/:handle
// @desc     Get profile by handl
// @access   Private
router.get(
  "/handle/:handle",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ handle: req.params.handle })
      .populate("user", ["email", "avatar"])
      .then((profile) => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch((err) => res.status(404).json(err));
  }
);

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Private
router.get(
  "/user/:user_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.params.user_id })
      .populate("user", ["email", "avatar"])
      .then((profile) => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch((err) =>
        res.status(404).json({ profile: "There is no profile for this user" })
      );
  }
);

// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check validation
    if (!isValid) {
      //Return errors with 400 status
      return res.status(400).json(errors);
    }
    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.drugname) profileFields.drugname = req.body.drugname;
    if (req.body.cyclelengthdays)
      profileFields.cyclelengthdays = req.body.cyclelengthdays;

    // Vial info
    profileFields.vialinfo = {};
    if (req.body.vialvolml)
      profileFields.vialinfo.vialvolml = req.body.vialvolml;
    if (req.body.vialconcentrationmgml)
      profileFields.vialinfo.vialconcentrationmgml =
        req.body.vialconcentrationmgml;
    if (req.body.expirydate)
      profileFields.vialinfo.expirydate = req.body.expirydate;

    // Dose info
    profileFields.doseinfo = {};
    if (req.body.dosecc) profileFields.doseinfo.dosecc = req.body.dosecc;
    Profile.findOne({ user: req.user.id }).then((profile) => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then((profile) => res.json(profile));
      } else {
        // Create
        // Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then((profile) => {
          if (profile) {
            errors.handle = "That handle already exists";
            res.status(400).json(errors);
          }
          // Save Profile
          new Profile(profileFields)
            .save()
            .then((profile) => res.json(profile));
        });
      }
    });
  }
);

// @route   POST api/profile/injectionsites
// @desc    Add or edit injection sites to profile
// @access  Private
router.post(
  "/sites",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateInjectionSitesInput(req.body);

    // Check validation
    if (!isValid) {
      //Return errors with 400 status
      return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id }).then((profile) => {
      const newSites = {
        leftarm: req.body.leftarm,
        rightarm: req.body.rightarm,
        leftthigh: req.body.leftthigh,
        rightthigh: req.body.rightthigh,
        lefthip: req.body.lefthip,
        righthip: req.body.righthip,
      };
      profile.injectionsiteinfo.injectionsites = newSites;
      profile.save().then((profile) => res.json(profile));
    });
  }
);

module.exports = router;
