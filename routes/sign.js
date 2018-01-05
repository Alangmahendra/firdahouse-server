var express = require('express');
var router = express.Router();
const User = require('../controller/users')

router.post('/signup',User.signup)
router.post('/signin',User.signin)

module.exports = router;
