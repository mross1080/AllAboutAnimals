var mongoose = require('mongoose');

mongoose.connect('mongodb://jobseekr:java4Matt@ds035260.mongolab.com:35260/jobseekr',function(error){
	if(error){
		console.log(error);
	} else{
		console.log("Database Connected");
	}
});

module.exports= mongoose.connection;
