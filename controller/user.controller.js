const user = require('../model/user.model.js')
const auth = require('../service/auth.service.js')

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

    const token = auth.setUser({_id: fuser._id, email: fuser.email, name: fuser.name})
    res.cookie('uid', token)
    const urls = await require('../model/url.model').find({userID: fuser._id}).sort({_id: -1})
    return res.render('index', {error: null, urls: urls, user: fuser})
}

async function handleSignup(req, res) {

    const {name, email, password} = req.body

    const newUser = await user.create({
        name, email, password
    })

    const token = auth.setUser({_id: newUser._id, email: newUser.email, name: newUser.name})
    res.cookie('uid', token)
    return res.render('index', {error : null, urls: [], user: newUser})
}

module.exports = {showSignup, showLogin, handleSignup, handleLogin}