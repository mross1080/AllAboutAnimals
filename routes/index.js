
/*
 * GET home page.
 */

var jobSchema = require('../schemas/job');
var valuesSchema = require('../schemas/values');
var mongoose = require('mongoose');


exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.articles = function(req, res){
	res.render('articles',{title: 'Articles'})
};



exports.applications= function(req, res){
	//console.log(jobSchema.find());
	console.log('hello');
	var jobs = mongoose.model('Job', jobSchema);

	// console.log(jobs.find({ position: /test/ }));
	// res.render('index', { title: 'Express' });
	// res.json({status: jobSchema.find()})

	jobs.find({ position: /test/ }).exec(function(err, applications){
		console.log(applications)
		if(err){
			console.log(err);
			res.status(500).json({status: 'failure'})
		} else{
			console.log(applications)
			res.render('applications',{
				title: 'Applications',
				applications: applications
			});
		}
	});
}