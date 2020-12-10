var user = require('../models/user')
var jwt = require('jwt-simple')
var confiug = require('../config/dbConfig')
const { config } = require('dotenv/types')


var functions = {
    addNewUser: function (req, res) {
        if ((!req.body.username) || (!req.body.password) || (!req.body.emailId)) {
            res.json({ success: false, msg: 'Invalid password or usernam' })
        }
        else {
            var newUser = User({
                username: req.body.username,
                password: req.body.password,
                emailId: req.body.emailId,
            });
            newUser.save(function (err, newUser) {
                if (err) {
                    res.json({ success: false, msg: 'Failed to save' });
                }
                else {
                    res.json({ success: true, msg: 'Successfuly saved' });
                }
            })

            userSchema.methods.comparePassword = function (passw, cb) {
                bcrype.compare(passw, this.password, function (err, isMatch) {
                    if (err) {
                        return cb(err)
                    }
                    cb(null, isMatch)
                })
            }
        }
    },
    authenticate: function (req, res) {
        User.findOne({
            username: req.body.username
        }, function (err, user) {
            if (err) throw err
            if (!user) {
                res.status(403).send({ success: false, msg: "Authentication failed, User not found!" });
            }
            else {
                user.comparePassword(
                    req.body.password,
                    function (err, isMatch) {
                        if (isMatch && !err) {
                            var token = jwt.encode(User, config.secret)
                            res.json({ success: true, token: token });
                        }
                        else {
                            return res.status(403).send({ success: false, msg: 'Authentication failed, wrong password!' })
                        }
                    }
                )
            }
        })
    }
}


module.exports = functions;