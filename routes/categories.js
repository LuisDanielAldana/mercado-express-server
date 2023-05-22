var express = require('express');
var router = express.Router();

const categoryController = require('../controllers/category.controller')

/* GET users listing. */
router.get('/', categoryController.getCategories);
router.get('/:categoryId', categoryController.getCategoryById);
router.post('/create', categoryController.createCategory);
router.put('/:categoryId/update', categoryController.updateCategory);
router.put('/:categoryId/update-image', categoryController.updateCategoryImage);
router.put('/:categoryId/delete', categoryController.deleteCategory);

module.exports = router;
