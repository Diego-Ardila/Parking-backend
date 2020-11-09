require("dotenv").config({path: __dirname + '/.env.dev'})
const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const Chat = require('./models/chat.model');
const Message = require('./models/message.model');
const chatRouter = require('./routes/chat.routes');
const userRouter = require('./routes/user.routes');
const mensualidadesRouter = require('./routes/mensualidades.routes');
const adminRouter = require('./routes/admin.routes');
const lavaderoRouter = require('./routes/lavadero.routes');

const db = require("./connection/dbConnection");

db() 

app.use(express.json())
app.use(cors())
app.use(morgan("common"))
app.use(helmet())

app.use("/chat",chatRouter)
app.use("/user", userRouter)
app.use("/admin", adminRouter)
app.use("/mensualidades", mensualidadesRouter)
app.use("/lavadero", lavaderoRouter)


io.of("/admin").on("connection", socket => {
    const isAdmin = socket.handshake.query.admin
    socket.on("join room admin", async (chatId)=>{
        const chat = await Chat.findById({_id: chatId})
                                .populate("messages")
        socket.join("chat-"+chat._id)
        socket.emit("messages", chat.messages)
    })
    socket.on("join room user", async (name)=>{
        const {_id} = await Chat.create({
            name,
            connected: true
        })
        socket.join("chat-"+_id)
        socket.emit("chat id", _id)
    })
    socket.on("send message", async (data) => {
        const message = {
            chat: data.chatId,
            origin: isAdmin === "true" ? "admin" : "user",
            text: data.text
        }
        const newMessage = await Message.create(message)
        const chat = await Chat.findById({_id:data.chatId})
                               .populate("messages")
        chat.messages.push(newMessage)
        await chat.save()
        io.of("/admin").in("chat-"+chat._id).emit("messages", chat.messages)
    })
    socket.on("user disconnected", async (chatId) => {
        try{
            if(chatId !== "client namespace disconnect" && chatId !== "transport close"){
                const chat = await Chat.findByIdAndDelete(chatId)
                chat.messages.forEach( async (msj) => {
                    await Message.findByIdAndDelete(msj) 
                })
            }
        }catch(err){
            console.log(err.message)
        }
    })
    socket.on("disconnect", ()=>{
        console.log("socket disconnected")
    })
})



server.listen(8000, () => console.log('App running on http://localhost:8000'));