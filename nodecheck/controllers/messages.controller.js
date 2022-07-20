const express = require('express')
const path = require('path')



function getMessage(req, res){
  
  res.sendFile(path.join(__dirname, '..', 'public', 'girl.jpg'))
}

module.exports = {
    getMessage
}