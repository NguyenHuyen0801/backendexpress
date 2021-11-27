const express = require("express");
const router = express.Router();

//require Controller
const TestController = require("../apps/controllers/Test");
const AuthController = require("../apps/controllers/auth");
const AdminController = require("../apps/controllers/admin");
const ProductController = require("../apps/controllers/product");
const UsersController = require("../apps/controllers/users");
const CategoryController = require("../apps/controllers/categories");

//require Controller Site
const ChatController = require("../apps/controllers/chat");
const SiteController = require("../apps/controllers/site");

//require middlewares
const AuthMiddleware = require("../apps/middleware/auth");
const UploadMiddleware = require("../apps/middleware/upload");

//require multer
const multer = require("multer");
const upload = multer({
  dest: __dirname+"/../../temp",
})

router.get("/upload", TestController.frmUpload);
router.post("/upload", upload.single("file_name"), TestController.fileUpload);

//Login-logout
router.get("/admin/login", AuthMiddleware.checkLogin, AuthController.login);
router.post("/admin/login",AuthMiddleware.checkLogin,AuthController.postLogin);

router.get("/admin/logout", AuthMiddleware.checkAdmin, AdminController.logout);

router.get("/admin", AuthMiddleware.checkAdmin, AdminController.dashboard);

//products
router.get("/admin/products",AuthMiddleware.checkAdmin,ProductController.index);

router.get("/admin/products/create",AuthMiddleware.checkAdmin,ProductController.create);
router.post("/admin/products/store",UploadMiddleware.single("thumbnail"),AuthMiddleware.checkAdmin,ProductController.store);
// router.post("/admin/products/store",ProductController.store);

router.get("/admin/products/edit/:ID",AuthMiddleware.checkAdmin,ProductController.edit);
router.post("/admin/products/update/:ID",UploadMiddleware.single("thumbnail"),AuthMiddleware.checkAdmin,ProductController.update);
// router.put("/admin/products/update/:ID",ProductController.update);

router.get("/admin/products/delete/:ID",AuthMiddleware.checkAdmin,ProductController.del);
// router.delete("/admin/products/delete/:ID",ProductController.del);
router.get("/chat",AuthMiddleware.checkChat, ChatController.chat);


//users
router.get("/admin/users", AuthMiddleware.checkAdmin, UsersController.users);

router.get("/admin/users/create",AuthMiddleware.checkAdmin,UsersController.create);

router.get("/admin/users/edit/:id",AuthMiddleware.checkAdmin,UsersController.edit);

router.get("/admin/users/delete/:id",AuthMiddleware.checkAdmin,UsersController.del);

//categories
router.get("/admin/categories",AuthMiddleware.checkAdmin,CategoryController.index);

router.get("/admin/categories/create",AuthMiddleware.checkAdmin,CategoryController.create);

router.get("/admin/categories/edit/:id",AuthMiddleware.checkAdmin,CategoryController.edit);

router.get("/admin/categories/delete/:id",AuthMiddleware.checkAdmin,CategoryController.del);

//comment


//SITE controller
router.get("/", SiteController.home);
router.get("/category-:slug.:id", SiteController.category);
router.get("/product-:slug.:id", SiteController.product);
router.post("/product-:slug.:id", SiteController.comment);
router.get("/search", SiteController.search);
router.get("/cart", SiteController.cart);
router.get("/del-cart-:id", SiteController.delCart);
router.get("/success", SiteController.success);

//giỏ hàng
router.post("/add-to-cart", SiteController.addToCart);
router.post("/update-cart", SiteController.updateCart);

//mail-order
router.post("/order", SiteController.order);

//socket.io

module.exports = router;
