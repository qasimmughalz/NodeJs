const express = require('express')
const app = express();

const PORT = process.env.PORT || 3000

const friends = [
    {
        id: 0,
        name: 'Qasim Mughal '
    },
    {
        id: 1,
        name: 'Faraz '
    },
    {
        id: 2,
        name: 'Goraya '
    }


]

app.get("/", (req, res) => {
    res.status(200).send("Yoooo")
})

app.get("/friends", (req, res) => {
    res.status(200).json(friends)
})

app.get("/friends/:id", (req, res) => {
    const id = req.params.id
    const friend = friends[id]
    if(friend){
        res.status(200).json(friend)
    }else{
        res.status(400).json({
            error: 'Not Found'
        })
    }
})


app.listen(PORT, ()=> console.log("Running on port", PORT))