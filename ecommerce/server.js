const express = require('express')
const ProductRoutes = require('./routes/products.routes')

const app = express()
const PORT = process.env.PORT || 3000


app.use(express.json())
app.use('/products', ProductRoutes)




app.listen(PORT, ()=> console.log(`Listening to Port ${PORT}`))