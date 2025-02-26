require("dotenv").config();


const _config = {
    PORT: process.env.PORT || 3000,
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/kodr-project',
    JWT_SECRET: process.env.JWT_SECRET || 'passcode',
    IMAGE_KIT_PUBLIC_KEY: process.env.IMAGE_KIT_PUBLIC_KEY  || "public_75O4AraYEGdqIQIpcf1XPLsOe+4=",
    IMAGE_KIT_PRIVATE_KEY: process.env.IMAGE_KIT_PRIVATE_KEY || "private_8QvgllQoyO45PsRhRdQxnuNV9IM=",
    IMAGEKIT_URL_ENDPOINT: process.env.IMAGE_KIT_URL_ENDPOINT || "https://ik.imagekit.io/j0r4zzhih/="
}

const config = Object.freeze(_config);

module.exports = config;