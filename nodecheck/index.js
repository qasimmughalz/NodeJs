const express = require('express')
const path = require('path')

const FriendRoutes = require('./routes/friends.routes') 
const messageRoutes = require('./routes/message.routes')

const app = express();
const PORT = process.env.PORT || 3000


app.use(express.json())


app.use(express.static(  path.join(__dirname , 'public')))

app.use('/friends', FriendRoutes)
app.use('/message', messageRoutes)


app.listen(PORT, ()=> console.log("Running on port", PORT))