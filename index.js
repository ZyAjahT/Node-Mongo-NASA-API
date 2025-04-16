var express = require('express');
var app = express();
var bodyParser = require("body-parser");
const path = require('path');
const mongoose = require('mongoose');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ encoded: false }));

app.get('/', async function (req, res){
    res.render('index');    
})

const uri = "mongodb+srv://zyajah:sMG840JXRNqIE0oE@cluster0.gdwizlf.mongodb.net/?appName=Cluster0";
mongoose.connect(
    uri,
    { serverApi: { version: '1', strict: true, deprecationErrors: true } }
).then((result) => {
    console.log('Connected to MongoDB');
    // console.log(result);
    app.listen(3000, function () {
        console.log('Our app is running on port 3000');
    })
}).catch((err) => {
    console.log(err);
})