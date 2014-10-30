var mongoose = require('mongoose');

mongoose.connect('mongodb://jobseekr:java4Matt@ds035260.mongolab.com:35260/jobseekr');

module.exports= mongoose.connection;