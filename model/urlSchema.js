const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    shortID : {
        type : String, 
        required : true, 
        unique : true,
    }, 

    redirectURL : {
        type : String, 
        required : true, 
    }, 

    userID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user', 
        required : true,
    },

    visits : {
        type : Number,
        default : 0,
    }
})

const URL = mongoose.model('url', urlSchema)

module.exports = URL