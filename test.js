const express = require("express");
const router = express.Router();
const app = express();

router.get("/", (req, res)=>{
    res.send("welcome Huyen!!!");
});

//post: thông qua một form, 
//get: thông qua liên kết
router.get("/home", (req, res)=>{
    res.send("welcome HuyenNguyen!!!");
});

// truyền tham số.
router.get("/search/:userID/age/:ageID", (req, res)=>{
    console.log(req.params);
    console.log(res.params);
    res.send("hi Huyen");
});
//__dirname: lấy đường dẫn tới file có dg dẫn
app.use("/static", express.static(__dirname + "/src/public"));

router.post("/search", (req,res)=>{
    res.send("hi Huyen!!!");
});

app.use(router);
app.listen(port=3000, ()=>{
    console.log("server running on port " +port +"...");
});
