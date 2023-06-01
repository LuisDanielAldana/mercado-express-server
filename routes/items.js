const express = require('express');
const router = express.Router();

const itemController = require('../controllers/item.controller')

router.get('/', itemController.getItems);
router.get('/inactive', itemController.getInactiveItems)
router.get('/:itemId', itemController.getItemById)
router.post('/', itemController.createItem)
router.put('/:itemId', itemController.updateItem)


module.exports = router;
