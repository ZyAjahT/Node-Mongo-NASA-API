var express = require('express');
var app = express();
var bodyParser = require("body-parser");
const axios = require('axios');
const path = require('path');
const mongoose = require('mongoose');
const nasaModel = require('./models/nasa.model');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ encoded: false }));

let apodInfo = {}; 

function formatRequest(reqTasks){
    if (typeof reqTasks === 'Boolean') {
        return [reqTasks];
    } else if (Array.isArray(reqTasks)) {
        return reqTasks;
    } else {
        console.warn(`Data type is not correct received type ${typeof req.body.task}. 'Please check inputs args: `, req.body.task);
    }
}

function fetchAPOD(date){
    axios.get(`https://api.nasa.gov/planetary/apod?api_key=L40qiQXxsSa63QgQ0wyRIFVGL2S7v2A2VqEmirkC${date ? '&date=' + date : ''}`)
    .then(function (response){
        apodInfo = response.data; 
    })
    .catch(function (error){
        console.log(error); 
    })
}

app.get('/', async function (req, res){
    fetchAPOD(); 
    res.render('index', {apodInfo: apodInfo}); 
})

app.get('/calendar', async function (req, res){ 
    fetchAPOD(date); 
    res.render('calendar',  {apodInfo: apodInfo});
})

app.get('/collection', async function (req, res){ 
    fetchAPOD(); 
    res.render('collection',  {apodInfo: apodInfo});
})


function formatRequest(reqTasks){
    if (typeof reqTasks === 'string') {
        return [reqTasks];
    } else if (Array.isArray(reqTasks)) {
        return reqTasks;
    } else {
        console.warn(`Data type is not correct received type ${typeof req.body.task}. 'Please check inputs args: `, req.body.task);
    }
}

app.post('/like', async function(req, res){
    let imgIds = formatRequest(req.body.data); 
    await nasaModel.find({'_id': {$in: imgIds}}).updateMany({liked: true})
    res.redirect('/'); 
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