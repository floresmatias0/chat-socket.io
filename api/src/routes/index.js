const { Router } = require('express');

const user = require('./user/user');

const router = Router();

router.get('/', (req,res) => {
    res.status(200).send(`<h1>welcome to home backend</h1>`)
})

router.use('/users', user);

module.exports = router;