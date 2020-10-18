const router = require('express').Router()
const userController = require ('../controllers/user.controller')


router.route('/').post(userController.createUser)
router.route('/login').post(userController.login)

module.exports = router