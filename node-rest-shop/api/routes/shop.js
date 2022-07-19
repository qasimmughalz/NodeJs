
const express = require('express')
const mongoose = require('mongoose')
const Order = require('../modals/OrderModel')
const Product = require('../modals/productModal')


const router = express.Router()


router.get('/', async (req, res, next) => {
    try {
        const result = await Order.find().select("product quantity").populate('product', 'name')
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({
            error: error
        })
    }
})


router.get('/:id', async (req, res, next) => {
    const { id } = req.params
    try {
        const result = await Order.findById(id)
        if (!result) {
            res.status(400).json({
                message: 'Cannot find the Id'
            })
        } else {
            res.status(200).json({
                message: 'Found the Order',
                result: result
            })
        }

    } catch (error) {
        res.status(500).json({
            message: 'Error ',
            error: error
        })
    }
})

router.post('/', async (req, res, next) => {

    const { productid, quantity } = req.body
    try {
        const checkAvailability = await Product.findById(productid)
        if (checkAvailability != null) {
            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                product: productid,
                quantity: quantity
            })
            order.save().then((result) => {
                res.status(201).json({
                    message: 'Post Order by random',
                    result: result
                })
            })
                .catch((error) => res.status(400).json(error))
        } else {
            res.status(400).json({
                message: 'Cannot find the Product ',
            })
        }
    }
    catch (error) {
        res.status(500).json({
            message: 'Error ',
            error: error
        })
    }
})



router.delete('/:id', async (req, res, next) => {
    const { id } = req.params
    try {
        const result = await Order.remove({_id:id})
        result.deletedCount > 0 ?
            res.status(200).json({ message: 'Deleted Record' }) :
            res.status(200).json({ message: 'Could Not Find Record' })

    } catch (error) {
        res.status(500).json({
            message: 'Error ',
            error: error
        })
    }
})


module.exports = router