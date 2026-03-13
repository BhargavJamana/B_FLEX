const express = require('express');
const router = express.Router();


const {lockseats} = require('../Controllers/bookingController');
router.post('/lock-seats', lockseats);
module.exports = router