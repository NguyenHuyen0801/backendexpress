const mongoose = require("../../common/database")();

const categorySchema = mongoose.Schema({
    description: {
        type: String,
        default: null
    },

    title: {
        type: String,
        require: true, // không được phép để trống
    },
    slug: { // biến ký tự có dấu thành không dấu và ngăn cách các chữ bằng dấu gạch ngang.
        type: String,
        default: null // có thể để trống được
    },
}, {
    timestamps: true,
});

const CategoryModel = mongoose.model("Category", categorySchema, "categories");

module.exports = CategoryModel;