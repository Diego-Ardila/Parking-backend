const jwt = require('jsonwebtoken')

module.exports = {
    auth: (req,res,next) => {
        try{
            const [ Bearer, token ] = req.headers.authorization.split(" ")
            if(!token) throw new Error("no esta autorizado para ingresar")
    
            const { id } = jwt.verify(token, process.env.SECRET_KEY)
            req.userId = id
            next()
        }catch(err){
            res.status(401).json({message: err.message})
        }
    }
}