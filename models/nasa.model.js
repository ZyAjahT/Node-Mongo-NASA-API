const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const nasaSchema = new Schema({
    saved: Boolean,
    liked: Boolean, 
    deleted: Boolean
});

module.exports = mongoose.model('nasaModel', nasaSchema); 