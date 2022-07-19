const express = require('express')
const mongoose = require('mongoose')
const Product = require('../modals/productModal')
const multer = require('multer')
const Authenticate = require('../../Middleware/AuthCheck')


const storage = multer.diskStorage({
    destination : function( req, file, cb){
        cb(null, './uploads/')
    }, 
    filename: function(req, file , cb){
        cb(null, file.originalname)
    }
})
const upload = multer( {storage: storage})



const router = express.Router();

// ================== GET REQUESTS =======================

router.get('/', async (req, res, next) => {
    try {
        const result =  await Product.find()
            const response = {
                Total : result.length, 
                Products : result.map((data)=>{
                   return {
                name : data.name, 
                price: data.price, 
                id: data._id, 
                request : `http://localhost:3000/products/${data._id}`
                }
            }) 
            }
        res.status(200).json(response)
    }catch(error) {
        res.status(500).json({
            message: 'Could not find the Result',
            error: error
        })
    }


})


router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    console.log("Requested Id is : ", id)
    try {
        const result = await Product.findById(id)
        if (result != null) {
            return  res.status(200).json(result)
        } else {
            res.status(400).json({
                message: 'Could not find the Id',
                id: id
            })
        }
    } catch (error) {
        res.status(400).json({
            message: 'Could not find the Id',
            error: error
        })
    }
})

// ================== POST REQUESTS =======================

router.post('/',  upload.single('image') , async (req, res, next) => {
     
    try {
        const product = new Product({
            name: req.body.name,
            price: req.body.price
        })
        await product.save((err, data) => {
            if (err) {
                res.status(400).json({
                    error: 'Could not save'
                })
            } else {
                res.status(200).json({
                    message: 'Data Added Successfully',
                    product: product
                })
            }
        })
    } catch (e) {
        res.status(400).json({
            message: 'Could not Post',
            error: error
        })
    }

})

// ================== PUT REQUESTS =======================

router.patch('/:id', async (req, res, next) => {
    const {id} =  req.params;
    const {newName , newPrice} = req.body
    console.log("Params" , newName)
    console.log("Params" , newPrice)

   try {
        const updatedUser = await  Product.updateOne({ _id : id} , { name : newName , price: newPrice
         })

         updatedUser.acknowledged ?
         res.status(200).json({message:"Details modified successfully"}) :
         res.status(400).json({message:"Error Modifiying Details"})
         
        //  .exec().then((data)=> {
        //     res.status(200).json({
        //         message : 'Updated ', 
        //         data: data
        //     })
        //  }).catch(error => res.status(404).json({
        //     message : 'Not Updated ', 
        //     error: error
        // }))
        
   } catch (error) {
    res.status(400).json({
        message: 'Could not Patch',
        error: error
    })
   }
})


router.delete('/:id', Authenticate, async (req, res, next) => {
    const { id } = req.params
    try {
        const result = await Product.remove({ _id: id })
        result.deletedCount > 0 ?
        res.status(200).json({ message: 'Deleted '}) :
        res.status(200).json({ message: 'Cannot find requested Delete Query Id'})
    }catch (error) {
        res.status(500).json({
            message: 'Error! Could not Perform Operation.',
            error: error
        })
    }
})








module.exports = router