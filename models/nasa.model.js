const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const nasaSchema = new Schema({
});

module.exports = mongoose.model('nasaModel', nasaSchema); 