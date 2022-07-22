const express = require('express')
const cors = require('cors')
const planetRouter = require('./routes/planet/planet.router')
const app = express()

app.use(cors({
    origin : 'http://localhost:3000'
}))


app.use(express.json())

app.use('/planets', planetRouter)




module.exports = app