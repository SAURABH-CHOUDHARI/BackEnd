require('dotenv').config();
const express = require('express');
const app = require('./src/app');
const config = require('./src/config/config');

const server = express();

// Mount the app
server.use(app);

const PORT = config.PORT;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});