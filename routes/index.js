
/*
 * GET home page.
 */
//  var mongoose = require('mongoose');

// mongoose.connect('mongodb://jobseekr:java4Matt@ds035260.mongolab.com:35260/jobseekr',function(error){
// 	if(error){
// 		console.log(error);
// 	} else{
// 		console.log("Database Connected");
// 	}
// });

var db = require('../db');
 var mongoose = require('mongoose');
var articleSchema = require('../schemas/article');
var Article     = mongoose.model( 'Article' );
var jobSchema = require('../schemas/job');
var valuesSchema = require('../schemas/values');


exports.test= function(req, res){
	console.log(req.params);
	res.render('index', { title: 'All About Animals' });
}

exports.articleform = function(req, res){
	res.render('articleform');
}

exports.elephants = function(req, res){
  res.render('elephants', { title: 'Elephants' });
};

exports.helpfulsites = function(req, res){
  res.render('helpfulsites', { title: 'Other Helpful Sites' });
};

exports.quiz1 = function(req, res){
  res.render('quiz1', { title: 'Quiz 1' });
};

exports.turtles = function(req, res){
  res.render('turtles', { title: 'Turtles' });
};

exports.lions = function(req, res){
  res.render('lions', { title: 'Lions' });
};

exports.polarbears = function(req, res){
  res.render('polarbears', { title: 'Polar Bears' });
};

exports.index = function(req, res){
  res.render('index', { title: 'All About Animals' });
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

exports.article = function(req, res){
	var name = req.params.name;
	Article.find({ title: name}, function (err, docs) {
		console.log(docs);
		var current = docs[0];
            console.log("Current object is " + current);
            // console.log("Current title is " + current.title)
          res.render( 'article' , {article: current} );


        });
}

exports.create = function ( req, res ){
	console.log("creating new article");
  new Article({
    paragraph1    : "Clearly recognized by its white head, brown body, and hooked yellow beak, the bald eagle has been the national emblem of the United States of America since 1782.  With a 2 m (7 ft.) wing span, a weight of 3-7 kg (7-15 lb.), and an overall size of 71-96 cm (28-38 in.), the bald eagle is one of the largest raptors in the world.  Living near a constant source of water, bald eagles feast on fish, ducks, snakes and turtles. They will also eat rabbits, muskrats, and dead animals. Utilizing their acute sense of sight and powerful talons, bald eagles attack their prey by swooping down on them at an angle. They can reach speeds of up to 160 km/hr (100 mph) when diving. Once they capture their prey, they use their hooked beak to pull flesh out before eating it.",
    paragraph2		: "Bald eagle soaringBald eagles can reach great heights when flying. Using thermal convention currents, they can climb to up to 3000 m (10,000 ft.) in the air. They can soar for hours using these currents. When cruising, they can fly about 65 km/hr (40 mph). ",
    source : "http://www.animalfactguide.com/animal-facts/bald-eagle/",
    title: "Eagles",
    imgsrc: "https://s3-eu-west-1.amazonaws.com/allaboutanimals/images/turtle.jpg"
  }).save( function( err, article, count ){
  	console.log(article);
    res.redirect( '/');
  });
};

exports.createarticle = function ( req, res ){
	console.log("creating new article");
	console.log(req);
  new Article({
  	paragraph1: req.body.paragraph1,
  	paragraph2: req.body.paragraph2,
    source : req.body.source,
    title: req.body.title,
    imgsrc: req.body.imgsrc
  }).save( function( err, article, count ){
  	console.log(article);
  	console.log("Article created");
    res.redirect( '/');
  });
};

exports.list = function(req, res){
	Article.find({}, function(err,docs){
		res.json(docs);
	})
}


}