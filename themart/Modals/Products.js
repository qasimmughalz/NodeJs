const mongoose = require('mongoose')


const Product = new mongoose.createSchem({
    _id : mongoose.Schema.Types.ObjectId,
    name: {
        type:String, 
        require
    }
})