const mongoose = require('mongoose');
const moment = require("moment/moment");

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
        active: {
            type: Boolean,
            default: true
        },
        categories: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Category",
            default: []
        }
    }
)

const Item = mongoose.model('Item', ItemSchema)

module.exports = {
    Item
}
