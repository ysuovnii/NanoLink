const user = require('../model/userSchema')
const auth = require('../service/auth')

function showSignup(req, res) {
    return res.render('signup', { error: null })
}

function showLogin(req, res) {
    return res.render('login', { error: null })
}

async function handleLogin(req, res) {
    const {email, password} = req.body
    const fuser = await user.findOne({email, password})

    if(!fuser) {
        return res.render('login', {error : "Invalid email or password"})
    }

    const token = auth.setUser(fuser)
    res.cookie('uid', token)
    return res.render('index', {error : null})
}

async function handleSignup(req, res) {

    const {name, email, password} = req.body

    await user.create({
        name, email, password
    })

    return res.render('index', {error : null})
}

module.exports = {showSignup, showLogin, handleSignup, handleLogin}