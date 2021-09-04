const { Decimal128 } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  handle: {
    type: String,
    required: true,
    max: 40,
  },
  drugname: {
    type: String,
  },

  vialvolml: {
    type: Number,
  },
  vialconcentrationmgml: {
    type: Number,
  },
  tdosemg: {
    type: Number,
  },
  expirydate: {
    type: Date,
  },

  dosecc: {
    type: Number,
  },
  totaldosesvial: {
    type: Number,
  },
  dosesremainingvial: {
    type: Number,
  },

  cyclelengthdays: {
    type: Number,
  },

  injectionsites: {
    leftarm: {
      type: Boolean,
    },
    rightarm: {
      type: Boolean,
    },
    leftthigh: {
      type: Boolean,
    },
    rightthigh: {
      type: Boolean,
    },
    lefthip: {
      type: Boolean,
    },
    righthip: {
      type: Boolean,
    },
  },
  lastinjectionsite: {
    type: String,
  },
  nextinjectionsite: {
    type: String,
  },

  lastinjectiondate: {
    type: Date,
  },
  nextinjectiondate: {
    type: Date,
  },
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
