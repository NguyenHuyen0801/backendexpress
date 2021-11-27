const UserModel = require("../models/user");

const login = (req, res) => {
  res.render("admin/login", { data: {} });
};

//session: lưu trên trình duyệt, tắt trình duyệt đi là mất.
// cookie: true bảo mật https, pải đưa về false
const postLogin = async (req, res) => {
  const mail = req.body.mail;
  const pass = req.body.pass;
  const { redirect } = req.query;
  let err;

  const users = await UserModel.find({ email: mail, password: pass });
  if (mail == "" || pass == "") {
    err = "Thông tin không được để trống!!!";
  } else if (users.length > 0) {
    req.session.mail = mail;
    req.session.pass = pass;
    req.session._id = users[0]._id;

    return res.redirect(redirect ? redirect : "/admin");
  } else {
    err = "Tài khoản không hợp lệ!!!";
  }
  res.render("admin/login", { data: { err: err } });
};

module.exports = {
  login: login,
  postLogin: postLogin,
};
