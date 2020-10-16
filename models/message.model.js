const {Schema, model} = require("mongoose");


const messageSchema = new Schema({
    chat:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Chat"
    },
    origin:{
        type: String
    },
    text:{
        type: String
    }
},{
    timestamps: true
});
const Message = new model("Message", messageSchema);
module.exports = Message