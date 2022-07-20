
const friends = require('../models/friends.model')
//// wruting it pure function so we can debug it in the debugger 

function getAllFriends(req, res) {
    res.status(200).json(friends)
}


function getOneFriend(req, res){
    const id = req.params.id
    const friend = friends[id]
    if(friend){
        res.status(200).json(friend)
    }else{
        res.status(400).json({
            error: 'Not Found'
        })
 }
}

function AddNewFriend(req,res){
    const name = req.body.name;
    console.log("entered name is ", name)
    if(!name){
        return res.status(400).json({
            error: 'No Name Added to Save'
        })
    }
    const newFriend = {
        name: name, 
        id: friends.length
    }

    friends.push(newFriend)
    res.status(200).json({
        message: "record added successfully"
    })

}


module.exports = {
    getAllFriends, 
    getOneFriend, 
    AddNewFriend
}