
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = express.Router()

const User = require('../modals/userModel')


router.get('/', async (req, res, next) => {
    const result = await User.find()
    res.status(200).json({
        TotalUser: result.length,
        Data: result.map((data) => {
            return {
                id: data._id,
                email: data.email,
                password: data.password
            }
        })
    })
})




router.post('/signup', async (req, res, next) => {

    await User.findOne({ email: req.body.email }).exec((err, data) => {
        if (data) {
            res.status(409).json({
                message: 'User Already Registered !'
            })
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    res.status(400).json({ error: err })
                } else {
                    const user = new User({
                        _id: mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    })

                    user.save().then((data) => {
                        res.status(200).json({
                            message: 'User Stored',
                            user: data
                        })
                    }).catch((error) => {
                        res.status(400).json({
                            message: 'Cannot Save',
                            error: error
                        })
                    })
                }
            })
        }
    })
})



router.post('/login', async (req, res, next)=>{
    const {email} = req.body
    try {
        await User.findOne({email : email}).exec((err, user)=>{
            if(err){
                res.status(400).json({
                    message: 'Cannot find the User', 
                    error : err
                })
            }else{
                console.log("User found ====", user)
                bcrypt.compare(req.body.password, user.password, (error, result)=>{
                    if(error){
                        res.status(400).json({
                            message: 'Auth Failed Error Bcrypt!', 
                            error : error
                        })
                    }
                    console.log("Resulting ", result)
                    if(result){
                        const token = jwt.sign({
                            email : user.email, 
                            id: user._id
                        }, 'secretKey', 
                        {
                            expiresIn : '1h'
                        }
                        )
                        res.status(200).json({
                            message: 'User Found', 
                            token : token
                        })
                    }else{
                        res.status(400).json({
                            message: 'Auth Failed !', 
                            error : error
                        })
                    }
                })
            }
        })
        
    } catch (error) {
        res.status(500).json({
            message: 'Server Error', 
            error: error
        })
    }
})



router.delete('/:id', async (req, res, next) => {
    const {id} = req.params;
    try {
        const result = await User.remove({ _id: id})
        result.deletedCount > 0 ?
        res.status(200).json({ message: 'Deleted User' }) :
        res.status(400).json({ message: 'Cannot Delete' })
        
    } catch (error) {
        res.status(500).json({
            message: 'Error! Could not Perform Operation.',
            error: error
        })
    }
 
})






module.exports = router