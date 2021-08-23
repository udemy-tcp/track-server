require('dotenv').config()

module.exports = {
  API_KEY: process.env.API_KEY,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  PORT: process.env.PORT || 3000
}