const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const db = require("./config/dbConnection")
db() 

app.use(express.json())
app.use(cors())
app.use(morgan("common"))
app.use(helmet())

const rooms = [];


io.of("/admin").on("connection", socket => {
    const isAdmin = socket.handshake.query.admin
    socket.emit("rooms", rooms)
    socket.emit("your id", socket.id)
    socket.on("joinRoom", (room)=>{
        if(isAdmin === "false") rooms.push(room)
        console.log(room)
        socket.join(room)
        socket.on("send message", body => {
            io.of("/admin").in(room).emit("message", body)
        })
    })
})



server.listen(8000, () => console.log('App running on http://localhost:8000'));