const mongoose = require("mongoose");

module.exports = () => {
    mongoose.connect('mongodb://localhost/vp_shop_project', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
    return mongoose;//vừa kết nối vừa được cả đối tượng mongoose
}



