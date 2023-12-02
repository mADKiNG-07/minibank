const express = require('express');
const router = express.Router();
const Account = require('./../models/accounts');
const Transaction = require('../models/transactions');


// Get all accounts
router.get('/', (req, res) => {
    Account.find()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        });
});

// Get an account by account number
router.get('/:username', (req, res) => {
    const username = req.params.username;
    Account.findOne({ username: username })
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        });
});

// Create a new account
router.post('/', (req, res) => {
    const account = new Account(req.body);
    account.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        });
});

// Update an account
//INACTIVE
// router.put('/:username', (req, res) => {
//     const username = req.params.username;
//     Account.findOneAndUpdate({ username: username }, req.body)
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err)
//         });
// });

// Delete an account
router.delete('/:username', (req, res) => {
    const username = req.params.username;
    Account.findOneAndDelete({ username: username })
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        });
});

// Deposit into an account 
router.post('/:username/deposit', (req, res) => {
    const username = req.params.username;
    const amount = req.body.amount;

    Account.findOne({ username: username })
        .then((account) => {
            account.balance += amount;

            // Record transaction
            const transaction = new Transaction({
                amount: req.body.amount,
                type: 'deposit',
                account: account._id,
            });
            transaction.save();

            account.save()
                .then((result) => {
                    res.send(result)
                })
                .catch((err) => {
                    console.log(err)
                });
        });
});

// Withdraw from an account
router.post('/:username/withdraw', (req, res) => {
    // INACTIVE

    // const username = req.params.username;
    // const amount = req.body.amount;

    // Account.findOne({ username: username })
    //     .then((account) => {
    //         if (account.balance < amount) return res.status(400).send('Insufficient balance');

    //         account.balance -= amount;

    //         // Record transaction
    //         const transaction = new Transaction({
    //             amount: req.body.amount,
    //             type: 'withdrawal',
    //             account: account._id,
    //         });
    //         transaction.save();

    //         account.save()
    //             .then((result) => {
    //                 res.send(result)
    //             })
    //             .catch((err) => {
    //                 console.log(err)
    //             });
    //     });

});

module.exports = router;