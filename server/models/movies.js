const mongoose = require('mongoose')
const validator = require('validator');
const Actor = require('./actors');





var MovieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true//delet white space from stary and end
    },
    picture:{
        type: String,
        required: true,
        trim: true
    },
    director:{
        type: String,
        required: true,
        trim: true//delet white space from stary and end
    },
    date: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isDate(value)) {
                throw new Error('date is invalid')
            }
        }
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max:5,
        default:0,
        trim: true
        },
    isSeries: {
        type: Boolean,
        required: true,
        default: false,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a postive number')
            }
        }
    },
    series_details:{
        type:[Number],
        default:[1]
    },
    actors:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:Actor,
        default:["62aa78afcaa6974d34c8d973"]

    }
}, { timestamps: true }
);

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie