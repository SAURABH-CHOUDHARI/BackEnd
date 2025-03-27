require('dotenv').config();

const _config = {
    PORT: process.env.PORT || 3000,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    JWT_SECRET: process.env.JWT_SECRET
};

// Freeze the configuration object to prevent modifications
const config = Object.freeze(_config);

module.exports = config;