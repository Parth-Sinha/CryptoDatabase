const express = require('express')
const {connectDB} = require('./DB/connection')
const cron = require('node-cron')
const app = express()
const {updateCryptocurrencies} = require('./update_crypto')
const routes = require('./Controllers/routeControllers')

require('dotenv').config()
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// Connect to MongoDB
connectDB(process.env.URI).then(()=>{
    console.log("connected to DB...")
    // Initial update
    updateCryptocurrencies();
    // Schedule the job to run every hour
    cron.schedule('0 * * * *', async () => {
        console.log('Updating cryptocurrency data...');
        await updateCryptocurrencies();
    });
    app.listen(process.env.PORT, ()=>console.log(`Server started on PORT: ${process.env.PORT}`))
})


app.get('/', async (req, res)=>{
    res.send("welcome to the server !");
})
app.get('/convert', routes.priceConvert)
app.get('/companies',routes.fetchCompaniesData)

// Pass : asdfghjkl1234