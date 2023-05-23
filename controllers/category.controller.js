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
    const _id = req.params._id
    try{
        const category = await Category.findOne({
            _id: _id
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
    try{
        const updatedCategory = await Category.updateOne(
            {_id: _id},
            {
                name: name,
                description: description
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

async function deleteCategory(req, res){
    const _id = req.params.categoryId
    try{
       const deletedCategory = await Category.updateOne(
           {_id: _id},
           {active: false}
       )
        res.status(200).json({
            message: "Category deleted",
            obj: deletedCategory
        })
    } catch (e){
        res.status(400).json({
            message: "Error deleting category",
            error: e
        })
    }
}

async function updateCategoryImage(req, res){
    const _id = req.params.categoryId
    const image = req.body.image
    try{
        const updatedCategory = await Category.updateOne(
            {_id: _id},
            {image: image}
        )
        res.status(200).json({
            message: "Image updated",
            obj: updatedCategory
        })
    } catch (e){
        res.status(400).json({
            message: "Error updating image",
            error: e
        })
    }
}



module.exports = {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    updateCategoryImage,
    deleteCategory
}
