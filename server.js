const path = require('path')

//express
const express = require('express')
const server = express() 

//env variables
require('dotenv').config()
const PORT = process.env.PORT || 3000
const MONGO_URL = process.env.MONGO_URL

//parsing
server.use(express.json());        
server.use(express.urlencoded({ extended: true })); 

//db
const dbConnection = require('./controller/connection')
dbConnection.connectDB(MONGO_URL)

//static

//SSR
server.use(express.static(path.join(__dirname, 'public')));
server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, 'views'));

server.get('/', (req, res) => res.render('index', { error: null }));


//routes
const urlRoute = require('./routes/urlRoute')
const redirect = require('./controller/Redirect');
server.use('/url', urlRoute)
server.get('/:id', redirect.redirectURL) 

const userRoute = require('./routes/userRoute')

server.use('/user', userRoute)


//entry 
server.listen(PORT, () => {
    console.log(`Server is starting at PORT : ${PORT}`)
})