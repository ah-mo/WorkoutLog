const router = require('express').Router(); //chaining to make above shorter

const User = require('../db').import('../models/user.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.get('/', (req, res) => {
    User.findAll()
        .then(users => res.status(200).json(users))
        .catch(err => res.status(500).json({ error: err }));
});

router.post('/register', function(req, res) {
    User.create({
        email: req.body.user.email,
        name: req.body.user.name,
        password:bcrypt.hashSync(req.body.user.password, 13)
    })
    .then(
        function createSuccess(user) {
            let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});
            res.json({
                user: user,
                message: "Dude, " + user.name + ", you're finally here! Totally sweet, bro! You registered successfully! Log your work-outs, bro. Get mad swoll, bro.",
                sessionToken: token
            });
        }
    )
    .catch(function(err){
        res.status(500).json({ error:err });
    })
})

router.post('/login', function(req,res) {
    User.findOne({ where: { email: req.body.user.email }}).then(function loginSuccess(user){
        if(user){
            bcrypt.compare(req.body.user.password, user.password, function (err, matches) {
                if (matches) {
                    let token = jwt.sign({id:user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
                    res.status(200).json({
                        user:user,
                        message: "Yo, " + user.name + "! Welcome back. Post and review workouts! Get ripped, bro!",
                        sessionToken: token
                    })
                } else {
                    res.status(502).send({ error: "Login Failed!!! "});
                }
            })
        } else {
            res.status(500).json({error: "User not found..."});
        }
    }).catch(function (err) {
        res.status(500).json({ error: err });
    })
})

module.exports = router;