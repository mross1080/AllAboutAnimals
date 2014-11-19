
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

exports.guesstheanimal = function(req, res){
	res.render('guesstheanimal',{title: 'Guess the Animal!!'})
};

exports.guesstheanimalsubmit = function(req, res){
	var result;
	count =0;
	console.log(req.body.answer1);
	if(req.body.answer1 == 'Duck'){
		count++;
	}
	if(req.body.answer2 == 'Horse'){
		count++;
	}

console.log(count);
	if(count == 2){
		result = "Incredible";
	} else if(count == 1){
		result = "Great";
	} else{
		result= "You gave it a good try, but try reading some of these articles and then try again!"
	}

	console.log(req.body);
	res.render('guesstheanimalresults',{results: result})
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