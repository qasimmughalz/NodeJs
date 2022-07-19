
const express = require('express')
const app = express();
const morgan = require('morgan')
const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/shop')
const userRoutes = require('./api/routes/user')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


mongoose.connect('mongodb+srv://admin:' + process.env.MONGO_ATLAS_PW + '@cluster0.gaick.mongodb.net/?retryWrites=true&w=majority',
   ).then(()=> console.log("Connected")).catch((err)=> console.log("Error in Conecting ", err))


app.use((req, res, next) => {
    req.header("Access-Control-Allow-Origin", "*");
    req.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.header === 'OPTIONS') {
        req.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, PATCH , GET')
        return res.send(200).json({})
    }
    next()
})




app.use('/products', productRoutes)
app.use('/order', orderRoutes)
app.use('/user', userRoutes)



app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 5000);
    res.json({
        message: error.message
    })

})


module.exports = app