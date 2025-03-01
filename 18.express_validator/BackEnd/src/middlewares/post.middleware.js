const multer = require('multer');
const rateLimit = require("express-rate-limit");
const { Readable } = require("stream");
const mongoose = require('mongoose');
const imageKit = require("../services/images.cdn");


const apiFeedLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    message: { error: "Too many requests, please try again later." },
    headers: true, 
});

module.exports.apifeedlimit = apiFeedLimiter;

const upload = multer({ storage: multer.memoryStorage() });

module.exports.handlestreamimage = (req, res, next) => {
    upload.single('image')(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: "Error uploading image" });
        }
        next();
    });
};

module.exports.imagekitUpload = async (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ error: "Upload image is not present" });
    }

    try {
        
        const file = await imageKit.upload({
            file:  Readable.from(req.file.buffer),
            fileName: new mongoose.Types.ObjectId().toString(),
            isPublished: true,
            isPrivateFile: false,
            folder: "/instagram",
        });

        req.body.image = file; 
        next();
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
