const express = require('express')
const friendsController = require('../controllers/friends.controller')

const friendsRouter = express.Router()


friendsRouter.get("/", friendsController.getAllFriends)
friendsRouter.get("/:id", friendsController.getOneFriend)

friendsRouter.post('/', friendsController.AddNewFriend )


module.exports = friendsRouter