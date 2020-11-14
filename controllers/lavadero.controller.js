const Lavadero = require('../models/lavadero.model');
const { DateTime } = require('luxon');
const User = require('../models/user.model');

module.exports = {
    async create(req,res){
        try{
            const {date, badge} = req.body
            const { userId } = req
            const newDate = DateTime.fromISO(date).setLocale('fr').toLocaleString()
            const user = await User.findById(userId)
            const lavado = await Lavadero.create({
                                                    date: newDate,
                                                    badge,
                                                    userId
                                                })
            user.Lavadero = lavado
            user.save({validateBeforeSave: false})
            res.status(200).json(lavado)
        }catch(err){
            res.status(400).json(err.message)
        }
    }
}