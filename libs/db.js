const mongoose = require('mongoose')

async function connectDB(mongoURL) {
    try {
        await mongoose.connect(mongoURL)
        console.log("Connected to database!!")
    }
    catch(err){
        console.log("Error: ", err.message)
        process.exit(1)
    }
}

module.exports = {
    connectDB
}