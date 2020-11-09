const {Schema, model, models} = require("mongoose");


const mensualidadesSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    badge:{
        type: String,
        required: true,
        uppercase: true,
        validate: {
            async validator(badge){
                try{
                  const mensualidad = await models.Mensualidades.findOne({badge})
                  return !mensualidad
                }catch(err){
                    return false
                }
            },
            message:"Esa placa ya existe"
        }
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