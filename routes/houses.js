const express = require('express');
const router = express.Router();
const House = require('../controller/houses')
const auth = require('../auth/auth')
const midle = require('../helper/image')

    router.get('/',auth.isLogin,House.findAll)
    router.post('/',auth.isLogin,midle.multer.single('image'),midle.sendUploadToGCS,House.add)
    router.delete('/:id',auth.isLogin,House.remove)
    router.put('/:id',auth.isLogin,midle.multer.single('image'),midle.sendUploadToGCS,House.update)
 
module.exports = router;