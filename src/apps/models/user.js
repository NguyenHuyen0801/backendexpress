//gọi file tới mongodb, lấy đối tượng mongoose ()
const mongoose = require("../../common/database")(); // () export function Để lấy giá trọ return 

//sử dụng schema để mô tả collection user
const userSchema = mongoose.Schema({
    full_name: {
        type: String,
        defaut: null
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        default: null
    },
    role: {
        type: String,
        enum: ["member", "admin"], //tập dữ liệu mà người dùng pai nhập chỉ thuộc tập này
        default: "member"// mặc định là memner.
    },
});

//biến lóp userSchema thành model
const UserModel = mongoose.model("users",userSchema,"users");//ba tham số: bí danh của users(collection), tên schema, tên trong database(collection)

module.exports = UserModel;
