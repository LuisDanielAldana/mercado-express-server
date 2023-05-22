const Item = require('../models/item.model').Item;

async function getItems(req, res) {
    try {
        const lim = req.query.limit
        const items = await Item.find().limit(lim)
        res.status(200).json({
            message: "All items",
            items: items
        })
    } catch(e){
        res.status(400).json({
            message: 'Error'
        })
    }
}

async function getItemById(req, res){
    const _id = req.params.itemId
    try{
        const item = await Item.findOne({
            _id: _id
        })
        res.status(200).json({
            message: "Item found",
            obj: item
        })
    } catch (e){
        res.status(200).json({
            message: "Error getting item",
            error: e
        })
    }
}

async function getByCategoryId(req, res){
    const _id = req.params.categoryId
    const lim = req.query.limit
    try{
        const items = await Item.find(
            {'categories.id': _id}
        ).limit(lim)
        res.status(200).json({
            message: "All items in category",
            obj: items
        })
    } catch (e){
        res.status(400).json({
            message: "Error getting items",
            error: e
        })
    }
}

async function searchItems(req, res){
    const search = req.body.search
    var reg = new RegExp(`.*${search}.*`, 'i');
    try{
       const item = await Item.find({}).or([{ 'name': { $regex: reg }}, { 'description': { $regex: reg }}])
        res.status(200).json({
            message: "Item found",
            obj: item
        })

    } catch (e){
        res.status(400).json({
            message: "Error searching item",
            error: e
        })
    }
}


async function createItem(req, res){
    const name = req.body.name
    const description = req.body.description
    const price = req.body.price
    const stock = req.body.stock
    const category = req.body.category
    try{
        const newItem = await new Item({
            name: name,
            description: description,
            price: price,
            stock: stock,
            category: category
        }).save();
        res.status(200).json({
            message: "Item created",
            obj: newItem
        })
    } catch(e){
        res.status(400).json({
            message: "Error creating item",
            error: e
        })
    }
}

async function updateItem(req, res){
    const _id = req.params.itemId
    const name = req.body.name
    const description = req.body.description
    const price = req.body.price
    const stock = req.body.stock
    try {
        const updatedItem = await Item.updateOne(
            {_id:_id},
            {
                name: name,
                description: description,
                price: price,
                stock: stock
            }
        )
        res.status(200).json({
            message: "Item updated",
            obj: updatedItem
        })
    } catch (e){
        res.status(400).json({
            message: "Error updating item",
            error: e
        })
    }
}

async function updateItemImage(req, res){
    const _id = req.params._id
    const image = req.body.image
    try{
        const updatedImage = await Item.updateOne(
            {_id: _id},
            {image: image}
        )
        res.status(200).json({
            message: "Image successfully updated",
            obj: updatedImage
        })
    } catch(e){
        res.status(400).json({
            message: "Error updating image",
            error: e
        })
    }
}

async function deleteItem(req, res){
    const _id = req.params.itemId
    const deletedItem = await Item.updateOne(
        {_id: _id},
        {active: false}
    )
    res.status(200).json({
        message: "Item set inactive",
        obj: deletedItem
    })
    try{

    } catch (e){
        res.status(400).json({
            message: "Error deleting item",
            error: e
        })
    }
}


async function editCategory(req, res) {
    // aggregate para obtener todos los documentos con la misma categoria y despues editar esos documentos
}

module.exports = {
    getItems,
    getItemById,
    getByCategoryId,
    searchItems,
    createItem,
    updateItem,
    updateItemImage,
    deleteItem
}
