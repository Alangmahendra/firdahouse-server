var express = require('express');
var router = express.Router();
const User = require('../controller/users')
const auth = require('../auth/auth')

router.get('/',User.findAll)
router.get('/:id',auth.isLogin,User.findone)
router.put('/:id',auth.isLogin,User.update)
router.delete('/:id',User.remove)


module.exports = router;
