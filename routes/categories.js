var express = require('express');
var router = express.Router();

const categoryController = require('../controllers/category.controller')
const productController = require('../controllers/item.controller')


/* GET users listing. */
router.get('/', categoryController.getCategories);
router.get('/:categoryId', categoryController.getCategoryById);
router.post('/', categoryController.createCategory);
router.put('/:categoryId', categoryController.updateCategory);
router.get('/:categoryId/items', productController.getByCategoryId);

module.exports = router;
