const express = require('express');
const app = express.Router();
const userController =  require('../controllers/userControllers');
const router = require('./accountdetails');
app.use(express.json());

router.post('/',userController);

module.exports=router;