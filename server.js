const path = require('path')
const express = require('express')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const {connectDB} = require('./libs/db.js')
const URL = require('./model/url.model.js')
const { checkAuth } = require('./middleware/auth.middleware.js')
const urlRoute = require('./routes/url.route.js')
const userRoute = require('./routes/user.route.js')
const {redirectURL} = require('./controller/redirect.controller.js');

const server = express()

//env variables
const PORT = process.env.PORT || 3000
const MONGO_URL = process.env.MONGO_URL

//parsing
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());

//SSR
server.use(express.static(path.join(__dirname, 'public')));
server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, 'views'));

server.get('/logout', (req, res) => {
    res.clearCookie('uid');
    res.redirect('/user/login');
});

server.get('/', checkAuth, async (req, res) => {
    try {
        const allUrls = await URL.find({ userID: req.user._id }).sort({ _id: -1 });
        res.render('index', { error: null, urls: allUrls, user: req.user });
    } catch (err) {
        console.error("Error fetching URLs:", err);
        res.render('index', { error: null, urls: [], user: req.user });
    }
});


//routes
server.use('/url', checkAuth, urlRoute)
server.get('/:id', redirectURL)
server.use('/user', userRoute)

//entry 
server.listen(PORT, () => {
    console.log(`Server is starting at PORT : ${PORT}`);
    connectDB(MONGO_URL);
})