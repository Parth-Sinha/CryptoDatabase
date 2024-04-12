const axios = require('axios');
const { Crypto } = require('./models/CryptoSchema');

// CoinGecko API endpoint to get list of cryptocurrencies
const coinGeckoURL = 'https://api.coingecko.com/api/v3/coins/list';

// Function to fetch cryptocurrency data from CoinGecko API and update MongoDB
async function updateCryptocurrencies() {
    try {
        // Fetch data from CoinGecko API
        const response = await axios.get(coinGeckoURL);
        const newCryptos = response.data.map(crypto => crypto.id);
        const newCryptosNames = response.data.map(crypto => crypto.name);
        // Fetch existing cryptocurrencies from MongoDB
        const existingCryptos = (await Crypto.find().select('crypto_id').lean()).map(crypto => crypto.crypto_id);

        // Check if arrays are equal
        if (arraysEqual(newCryptos, existingCryptos)) {
            return;
        }

        // Delete existing cryptocurrencies
        await Crypto.deleteMany({});

        // Insert new cryptocurrencies
        const crypto_data = newCryptos.map(crypto_id => ({
            crypto_id: crypto_id,
            crypto_name: newCryptosNames[newCryptos.indexOf(crypto_id)]
        }));
        await Crypto.insertMany(crypto_data);

    } catch (error) {
        console.error('Error updating cryptocurrencies:', error);
    }
}

// Function to check if two arrays are equal
function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

module.exports = { updateCryptocurrencies };
