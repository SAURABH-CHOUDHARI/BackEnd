const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {

    const formatedDate = [
        {
            name: "indigo",
        },
        {
            name: "high"
        },
        {
            name: "sushi",
        },
        {
            name: "autumn"
        }
    ]

    res.render('index', {
        date: formatedDate
    })
})

app.get('*', (req, res) => {
    res.render('not-found');
})

app.listen(3000, () => {
    console.log("server is running on port 3000")
})