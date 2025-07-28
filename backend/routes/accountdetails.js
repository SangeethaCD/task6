const express = require('express');
const router = express.Router();
const accountDetails = require('../controllers/accountcontrollers');

router.get('/:email', accountDetails);

module.exports = router;
