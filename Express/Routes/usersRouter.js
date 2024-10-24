const express = require('express');
const  userControler= require('./../Controller/usersControler');
const router=express.Router();
router.route('/signup').post(userControler.singnup);

module.exports = router;