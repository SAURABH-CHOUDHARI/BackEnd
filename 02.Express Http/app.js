const express = require('express');
const app = express();

app.set("view engine",'ejs')


app.use((req,res,next) => {
    console.log("This Is Middleware")
    return next();
})

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(express.static("public"))

app.get('/',(req,res,next) =>{
    console.log("index");
    return next();
}, (req,res) => {
    res.render('index');
})
app.get('/form', (req,res) => {
    res.render('register')
})
app.post('/getData',(req ,res) => {
    console.log(req.body)
    res.send('data Received')
})

app.listen(3000);