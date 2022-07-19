const jwt = require('jsonwebtoken')

module.exports = (req, res, next)=>{

    try {
        const decode = jwt.verify(req.body.token , 'secretKey')
        req.userData = decode
        next()
    } catch (error) {
        res.status(400).json({
            message: 'Auth Failed Middleware'
        })
    }
}