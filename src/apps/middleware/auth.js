const checkLogin = (req, res, next) => { //kiểm tra xem người dùng đăng nhập thành công chưa, nếu r thì đưa đến trang admin, thoát khỏi trang login
    if (req.session.mail && req.session.pass) {
        return res.redirect("/admin");
    }
    next();
}

const checkAdmin = (req, res, next) => { //check xem login hay chưa, nếu chưa đăng nhập  thì đưa về login
    if (!req.session.mail || !req.session.pass) {
        return res.redirect("/admin/login");
        // return res.status(401).json({message:"Unauthorized"})
    }
    next();
}

const checkChat = (req, res, next) =>{
    if(!req.session.mail || !req.session.mail){
        return res.redirect(`/admin/login?redirect=${req.originalUrl}`);
        // req.originalUrl: lấy đường dẫn dừng lại ở router, bỏ qua tham số và query string.
    }
    next();
}

module.exports = {
    checkLogin: checkLogin,
    checkAdmin: checkAdmin,
    checkChat : checkChat,
}
//middlewares: là 1 function, khai  báo trc controller, next: thoát ra khỏi middleware hiện tại chuyển sang hàm tiếp theo sau dấu phẩy