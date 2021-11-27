const paginate = require("../../common/paginate");
const CategoryModel = require("../models/category");
const ProductModel = require("../models/product");
const CommentModel = require("../models/comments");
const { del } = require("./product");
const transporter = require ("../../common/transpoter");
const config = require("config");
const ejs  = require("ejs");
const path = require("path");

const home = async (req, res) => {
  const LatestProducts = await ProductModel.find({
    is_stock: true,
  })
    .sort({ _id: 1 })
    .limit(6);
  const FeaturedProducts = await ProductModel.find({
    is_stock: true,
    featured: true,
  }).limit(6);

  res.render("site/index", {
    LatestProducts: LatestProducts,
    FeaturedProducts: FeaturedProducts,
  });
};

const category = async (req, res) => {
  const slug = req.params.slug;
  const id = req.params.id;
  const category = await CategoryModel.findById(id);
  const title = category.title;

  //phân trang
  const page = parseInt(req.query.page) || 1;
  const limit = 9;
  skip = page * limit - limit;

  const totalProduct = await ProductModel.find().countDocuments();
  const totalPage = Math.ceil(totalProduct / limit);

  const products = await ProductModel.find({ cat_id: id })
    .skip(skip)
    .limit(limit)
    .sort({ _id: -1 });
  res.render("site/category", {
    products,
    title,
    slug,
    id,
    pages: paginate(page, totalPage),
    totalPage,
    totalProduct,
    page,
  });
  //destrucstring assignment
};

const product = async (req, res) => {
  const id = req.params.id;
  const comments = await CommentModel.find({ prd_id: id });

  const product = await ProductModel.findById(id);

  res.render("site/product", { product, comments });
};

const search = async (req, res) => {
  const id = req.params.id;
  const keyword = req.query.keyword || "";
  const filter = {};
  if (keyword) {
    filter.$text = { $search: keyword };
  }
  

  //phân trang
  const page = parseInt(req.query.page) || 1;
  const limit = 9;
  skip = page * limit - limit;

  const totalProduct = await ProductModel.find(filter).countDocuments();
  const totalPage = Math.ceil(totalProduct / limit);

  const Product = await ProductModel.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ _id: -1 });
// console.log(products);
  res.render("site/search", {
    Product,
    totalProduct,
    keyword,
    page,
    id,
    totalPage,
    pages: paginate(page, totalPage),
  });
};

const cart = (req, res) => {
  const products = req.session.cart;
  // console.log(req.session.cart);
  res.render("site/cart",{products, totalPrice: 0});
};

const success = (req, res) => {
  res.render("site/success");
};

const comment = async (req, res) => {
  const id = req.params.id;
  const comment = {
    pro_id: id,
    full_name: req.body.full_name,
    email: req.body.email,
    body: req.body.body,
  };
  // custom: createdAt : bỏ getMatchedCSSRules, múi giờ
  // module: moment npm
  await new CommentModel(comment).save();
  // console.log(comment);
  res.redirect(req.path);
};

const addToCart = async(req,res)=>{
  const body = req.body; 
  let items = req.session.cart;
  let isUpdate = false; //thay đổi giá trị khai báo let

  //mua lại sản phẩm

  items.map((item)=>{
    if(item.id === body.id){
      isUpdate = true;
      items.qty += parseInt(body.qty); //ép kiểu từ chuỗi sang dạng số
    }
    return item;
  });

  //mua một sản phẩm mới
  if(!isUpdate){
    const product = await ProductModel.findById(body.id);
    items.push({
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.thumbnail,
      qty: parseInt(body.qty),
    })
  }
  req.session.cart = items;
  res.redirect("/cart");
}

const updateCart = (req,res) =>{
  const items = req.session.cart;
  const products = req.body.products;
  console.log(items);
  console.log(products);

  items.map((item)=>{
    if(products[item.id]){
      item.qty = parseInt( products[item.id]["qty"]);
    }  //tồn tại đối tượng product nhưng với id của item
  })
  req.session.cart = items;
  res.redirect("/cart");

}
const delCart = (req,res)=>{
  const id= req.params.id;
  const items = req.session.cart;

  items.map((item, key)=>{
    if(item.id === id){
      items.splice(key, 1);
    }
  });

  req.session.cart = items; //gán lại mảng
  res.redirect("/cart");
}

//Phương thức mua hàng
const order = async(req,res) =>{
  const items= req.session.cart;
  const body = req.body;

  //lấy ra đường dẫn đến thư mục views
  const viewPath = req.app.get("views");

  //compile template EJS sang HTML để gửi mail cho khách hàng
  const html = await ejs.renderFile(
    path.join(viewPath, "site/mail-order.ejs"),
    {
      name: body.name,
      phone: body.phone,
      mail: body.mail,
      add: body.add,
      totalPrice: 0,
      items,
    }
  );

  //send mail
  await transporter.sendMail({
    to: body.mail,
    from: "Vietpro Shop",
    subject: "xác nhận đơn hàng từ Vietpro Shop",
    html,
  });

  req.session.cart=[];
  res.redirect("/success");
}


module.exports = {
  home: home,
  product: product,
  category: category,
  search: search,
  cart: cart,
  success: success,
  comment: comment,
  addToCart: addToCart,
  updateCart: updateCart,
  delCart :delCart,
  order: order,
};
