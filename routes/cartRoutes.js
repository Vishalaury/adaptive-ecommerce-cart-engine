const express = require('express');
const router = express.Router();
const { ingestItem, getCart } = require('../controllers/cartController');
const validate = require('../middleware/validation');
const { ingestItemSchema } = require('../validators/cartValidator');

router.post('/items', validate(ingestItemSchema), ingestItem);
router.get('/', getCart);

module.exports = router;