const mongoose = require('mongoose');
const moment = require("moment/moment");

const CategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            default: ""
        },
        description: {
            type: String,
            required: true,
            default: ""
        },
        image: {
            type: String,
            default: ""
        },
        parent_category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            default: ""
        }
    }
)

const ItemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            default: ""
        },
        description: {
            type: String,
            required: true,
            default: "Category description"
        },
        image: {
            type: String,
            default: ""
        },
        item_url: {
            type: String,
            required: true,
            default: ""
        },
        price: {
            type: Number,
            required: true,
            default: 0
        },
        stock: {
            type: Number,
            required: true,
            default: 0
        },
        deleted: {
            type: Boolean,
            default: false
        },
        categories: {
            type: [CategorySchema],
            default: []
        }
    }
)

const Item = mongoose.model('Item', ItemSchema)

module.exports = {
    Item
}
