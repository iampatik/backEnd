const express = require('express');
const router =  express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../../model/User');

/**
* @route POST api/users/register
* @desc Register the user
* @access Public
*/

router.post('/register', (req,res) => {
    let {
        name,
        username,
        email,
        password,
        confirm_password
    } = req.body
    
    //Check password matches
    if(password !== confirm_password){
        return res.status(400).json({
            msg: "Password did not match!"
        });

    }

    //Check username doesn't exist
    User.findOne({
        username: username
    }).then(user => {
        if(user){
            return res.status(400).json({
                msg: "Username is already taken!"
            })
        }
    })

    //Check email doesn't exist
    User.findOne({email: email}).then(user => {
        if(user){
            return res.status(400).json({
                msg: "Email is already taken!"
            })
        }
    })

    let newUser = new User({
        name,
        username,
        email,
        password
    });



    // Hash the password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password,salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save().then(user => {
                return res.status(201).json({
                    success: true,
                    msg: "Data is now registered!"
                })
            }
        })


    })



});

module.exports = router;
