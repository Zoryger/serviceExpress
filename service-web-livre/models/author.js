const mongoose = require('mongoose');
const { DateTime } = require("luxon");

const atr = mongoose.Schema({
    _id: { 
        type: Number, 
        required: true 
    },
    name: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true,
        transform: (x) => DateTime.fromJSDate(x).toISODate(),
    },
});

module.exports = mongoose.model('Author', atr);
