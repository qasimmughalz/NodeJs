const express = require('express')
const cors = require('cors')
const Worker = require('worker_threads')


const planetRouter = require('./routes/planet/planet.router')
const app = express()

app.use(cors({
    origin : 'http://localhost:3000'
}))


Worker.getEnvironmentData()


app.use(express.json())

app.use('/planets', planetRouter)




module.exports = app