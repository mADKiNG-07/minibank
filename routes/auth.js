const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/users');
const Account = require('./../models/accounts');

const router = express.Router();

// Login endpoint
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // checks if user exists
    let user = await User.findOne({ username: username });
    if (!user) return res.status(400).send('Invalid username or password!');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password!')

    bcrypt.compare(password, user.password, (err, result) => {
        if (err) return console.error(err);

        if (!result) {
            return res.status(401).json({ message: 'Authentication failed. Invalid password.' });
        }

        const token = jwt.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            message: 'Authentication successful.',
            token: token
        });
    });

});

// Register endpoint
router.post('/register', async (req, res) => {
    const { firstname, lastname, email, username, password, role } = req.body;

    // checks if user(email) already exists
    let user = await User.findOne({ email: email });
    if (user) return res.status(404).send('User already registered!');

    // create corresponding user account
    const account = new Account({
        username: username
    });
    account.save()
        .then((result) => {
            // res.send(result)
        })
        .catch((err) => {
            console.log(err)
        });

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) return console.error(err);

        const user = new User({
            firstname: firstname,
            lastname: lastname,
            email: email,
            username: username,
            password: hash,
            role: role,
            account: account._id
        });

        user.save()
            .then((user) => {
                res.status(201).json({
                    message: 'User created successfully.',
                    user: user
                });
            });
    });

});

module.exports = router;
