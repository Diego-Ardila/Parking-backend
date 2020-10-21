const router = require('express').Router()
const userController = require ('../controllers/user.controller')
const { auth } = require('../utils/middlewares')


router.route('/').post(userController.createUser)
router.route('/login').post(userController.login)
router.route('/').get(auth, userController.getUser)


module.exports = router