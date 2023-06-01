const Category = require("../models/category.model").Category;

async function createCategory(req, res){
    const name = req.body.name
    const description = req.body.description
    const image = req.body.image
    const parent = req.body.parent
    try{
        const newCategory = await new Category({
            name: name,
            description: description,
            image: image,
            parent: parent
        }).save()
        res.status(200).json({
            message: "Category created",
            obj: newCategory
        })
    } catch (e){
        res.status(400).json({
            message: "Error creating category",
            error: e
        })
    }
}

async function getCategories(req, res){
    try{
        const categories = await Category.find({active: true})
        res.status(200).json({
            message: "All categories",
            obj: categories
        })
    } catch (e){
        res.status(400).json({
            message: "Error obtaining categories",
            error: e
        })
    }
}

async function getCategoryById(req, res){
    const _id = req.params.categoryId
    try{
        const category = await Category.findOne({
            _id
        })
        res.status(200).json({
            message: "Category found",
            obj: category
        })
    } catch (e){
        res.status(400).json({
            message: "Error getting category",
            error: e
        })
    }
}

async function updateCategory(req, res){
    const _id = req.params.categoryId
    const name = req.body.name
    const description = req.body.description
    const image = req.body.image
    const active = req.body.active
    try{
        const updatedCategory = await Category.updateOne(
            {_id: _id},
            {
                name: name,
                description: description,
                image: image,
                active: active
            }
        )
        res.status(200).json({
            message: "Category updated",
            obj: updatedCategory
        })
    } catch (e){
        res.status(400).json({
            message: "Error updating category",
            error: e
        })
    }
}

module.exports = {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
}
