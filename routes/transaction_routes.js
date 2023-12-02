const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Account = require('../models/accounts');
const Transaction = require('../models/transactions');

// Get all transactions for user
router.get('/:username', async (req, res) => {
    try {
        // Find user's account
        const account = await Account.findOne({ username: req.params.username });

        // Find all transactions associated with account
        const transactions = await Transaction.find({ account: account._id });

        // Return transactions
        return res.status(200).json(transactions);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
