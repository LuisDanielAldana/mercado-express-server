var express = require('express');
var router = express.Router();

const itemController = require('../controllers/item.controller')

router.get('/', itemController.getItems);
router.get('/:itemId', itemController.getItemById)
router.post('/create', itemController.createItem)
router.post('/search', itemController.searchItems)
router.get('/:categoryId', itemController.getByCategoryId)
router.put('/:itemId/update', itemController.updateItem)
router.put('/:itemId/add-category', itemController.addCategory)
router.put('/:itemId/remove-category', itemController.removeCategory)
router.put('/:itemId/update-image', itemController.updateItemImage)
router.put('/:itemId/inactive', itemController.setInactive)
router.put('/:itemId/active', itemController.setActive)
router.post('/inactive', itemController.getInactiveItems)
module.exports = router;
