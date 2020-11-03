const {Schema, model} = require("mongoose");


const adminSchema = new Schema({
    name: String,

    connected: Boolean,
    
    password: String,

    token: String
},{
    timestamps: true
});
const Admin = new model("Admin", adminSchema);
module.exports = Admin