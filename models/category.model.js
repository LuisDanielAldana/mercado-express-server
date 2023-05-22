import mongoose from "mongoose";

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

