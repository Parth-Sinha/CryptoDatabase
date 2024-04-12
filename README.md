# CryptoDB

CryptoDB is a backend service deployed on Vercel that provides cryptocurrency-related data and functionality through API endpoints. It serves as a convenient tool for developers to access information and perform conversions between different cryptocurrencies.

## API Endpoints

### 1. `/convert`

This endpoint allows users to convert cryptocurrency values from one cryptocurrency to another based on a specified date.
Ref : https://api.coingecko.com/api/v3/coins/{id}/history

#### Request Format

```json
{
    "fromId": "bitcoin",
    "toId": "basic-attention-token",
    "date": "20-03-2024"
}
```

- `fromId`: The ID of the cryptocurrency you want to convert from.
- `toId`: The ID of the cryptocurrency you want to convert to.
- `date`: The date for which you want to perform the conversion.

### 2. `/companies`

This endpoint provides information about companies related to a specific cryptocurrency.
Ref : https://api.coingecko.com/api/v3/companies/public_treasury/{id} 

#### Request Format

```json
{
    "currency": "bitcoin"
}
```

- `currency`: The cryptocurrency for which you want to retrieve information about related companies. Only "bitcoin" and "ethereum" are supported.

## Testing

You can test the API endpoints using Postman or any other API testing tool. Simply send requests to the respective endpoints with the appropriate request format described above.

## Deployment

The backend service is deployed on Vercel and can be accessed at the following URL:
[https://crypto-database-rho.vercel.app/](https://crypto-database-rho.vercel.app/)

## Note

- Ensure that you provide valid input parameters according to the specified request formats.
- The service currently supports conversions and company information only for Bitcoin and Ethereum.
