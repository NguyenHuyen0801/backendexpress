const UserModel = require("../models/user");
const ProductModel = require("../models/product");
const CommentModel = require("../models/comments");

const dashboard = async (req, res) => {
    const users = await UserModel.find();
    const totalUsers = users.length;
    const products = await ProductModel.find();
    const totalProducts = products.length;
    const comments = await CommentModel.find();
    const totalComments = comments.length;
    res.render("admin/dashboard", { totalUsers: totalUsers, totalProducts: totalProducts, totalComments: totalComments });
};
const logout = (req, res) => {
    req.session.destroy();
    return res.redirect("/admin/login");
}

module.exports = {
    dashboard: dashboard,
    logout: logout,
}