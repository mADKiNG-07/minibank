const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    balance: { type: Number, required: true, default: 0 },
    // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Account = mongoose.model('Account', accountSchema);
module.exports = Account;