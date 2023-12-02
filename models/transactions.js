const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        enum: ['deposit', 'withdrawal'],
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true,
    },
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;