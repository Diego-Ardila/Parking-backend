const router = require('express').Router()
const adminController = require ('../controllers/admin.controller')


router.route('/').post(adminController.create)
router.route('/login').post(adminController.login)
router.route('/').get(adminController.validateAdmin)

module.exports = router