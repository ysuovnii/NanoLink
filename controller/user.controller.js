const User = require('../model/user.model.js');
const auth = require('../service/auth.service.js');
const bcrypt = require('bcrypt');
const Url = require('../model/url.model.js');

function showSignup(req, res) {
    return res.render('signup', { error: null });
}

function showLogin(req, res) {
    return res.render('login', { error: null });
}

async function handleLogin(req, res) {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
    
        if(!user) {
            return res.render('login', {error : "Invalid Credentials"});
        }

        const passwordVerification = await bcrypt.compare(password, User.password);

        if(!passwordVerification) {
            return res.render('login', {error : "Invalid Credentials"});
        }
    
        const token = auth.setUser({
            _id: user._id,
            email: user.email, 
            name: user.name
        });

        res.cookie('uid', token);

        const urls = await Url.find({userID: user._id}).sort({_id: -1})
        
        return res.render('index', {error: null, urls: urls, user: user});
    }
    catch (error) {
        console.log(`error : ${error.message}`);
        res.status(500).json({message : "Internal Server Error"});
    }
}

async function handleSignup(req, res) {
    try {
        const {name, email, password} = req.body;

        if(!name || !email || !password) {
            return res.status(400).json({message : "All fields are required"});
        }
        if(password.length < 6) {
            return res.status(400).json({message : "Password must be atleast 6 characters long"});
        }

        const user = await User.findOne({email});

        if(user) {
            return res.status(400).json({message : "User with this email already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
    
        const newUser = await user.create({
            name,
            email,
            password : hashPassword, 
        });


        // for now user will be redirected to home page
        const token = auth.setUser({_id: newUser._id, email: newUser.email, name: newUser.name});
        res.cookie('uid', token);
        return res.render('index', {error : null, urls: [], user: newUser});
    }
    catch (error) {
        console.log(`error : ${error.message}`);
        res.status(500).json({message : "Internal Server Error"});
    }
}

module.exports = {showSignup, showLogin, handleSignup, handleLogin}