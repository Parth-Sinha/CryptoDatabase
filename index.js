const express = require('express')
const dotenv = require('dotenv')
const {connectDB} = require('./DB/connection')

const app = express()

require('dotenv').config()
app.use(express.urlencoded({extended: false}))
app.use(express.json())
// Connect to MongoDB

connectDB(process.env.URI).then(()=>{
    console.log("connected to DB...")
    app.listen(process.env.PORT, ()=>console.log(`Server started on PORT: ${process.env.PORT}`))
})

app.get('/', (req, res)=>{
    res.send("welcome to the server !");
})

// Pass : asdfghjkl1234