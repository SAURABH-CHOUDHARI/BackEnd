const express = require('express');
const app = express();

const userRoutes = require('./routes/users.routes.js');
const postRoutes = require("./routes/posts.routes.js")
const cors = require('cors')

const corsOptions = {
    origin: 'http://localhost:5173', 
    methods: 'GET,POST,PUT,DELETE', 
    allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors(corsOptions)); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/v1/api/users', userRoutes);
app.use('/v1/api/posts', postRoutes);





module.exports = app