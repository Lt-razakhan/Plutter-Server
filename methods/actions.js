var User = require('../models/user')
var jwt = require('jwt-simple')
var config = require('../config/dbconfig')

var functions = {
    createUser: function (req, res) {
        if ((!req.body.emialId) || (!req.body.password) || (!req.body.username)) {
            res.json({ success: false, msg: 'Enter all fields' })
        }
        else {
            var newUser = User({
                username: req.body.username,
                emialId:  req.body.emialId,
                password: req.body.password
            });
            newUser.save(function (err, newUser) {
                if (err) {
                    res.json({ success: false, msg: 'Failed to save' })
                }
                else {
                    res.json({ success: true, msg: 'Successfully saved' })
                }
            })
        }
    },
    authenticate: function (req, res) {
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