const {Schema, model} = require("mongoose");


const mensualidadesSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    badge:{
        type: String,
        required: true,
        uppercase: true
    },
    cedula:{
        type: String
    },
    company:{
        type: String
    },
    vehicle:{
        type: String,
        required: true
    },
    inDate:{
        type: String,
        required: true
    },
    finDate: {
        type: String,
        required: true
    },
    price: {
        type: String
    },
    paid:{
        type: Boolean,
        default: false
    },
    checked:{
        type: Boolean,
        default: false
    }
},{
    timestamps: true
});
const Mensualidades = new model("Mensualidades", mensualidadesSchema);
module.exports = Mensualidades