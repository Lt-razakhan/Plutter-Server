var user = require('../models/user');
var jwt = require('jwt-simple');
var confiug  = require('../config/dbConfig');


var functions = {
    addNewUser : function(req, res){
        if((!req.body.username) || (!req.body.password)||  (!req.body.emailId)){
            res.json({success : false , msg : 'Invalid password or usernam'})
        }
        else{
            var newUser = User({
                username:req.body.username,
                password:req.body.password,
                emailId : req.body.emailId,
            });
            newUser.save(function (err, newUser){
                if(err){
                    res.json({success: false, msg : 'Failed to save'});
                }
                else{
                    res.json({success :true, msg : 'Successfuly saved'});
                }
            })
        }
    }
}


module.exports = functions;