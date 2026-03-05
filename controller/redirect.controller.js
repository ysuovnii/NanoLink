const urlSchema = require('../model/url.model.js')

async function redirectURL(req, res) {
    try {
        shortID = req.params.id; 

        const entry = await urlSchema.findOne({shortID}); 
    
        if(!entry) {
            return res.status(400).json({message : "Short URL not found"});
        }
    
        entry.visits++;
        await entry.save();
    
        res.redirect(entry.redirectURL);
    }
    catch (error) {
        console.error("Error:", err);
        return res.status(500).json({message : "Internal Server Error"});
    }

}

module.exports = {
    redirectURL
}