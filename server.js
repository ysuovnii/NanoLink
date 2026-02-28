const path = require('path')

//express
const express = require('express')
const server = express()

//env variables
require('dotenv').config()
const PORT = process.env.PORT || 3000
const MONGO_URL = process.env.MONGO_URL

//parsing
const cookieParser = require('cookie-parser')
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());

//db
const dbConnection = require('./controller/connection')
dbConnection.connectDB(MONGO_URL)

//models
const URL = require('./model/urlSchema')
const { checkAuth } = require('./middleware/authMiddleware')

//static

//SSR
server.use(express.static(path.join(__dirname, 'public')));
server.set('view engine', 'ejs');
server.set('vihttps://github.com/ysuovnii/URL-Shortenerews', path.join(__dirname, 'views'));

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
const urlRoute = require('./routes/urlRoute')
const redirect = require('./controller/Redirect');

server.use('/url', checkAuth, urlRoute)
server.get('/:id', redirect.redirectURL)

const userRoute = require('./routes/userRoute')

server.use('/user', userRoute)

server.get('/logout', (req, res) => {
    res.clearCookie('uid');
    res.redirect('/user/login');
});

//entry 
server.listen(PORT, () => {
    console.log(`Server is starting at PORT : ${PORT}`)
})