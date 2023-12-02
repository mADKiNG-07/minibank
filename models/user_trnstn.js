const mongoose = require('mongoose');

const userTrnsctnSchema = new mongoose.Schema({
    email: { type: String, required: true },
    imgUrl: { type: String, required: true },

});

const UTransaction = mongoose.model('UTransaction', userTrnsctnSchema);

module.exports = UTransaction;