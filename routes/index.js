const express = require('express')
const actions = require('../methods/actions')
const router = express.Router();


router.get('/', (req, res) => {
    res.send("Hello world")
});

router.get('/dashbord', (req, res) => {
    res.send("Hello World raza kahn  this side");
});

//@desc Adding new user
//@route POST/add user
router.post('/adduser', actions.addNewUser );
router.post('/authenticate', actions.authenticate);



module.exports = router;        