const express = require('express')
const route = express.Router() 
const generate = require('../controller/generateurl.controller')

route.post('/', generate.generateURL)

module.exports = route