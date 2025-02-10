const _config = {
    PORT : process.env.PORT || 3000,
    MONGO_URL : process.env.MONGO_URL || "mongodb://127.0.0.1:27017/express-mongo",
    JWT_SECRET : process.env.JWT_SECRET || "huhuhaha",
}

const config = Object.freeze(_config);

module.exports = config;