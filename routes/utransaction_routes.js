const express = require('express');
const router = express.Router();
const UTransaction = require('../models/user_trnstn');

// Get all transactions
router.get('/', async (req, res) => {
    UTransaction.find()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        });
});

// Create a transactions 
router.post('/', async (req, res) => {
    const utrans = new UTransaction(req.body);
    utrans.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        });
});



module.exports = router;
