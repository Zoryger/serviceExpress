const mongoose = require('mongoose');
const { DateTime } = require("luxon");

const lvr = mongoose.Schema({
    _id: { 
        type: Number, 
        required: true 
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    publicationDate: {
        type: Date,
        required: true,
        transform: (x) => DateTime.fromJSDate(x).toISODate(),
    }
});

module.exports = mongoose.model('Livre', lvr);