const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");

// for cors error
app.use(cors());

// for post
const port = http.createServer(app);

// for socket.io
const {Server} = require("socket.io");

// connection establish with socket.io 
const io = new Server(port,{
    cors:{
        origin:"http://localhost:3000", // react origin path
        methods:["GET","POST"],
    }
})

// 1st connect with socket.io
io.on("connection",(socket) => {
    console.log("connection successfully:",socket.id);

    // join chat 
    socket.on("join_chat",(data) => {
        socket.join(data);
        console.log(`user join with the id:${socket.id} and join chat : ${data}` )
    })

    // for send message
    socket.on("send_msg",(data) => {
       socket.to(data.ChatId).emit("receive_msg", data);
    });

    // 2nd disconnect with socket.io
    socket.on("disconnect",() => {
        console.log("disconnect successfully:",socket.id)
    })

})
port.listen(3001,() => {
    console.log("Server Connected")
})
