const urlSchema = require('../model/urlSchema');
const validator = require('validator');
const { nanoid } = require('nanoid');

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

async function generateURL(req, res) {
    try {
        const { url } = req.body;
        const userID = req.user._id;

        if (!url) {
            const allUrls = await urlSchema.find({userID: userID}).sort({ _id: -1 });
            return res.render('index', { error: "URL is required", urls: allUrls, user: req.user });
        } 

        const normalizedUrl = url.startsWith('http') ? url : `http://${url}`;

        if (!validator.isURL(normalizedUrl)) {
            const allUrls = await urlSchema.find({userID: userID}).sort({ _id: -1 });
            return res.render('index', { error: "Invalid URL", urls: allUrls, user: req.user });
        } 

        const id = nanoid(8);

        await urlSchema.create({ shortID: id, redirectURL: normalizedUrl, userID: userID });

        const shortUrl = `${BASE_URL}/${id}`; 

        return res.render('result', { shortUrl, originalUrl: normalizedUrl });
    } catch (err) {
        console.error("Error:", err);
        const allUrls = await urlSchema.find({userID: req.user._id}).sort({ _id: -1 });
        return res.render('index', { error: "Something went wrong", urls: allUrls, user: req.user });
    }
}

module.exports = { generateURL };
