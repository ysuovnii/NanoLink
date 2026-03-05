const auth = require('../service/auth.service.js')

function checkAuth(req, res, next) {
    try {
        const token = req.cookies.uid
    
        if (!token) {
            return res.redirect('/user/login')
        }
    
        const user = auth.getUser(token)
        req.user = user
        next()
    } 
    catch (error) {
        return res.redirect('/user/login')
    }
}

module.exports = { checkAuth }
