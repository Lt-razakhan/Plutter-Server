var User = require('../models/user')
var jwt = require('jwt-simple')
var config = require('../config/dbconfig')
const user = require('../models/user')

var functions = {
    signUp: function (req, res) {
        if ((!req.body.emailId) || (!req.body.password) || (!req.body.username) || (!req.body.conformPassword)) {
            res.json({ success: false, msg: 'Enter all fields' })
        }
        else {
            const user = new User({
                username: req.body.username,
                password: req.body.password,
                emailId: req.body.email,
                conformPassword: req.body.conformPassword,
            });
            if (password == conformPassword) {
                return user
                    .save()
                    .then(() => {
                        console.log("user registered");
                        res.status(200).json({ msg: "User Successfully Registered" });
                    })
                    .catch((err) => {
                        res.status(403).json({ msg: err });
                    });
            }
            else{
                return res.s
            }




        }
    },

    // login: function (req, res) {
    //     user.findOne(
    //         {username: req.body.username}, (err, result) => {
    //             if (err) res.status(403).json({ msg: err });
    //             if (result == null) {
    //                 res.status(404).json({ msg: "Username or password incorrect" });
    //             }
    //             if (result.password == req.body.password) {
    //                 res.json("User Loged in")
    //             }
    //             else {
    //                 res.status(403).json("password is incorrect")
    //             }

    //         });


    // },
    login: function (req, res) {
        User.findOne({
            username: req.body.username
        }, function (err, user) {
            if (err) throw err
            if (!user) {
                res.status(403).send({ success: false, msg: 'Authentication Failed, User not found' })
            }

            else {
                user.comparePassword(req.body.password, function (err, isMatch) {
                    if (isMatch && !err) {
                        var token = jwt.encode(user, config.secret)
                        res.json({ success: true, token: token })
                    }
                    else {
                        return res.status(403).send({ success: false, msg: 'Authentication failed, wrong password' })
                    }
                })
            }
        }
        )
    },
    getinfo: function (req, res) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            var token = req.headers.authorization.split(' ')[1]
            var decodedtoken = jwt.decode(token, config.secret)
            return res.json({ success: true, msg: 'Hello ' + decodedtoken.name })
        }
        else {
            return res.json({ success: false, msg: 'No Headers' })
        }
    },
    updateUser: function (req, res) {
        User.findOneAndUpdate(
            { username: req.params.username },
            { $set: { password: req.params.password } },
            (err, result) => {
                if (err) return res.status(403).json({ msg: err });
                const msg = {
                    msg: "Password Successfully Updated",
                    username: req.params.username,
                };
                return res.json(msg);

            }
        )

    },

    deleteUser: function (req, res) {
        User.findOneAndDelete(
            { username: req.params.username },
            (err, result) => {
                if (err) return res.status(403).json({ msg: err });
                const msg = {
                    msg: "User deleted Successfully",
                    username: req.params.username,
                };
                return res.json(msg);

            }
        )
    }

}

module.exports = functions