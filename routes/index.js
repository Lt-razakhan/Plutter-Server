const express = require('express')
//const actions = require('../methods/actions')
const router = express;

router.get('/', (req , res) => {
    res.send("Hello world")
})