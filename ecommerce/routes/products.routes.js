

const express = require('express')
const { getProducts } = require('../controllers/products.controller')

const ProductRoutes = express.Router()

ProductRoutes.get('/', getProducts)


module.exports = ProductRoutes