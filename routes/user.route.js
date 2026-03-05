const express = require('express')
const ctrl = require('../controller/user.controller.js')

const router = express.Router()


router.get('/signup', ctrl.showSignup)
router.post('/signup', ctrl.handleSignup)
router.get('/login', ctrl.showLogin)
router.post('/login', ctrl.handleLogin)

module.exports = router 