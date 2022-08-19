const express = require('express')
const bodyparser = require('body-parser')
const db = require('./queries')

const app = express()

const port = 420

app.use(bodyparser.json())

app.use(bodyparser.urlencoded({extended:true,}))

app.get("/", (req,res) => {
    res.send("ps : I am not a fan of SQL databases")
})

app.get('/users', db.getUser)
app.get('/users/:id', db.getUserByid)
app.post('/users', db.addUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

app.listen(port, ()=> {
    console.log(`server up and running on http://localhost:${port}`)
})