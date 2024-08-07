const mongoose = require('mongoose');

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
            default: "https://res.cloudinary.com/dficrwc6r/image/upload/v1686556571/51obA2WQ_8L_iieemv.jpg"
        },
        parent: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: false
        },
        active: {
            type: Boolean,
            default: true
        }
    }
)

const Category = mongoose.model('Category', CategorySchema)

module.exports = {
    Category
}

