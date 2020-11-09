const {Schema, model} = require("mongoose");


const lavaderoSchema = new Schema({
    badge:{
        type: String,
        required: true,
        uppercase: true
    },
    date:{
        type: String,
        required: true
    },
    userId:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
},{
    timestamps: true
});
const Lavadero = new model("Lavadero", lavaderoSchema);
module.exports = Lavadero