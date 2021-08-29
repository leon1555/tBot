const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InjectionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    injectiondate: {
        type: Date,
        default: Date.now
    },
    injectionsite: {
        type: String
    },
    drugname: {
        type: String
    },
    dosecc: {
        type: Number
    },
    avatar: {
        type: String
    }

})

module.exports = Injection = mongoose.model('injection', InjectionSchema)