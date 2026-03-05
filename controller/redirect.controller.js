const urlSchema = require('../model/url.model.js')

async function redirectURL(req, res) {
    shortID = req.params.id 

    const entry = await urlSchema.findOne({shortID}) 

    if(!entry) {
        return res.status(400).json({"error" : "Short URL not found"})
    }

    entry.visits++
    await entry.save()

    res.redirect(entry.redirectURL)
}

module.exports = {
    redirectURL
}