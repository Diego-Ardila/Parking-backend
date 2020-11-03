const Admin = require('../models/admin.model');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
  async create(req, res) {
    const data = req.body;
    try{
      data.password = await bcrypt.hash(data.password, 10)
      const admin= await Admin.create(data)
      const token= jwt.sign(
        {id: admin._id},
        process.env.SECRET_KEY,
        {expiresIn: 60*60*24}
      )
      admin.token = token
      await admin.save({validateBeforeSave: false})
      res.status(200).json({token, adminId: admin._id})
    }catch(err){
      if(err.errors.email.properties.message){
        res.status(400).json(err.errors.email.properties.message)
      }else{
        res.status(400).json(err.message)
      }
    }
  },
  async login(req, res) {
    try{
      const { name, password } = req.body;
      const admin= await Admin.findOne({name})
      if(!admin){
        throw new Error("El nombre es invalido")
      }
      const isValid= await bcrypt.compare(password, admin.password)
      if(!isValid) {
        throw new Error("La contraseña es invalida")
      }
      const token= jwt.sign(
        {id: admin._id},
        process.env.SECRET_KEY,
        {expiresIn: 60*60*24}
      )
      admin.token = token
      await admin.save({validateBeforeSave: false})
      res.status(200).json(token)
    }catch(err){
      res.status(400).json(err.message)
    }
  },

  validateAdmin: async function (req,res) {
    try{
      const [ Bearer, token ] = req.headers.authorization.split(" ")
      if(!token) throw new Error("no esta autorizado para ingresar")

      const { id } = jwt.verify(token, process.env.SECRET_KEY)
      res.status(200).json(id)
    }catch(err){
      res.status(400).json(err.message)
    }
  }
} 