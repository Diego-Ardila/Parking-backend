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
            validator(email){
                return models.User.findOne({email})
                        .then(user => !user)
                        .catch(()=> false)
            }
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
    tokens : [
        {
        type: String,
        }
    ],
    profilePhoto: {
        type: String
    }
},{
    timestamps: true
})

lenderSchema.methods.generateAuthToken = async function () {
    return jwt.sign({_id: this._id.toString()}, process.env.SECRET_KEY, {expiresIn: "1 days"})
}

lenderSchema.methods.encryptPassword = async function () {
    this.password = await bcrypt.hash(this.password, 8)
    return this.password
}

lenderSchema.methods.getPublicData = function () {
    return (({name, email, tokens, tasks}) => ({name, email, tokens, tasks}))(this) 
}

const User = new model("User", userSchema)

module.exports = User
