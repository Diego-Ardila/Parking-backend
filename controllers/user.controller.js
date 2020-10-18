const User = require('../models/user.model');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
  async createUser(req, res) {
    const data = req.body;
    try{
      data.password = await bcrypt.hash(data.password, 7)
      const user= await User.create(data)
      const token= jwt.sign(
        {id: user._id},
        process.env.SECRET_KEY,
        {expiresIn: 60*60*24}
      )
      user.token = token
      await user.save({validateBeforeSave: false})
      res.status(200).json({token, userId: user._id})
    }catch(err){
      res.status(400).json(err.message)
    }
  },
  async login(req, res) {
    try{
      const {email, password} = req.body;
      const user= await User.findOne({email})
      if(!user){
        throw new Error("El usuario es invalido")
      }
      const isValid= await bcrypt.compare(password, user.password)
      if(!isValid) {
        throw new Error("La contraseña es invalida")
      }
      const token= jwt.sign(
        {id: user._id},
        process.env.SECRET_KEY,
        {expiresIn: 60*60*24}
      )
      res.status(200).json({token, userId: user._id})
    }catch(err){
      res.status(400).json(err.message)
    }
  }
}
