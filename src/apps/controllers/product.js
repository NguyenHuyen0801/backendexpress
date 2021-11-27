const CategoryModel = require("../models/category");
const ProductModel = require("../models/product");
const paginate = require("../../common/paginate");
const slug = require("slug");
const fs = require("fs");
const path = require("path");

var ObjectId = require('mongoose').Types.ObjectId; //định kiểu cho ObjectId trong mongoose

const index = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  skip = page * limit - limit;

  const total = await ProductModel.find().countDocuments(); //countDocuments: đếm tổng số document
  const totalPage = Math.ceil(total / limit);

  const products = await ProductModel.find()
    .populate({ path: "cat_id" })
    .skip(skip)
    .limit(limit)
    .sort({ _id: -1 }); //sắp xếp -1 giảm dần, 1 tăng dần
  res.render("admin/products/index", {
    products: products,
    pages: paginate(page, totalPage),
    page: page,
    totalPage: totalPage,
  });
  // res.json(products);
  // console.log(products);
};

const create = async (req, res) => {
  const categories = await CategoryModel.find();
  res.render("admin/products/add_product", { categories: categories });

  // res.status().json(categories);
};

const store = async (req, res) => {
  const body = req.body;
  const file = req.file;
  const product = { 
    // thumbnail: body.thumbnail,
    cat_id: body.cat_id,
    name: body.name,
    slug: slug(body.name),
    description: body.description,
    price: body.price,
    status: body.status,
    featured: body.featured === "on",
    promotion: body.promotion,
    warranty: body.warranty,
    accessories: body.accessories,
    is_stock: body.is_stock,
  };

  if (file) {
    const thumbnail = "products/" + file.originalname;
    product["thumbnail"] = thumbnail;
    fs.renameSync(file.path, path.resolve("src/public/images", thumbnail));
  }

  // const data = new ProductModel(product);
  // data.save();

  //Hoặc:
  await new ProductModel(product).save();
  // console.log(a);
  res.redirect("/admin/products");
  // res.status(201).json(product);
  // console.log(product);
};

const edit = async (req, res) => {
  const categories = await CategoryModel.find();
  const id = req.params.ID;
  // console.log(id, typeof id, req.query)
  // if (id !== '1') {
  //   res.status(400).json({error: 'Bad Request'})
  // }
  const product = await ProductModel.findById(id);
  res.render("admin/products/edit_product", {categories:categories,product:product});
  // res.json({message: "WEWQ4124GDFGSF"});
  // console.log(product);
};

const update =  async(req,res)=>{
  const id = req.params.ID;
  const body = req.body;
  console.log(req.headers);
  const file = req.file;
  const product = {
    cat_id: body.cat_id,
    name: body.name,
    slug: slug(body.name),
    description: body.description,
    price: body.price,
    status: body.status,
    featured: body.featured === "on",
    promotion: body.promotion,
    warranty: body.warranty,
    accessories: body.accessories,
    is_stock: body.is_stock,
  };

  if (file) {
    const thumbnail = "products/" + file.originalname;
    product["thumbnail"] = thumbnail;
    fs.renameSync(file.path, path.resolve("src/public/images", thumbnail));
  }
  await ProductModel.updateOne({_id: id},{$set: product});
  res.redirect("/admin/products");
  // res.status(200);
  // console.log(product);
}

const del = async (req, res) => {
  const id = req.params.ID;
  await ProductModel.deleteOne(id);
  res.redirect("/admin/products");
  // await ProductModel.findById(id)
  // const ProID =  await ProductModel.findById(new ObjectId('537eed02ed345b2e039652d2'));
  // if(!ProID ){
  //   return res.status(401).json({message: "dữ liệu không tồn tại"});
  // }
    // await ProductModel.findByIdAndDelete(id);
    // return res.status(200).json({message: "success"})
  // 
 
  
};

module.exports = {
  index: index,
  create: create,
  edit: edit,
  update:update,
  del: del,
  store: store,
};
