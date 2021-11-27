//lưu trữ giá trị cố định, đặt tên giá trị trong 1 đối tượng trùng tên với tên thư mục chứa biến đấy.
module.exports= {
    app:{
        port: 3000,
        views_folder:__dirname + "/../src/apps/views",
        view_engine: "ejs", 
        static_folder: __dirname+"/../src/public", // đường dẫn tới thư mục public, đường dẫn tuyệt đối
        session_key:"vietpro",
        session_secure:false, 
        temp: __dirname+"/../temp",
    },
    
    mail: {
       host: "smtp.gmail.com",
       post: 578,
       secure: false,
       auth: {
           user: "vietpro.shop28@gmail.com",
           pass: "rnqqtpbwsivtqopl",
       } 
    }

}