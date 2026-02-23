const jwt = require('jsonwebtoken')
require('dotenv').config()
const KEY = process.env.JWT_KEY

// this will create tokens
function setUser(user) {
    const payload = {
        ...user 
    }
    return jwt.sign(payload, KEY)
}

function getUser(id) {
    return sessionId(id)
}

module.exports = {
    setUser, 
    getUser
}