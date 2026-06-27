const express = require('express');
const router = express.Router();
const { checkoutSummary } = require('../controllers/checkoutController');

router.get('/summary', checkoutSummary);

module.exports = router;