var mongoose = require('mongoose');

var Schema   = mongoose.Schema;
 
var Article = new Schema({
    content    : String,
    source    : String,
});
 
module.exports = mongoose.model( 'Article', Article );