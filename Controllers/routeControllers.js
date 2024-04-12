const axios = require('axios')

const priceConvert = async (req, res)=>{
    const {fromId, toId, date} = req.body;
    if(!date){
        return res.send({error: "Date is required"})
    }
    if(!fromId || !toId){
        return res.send({error: "Both From and To Cryptocurrency ID is required"})
    }
    const fromResponse = await axios.get(`https://api.coingecko.com/api/v3/coins/${fromId}/history?date=${date}`)
    const toResponse = await axios.get(`https://api.coingecko.com/api/v3/coins/${toId}/history?date=${date}`)
    if(!fromResponse.data.market_data || !toResponse.data.market_data){
        return res.send({error: "Invalid cryptocurrency ID / Date format"})
    }
    const fromprice_btc = fromResponse.data.market_data.current_price.btc;
    const toprice_btc = toResponse.data.market_data.current_price.btc;
    const convertedPrice = fromprice_btc/toprice_btc;
    res.send({convertedPrice})
}

const fetchCompaniesData = async (req, res)=>{
    const {currency} = req.body;
    if(currency!= "bitcoin" || currency!= "ethereum"){
        return res.send({error: "Currency is required and can only have two values (bitcoin or ethereum)"})
    }
    const companies = await axios.get(`https://api.coingecko.com/api/v3/companies/public_treasury/${currency}`)
    res.send(companies.data.companies)
}

module.exports = { priceConvert, fetchCompaniesData };