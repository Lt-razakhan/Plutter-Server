const express = require('express')
const actions = require('../methods/actions')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Hello World')
})

router.get('/dashboard', (req, res) => {
    res.send('Dashboard')
})

//@desc Adding new user
//@route POST /adduser
router.post('/signUp', actions.signUp);

//@desc Authenticate a user
//@route POST /authenticate
router.post('/authenticate', actions.authenticate);

//@desc Get info on a user
//@route GET /getinfo
router.get('/getinfo', actions.getinfo);

//@desc Patch udate user
//@route Update User
router.patch('/updateUser/:username', actions.updateUser);

//@desc Delete user 
//@route Delete User
router.delete('/delete/:username', actions.deleteUser);

module.exports = router