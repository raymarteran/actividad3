require('dotenv').config();

module.exports = {
    secretKey: 'your-secret-key',
    mongoURI: process.env.MONGODB_URI
}