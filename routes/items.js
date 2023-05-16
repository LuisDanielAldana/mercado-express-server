var express = require('express');
var router = express.Router();

const itemController = require('../controllers/item.controller')

/* GET users listing. */
router.get('/', itemController.allItems);
router.post('/create')
router.post('/search')
router.put('/:itemId/update')
router.put('/:itemId/delete')

module.exports = router;
