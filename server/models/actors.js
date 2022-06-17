const mongoose = require('mongoose')
const validator = require('validator')


var ActorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true//delet white space from stary and end
    },
    picture: {
        type: String,
        required: true,
        trim: true
    },
    site: {
        type: String,
        required: true,
        trim: true,
    }
}, { timestamps: true }
);

const Actor = mongoose.model('Actor', ActorSchema);

module.exports = Actor