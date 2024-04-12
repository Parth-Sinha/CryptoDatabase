const mongoose = require('mongoose')

const CryptoSchema = new mongoose.Schema({
    crypto_id:{
        type: String,
        required: true,
        unique: true
    },
    crypto_name: {
        type: String,
        required: true,
    },
}, 
{timestamps: true}
)

const Crypto = new mongoose.model('crypto', CryptoSchema)
module.exports = {Crypto}