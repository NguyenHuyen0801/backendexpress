const socket = require ("socket.io");
module.exports = (server) => {
    const io = socket(server); //tạo đối tượng io,
    io.on("connection", (socket)=>{
        console.log("client connected");
    })
}