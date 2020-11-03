const router = require('express').Router()
const mensualidadesController = require ('../controllers/mensualidades.controller')
const { auth } = require('../utils/middlewares')


router.route('/').post(auth, mensualidadesController.create)
/* router.route('/').get(auth, mensualidadesController.get) */
router.route('/').put(auth, mensualidadesController.update)
router.route('/paid').put(auth, mensualidadesController.paid)

module.exports = router