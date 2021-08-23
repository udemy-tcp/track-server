const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const { API_KEY } = require('../config/config')

module.exports = (req, res, next) => {
  const { authorization } = req.headers
  // authorization === 'Bearer aiosjdiajdojasd'

  if (!authorization) {
    return res.status(401).send({ error: 'You must be logged in.' })
  }

  const token = authorization.replace('Bearer ', '')
  jwt.verify(token, API_KEY, async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: 'You must be logged in.' })
    }

    const { userId } = payload

    const user = await User.findById(userId)
    req.user = user
    next()
  })
}
