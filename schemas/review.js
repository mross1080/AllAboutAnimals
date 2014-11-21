
var mongoose = require('mongoose');

module.exports = mongoose.model("Review", {
    Author    : String,
    Content		: String,
    Title			: String
});