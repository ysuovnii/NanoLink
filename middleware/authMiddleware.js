const auth = require('../service/auth')

function checkAuth(req, res, next) {
    const token = req.cookies.uid
    
    if (!token) {
        return res.redirect('/user/login')
    }
    
    try {
        const user = auth.getUser(token)
        req.user = user
        next()
    } catch (err) {
        return res.redirect('/user/login')
    }
}

module.exports = { checkAuth }
