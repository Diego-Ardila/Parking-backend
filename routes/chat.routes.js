const router = require('express').Router()
const chatController = require ('../controllers/chat.controller')


router.route('/').get(chatController.getChats)


module.exports = router