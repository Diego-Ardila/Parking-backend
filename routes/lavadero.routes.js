const router = require('express').Router()
const lavaderoController = require ('../controllers/lavadero.controller')
const { auth } = require('../utils/middlewares')


router.route('/').post(auth, lavaderoController.create)


module.exports = router