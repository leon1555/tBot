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
  vialinfo: 
    {
      vialvolml: {
        type: Decimal128,
      },
      vialconcentrationmgml: {
        type: Decimal128,
      },
      tdosemg: {
        type: Number,
      },
      expirydate: {
        type: Date,
      },
    },
  doseinfo:
    {
      dosecc: {
        type: Decimal128,
      },
      totaldosesvial: {
        type: Number,
      },
      dosesremainingvial: {
        type: Number,
      },
    },
  cyclelengthdays: {
    type: Number,
  },
  injectionsiteinfo:
    {
      injectionsites: {
        leftarm: {
            type: Boolean
        },
        rightarm: {
            type: Boolean
        },
        leftthigh: {
            type: Boolean
        },
        rightthigh: {
            type: Boolean
        },
        lefthip: {
            type: Boolean
        },
        righthip: {
            type: Boolean
        }
      },
      lastinjectionsite: {
        type: String,
      },
      nextinjectionsite: {
        type: String,
      },
    },
  lastinjectiondate: {
    type: Date,
  },
  nextinjectiondate: {
    type: Date,
  },
});

module.exports = Profile = mongoose.model('profile', ProfileSchema)