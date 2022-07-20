const express = require('express')
const messageController = require('../controllers/messages.controller')
const messageRoutes = express.Router()


messageRoutes.get('/', messageController.getMessage)





module.exports = messageRoutes
