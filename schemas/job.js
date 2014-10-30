var mongoose = require('mongoose');

module.exports = mongoose.model("Job",{
	company: String,
	position: String,
	applicationURL: String,
	deadline: String,
	imgURL: String,
	notes: String
});