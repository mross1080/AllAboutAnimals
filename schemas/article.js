
var mongoose = require('mongoose');

module.exports = mongoose.model("Article", {
    paragraph1    : String,
    paragraph2		: String,
    source    : String,
    imgsrc		: String,
    title			: String
});