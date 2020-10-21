const Mensualidades = require('../models/mensualidades.model');
const { DateTime } = require('luxon');
const User = require('../models/user.model');


module.exports = {
    async create(req,res){
        const { date } = req.body
        const { userId } = req
        try{
            const user = await User.findById(userId)
            const inDate = DateTime.fromISO(date)
            const finDate = inDate.plus({months:1})
            const mensualidad = await Mensualidades.create({
                                                    ...req.body, 
                                                    inDate: inDate.toLocaleString(), 
                                                    finDate: finDate.toLocaleString(),
                                                    userId
                                                    })
            user.mensualidades.push(mensualidad._id)
            user.save({validateBeforeSave: false})
            res.status(200).json(mensualidad)
        }catch(err){
            console.log(err.message)
            res.status(400).json(err.message)
        }
    },

    async get(req,res){
        console.log(req.body)
    },

    async update(req,res){
        const { badge, date } = req.body
        try{
            const inDate = DateTime.fromISO(date)
            const finDate = inDate.plus({months:1})
            const mensualidad = await Mensualidades.findOneAndUpdate({ badge },
                                                                     { inDate: inDate.toLocaleString(), finDate: finDate.toLocaleString() },
                                                                     {new: true})
            res.status(200).json(mensualidad)
        }catch(err){
            res.status(400).json(err.message)
        }
    }
}