
const express = require('express')
const actions = require('../methods/actions')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Hello World')
})

router.get('/dashboard', (req, res) => {
    res.send('Dashboard')
})


//@plutter Logining the user
//@routw POST Login
router.post('/login', actions.login);

//@plutter Adding new user
//@route POST /adduser
router.post('/signUp', actions.signUp);

//@plutter Get info on a user
//@route GET /getinfo
router.get('/getinfo', actions.getinfo);

//@plutter Patch udate user
//@route Update User
router.patch('/updateUser/:username', actions.updateUser);

//@plutter Delete user 
//@route Delete User
router.delete('/delete/:username', actions.deleteUser);

module.exports = router