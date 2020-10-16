const {Schema, model} = require("mongoose");


const chatSchema = new Schema({
    name: String,

    connected: Boolean,
    
    messages:{
        type: [{type: Schema.Types.ObjectId, ref:"Message"}]
    }
},{
    timestamps: true
});
const Chat = new model("Chat", chatSchema);
module.exports = Chat