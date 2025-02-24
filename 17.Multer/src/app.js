const express = require("express")
const app = express();
const upload = require('./utils/multer')

app.use(express.static('public'))


app.get("/", (req, res) => {
    res.send('hello')
})

app.post('/upload', upload.single('file'), (req, res) => {
    res.send('file Uploaded!')
})


module.exports = app;