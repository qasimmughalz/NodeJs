
const products = require('../models/products.model')

function getProducts(req, res){
    res.status(200).json(products)
}





module.exports = {
    getProducts
}