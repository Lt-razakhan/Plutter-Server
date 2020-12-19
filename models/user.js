var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt')
var userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,

    },
    password: {
        type: String,
        required: true

    },
    conformPassword: {
        type: String,
        required: true,
        
    },
    emilId: {
        type: String,
        require: true
    }
})

userSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            };
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                };
                user.password = hash;
                next();
            });

        })
    }
    else {
        return next();
    }
})



module.exports = mongoose.model('User', userSchema);