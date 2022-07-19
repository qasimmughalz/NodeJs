const mongoose = require('mongoose')

const OrderModal = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: { type: mongoose.Schema.Types.ObjectId,  ref: 'Product' , require: true },
    quantity: { type: Number, default: 1 , require:true}
})


module.exports = mongoose.model('Order', OrderModal)