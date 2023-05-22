var express = require('express');
var router = express.Router();

const itemController = require('../controllers/item.controller')

/* GET users listing. */
router.get('/', itemController.getItems);
router.get('/:itemId', itemController.getItemById)
router.post('/create', itemController.createItem)
router.post('/search', itemController.searchItems)
router.get('/:categoryId', itemController.getByCategoryId)
router.put('/:itemId/update', itemController.updateItem)
router.put('/:itemId/update-image', itemController.updateItemImage)
router.put('/:itemId/delete', itemController.deleteItem)

module.exports = router;
