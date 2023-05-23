const Item = require('../models/item.model').Item;

async function getItems(req, res) {
    try {
        const lim = req.query.limit
        const items = await Item.find({active: true}).limit(lim).populate({path:"categories", model:"Category"})
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
            _id: _id,
            active: true
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
            {'categories.id': _id,
            active: true}
        ).limit(lim).populate({path:"categories", model:"Category"})
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
       const item = await Item.find({active: true}).or([{ 'name': { $regex: reg }}, { 'description': { $regex: reg }}])
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

async function setInactive(req, res){
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
            message: "Error setting item inactive",
            error: e
        })
    }
}

async function setActive( req, res){
    const _id = req.params.itemId
    try{
        const activeItem = await Item.updateOne(
            {_id: _id},
            {active: true}
        )
        res.status(200).json({
            message: "Item set active",
            obj: activeItem
        })
    } catch (e){
        res.status(400).json({
            message: "Error setting item active",
            error: e
        })
    }
}

async function addCategory(req, res){
    const _id = req.params.itemId
    const categoryId = req.body.categoryId
    try{
        const item = await Item.findOne({
            _id: _id
        })
        console.log(item)
        if(item.categories.includes(categoryId)){
            res.status(400).json({
                message: "Item already in category",
                obj: item
            })
        } else {
            const addedCategory = await Item.updateOne(
                {_id: _id},
                {$push:
                        {categories: categoryId}}
            )
            res.status(200).json({
                message: "Category added",
                obj: addedCategory
            })
        }
    } catch (e){
        res.status(400).json({
            message: "Error adding category",
            error: e
        })
    }
}

async function removeCategory(req, res){
    const _id = req.params.itemId
    const categoryId = req.body.categoryId
    try{
        const item = await Item.findOne({
            _id: _id
        })
        if(item.categories.includes(categoryId)){
            const modifiedItem = await Item.updateOne(
                {_id: _id},
                {$pullAll: {
                        categories: [{_id: categoryId}],
                    }}
            )
            res.status(200).json({
                message: "Category removed from item",
                obj: modifiedItem
            })
        } else {
            res.status(400).json(({
                message: "Category not present in item",
                obj: item
            }))
        }
    } catch (e){
        res.status(400).json({
            message: "Error removing category"
        })
    }
}

async function getInactiveItems(req, res){
    try{
        const inactiveItems = await Item.find({
            active: false
        })
        res.status(200).json({
            message: "All inactive Items",
            obj: inactiveItems
        })
    } catch (e){
        res.status(400).json({
            message: "Error getting inactive items",
            error: e
        })
    }
}

module.exports = {
    getItems,
    getItemById,
    getByCategoryId,
    searchItems,
    createItem,
    updateItem,
    addCategory,
    removeCategory,
    updateItemImage,
    setInactive,
    setActive,
    getInactiveItems
}
