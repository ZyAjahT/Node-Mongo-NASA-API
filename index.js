var express = require('express');
var app = express();
var bodyParser = require("body-parser");
const axios = require('axios');
const path = require('path');
const mongoose = require('mongoose');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ encoded: false }));

let apodInfo = {}; 

function fetchAPOD(){
    axios.get('https://api.nasa.gov/planetary/apod?api_key=L40qiQXxsSa63QgQ0wyRIFVGL2S7v2A2VqEmirkC')
    .then(function (response){
        apodInfo = response.data; 
    })
    .catch(function (error){
        //handle error 
        console.log(error); 
    })
}

app.get('/', async function (req, res){
    fetchAPOD(); 
    res.render('index', {apodInfo: apodInfo}); 
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