const UserModel = require("../models/user");
const CategoryModel = require("../models/category");
const ProductModel = require("../models/product");
const fs = require("fs");
const path = require('path');

const test = (req, res) => {
  // const products = ProductModel.find().populate({ path: "cat_id" }).exec( (err, docs) => {
  //     console.log(docs[0].cat_id);
  // });
  // populate: lấy dữ liệu từ 2 collection
  // path: lấy khóa ngoại
  //exec: callBack function, lấy data ra ngoài

  // req.session.data = "session defined";
  res.send("test");
};
const test2 = (req, res) => {
  if (req.session.data) {
    res.send(req.session.data);
  } else {
    res.send("session undefined");
  }
};
const test3 = (req, res) => {
  req.session.destroy(); //Loại bỏ session
};

const frmUpload = (req, res) => {
  res.send(`
    <form method="post" enctype="multipart/form-data">
        <input type="file" name="file_name" />
        <button type="submit">upload</button>
    </form>
    `);
};

const fileUpload = (req, res) => {
  const file = req.file;
  //di chuyển file
  //xử lý đồng bộ (đang nằm đâu, muốn đi đến đâu)
  fs.renameSync(file.path, path.resolve("src/public/images/products",file.originalname) );
  console.log("fileUpload");
};
module.exports = {
  test: test,
  test2: test2,
  test3: test3,
  frmUpload: frmUpload,
  fileUpload: fileUpload,
};
