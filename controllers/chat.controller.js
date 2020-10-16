const Chat = require('../models/chat.model');

module.exports = {
    async getChats(req,res){
        try{
            const chats = await Chat.find({connected:true})
            res.status(200).json(chats)
        }catch(err){
            res.status(400).json(err.message)
        }
    }
}
