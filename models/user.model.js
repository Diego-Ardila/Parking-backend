const { Schema , model, models } = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")



const userSchema = new Schema ({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
        validate: {
            async validator(email){
                try{
                  const user = await models.User.findOne({email})
                  return !user
                }catch(err){
                    return fasle
                }
            },
            message:"El E-mail ya existe"
        }
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 13,
        trim: true
    },
    token :{
        type: String,
    },
    mensualidades:{
        type:[{
            type: Schema.Types.ObjectId, 
            ref:"Mensualidades"
        }]
    }
},{
    timestamps: true
})



const User = new model("User", userSchema)

module.exports = User
