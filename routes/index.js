
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

var quizSchema = require('../schemas/quiz')
var Quiz = mongoose.model('Quiz');

var reviewSchema = require('../schemas/review')
var Review = mongoose.model('Review');


exports.admin= function(req, res){
	res.render('admin');
}

exports.reviewform= function(req, res){
	res.render('reviewform');
}

exports.allreviews= function(req,res){

	Review.find({}, function (err, docs) {
		console.log(docs);

          res.render( 'allreviews' , {reviews: docs} );

        });


}

exports.createreview = function(req, res){
console.log(req.body);
	new Review({
  	Content: req.body.Content,
  	Author: req.body.Author,
  	Title: req.body.Title

  }).save( function( err, quiz, count ){
  	console.log(quiz);
  	console.log("Quiz created");
    res.redirect( '/allreviews');
  });
}

exports.quizform = function(req, res){
	res.render('quizform');
}

exports.quizlist = function(req, res){
	res.render('quizlist');
}

exports.createquiz = function(req,res){
	console.log(req.body)
	var questions = [];
	var answers = [];
	questions.push(req.body.Question1);
	questions.push(req.body.Question2);
	questions.push(req.body.Question3);
	questions.push(req.body.Question4);
	answers.push(req.body.answer1);
	answers.push(req.body.answer2);
	answers.push(req.body.answer3);
	answers.push(req.body.answer4);

	console.log(answers);
new Quiz({
  	question: questions,
  	answers: answers,
  	title: req.body.title

  }).save( function( err, quiz, count ){
  	console.log(quiz);
  	console.log("Quiz created");
    res.redirect( '/');
  });

}

exports.contactus= function(req, res){
	res.render('contactus');
}
exports.articleform = function(req, res){
	res.render('articleform');
}

exports.helpfulsites = function(req, res){
  res.render('helpfulsites', { title: 'Other Helpful Sites' });
};

exports.quiz1 = function(req, res){
  res.render('quiz1', { title: 'Quiz 1' });
};

exports.sitemap = function(req, res){
	res.render('sitemap');
}

exports.index = function(req, res){
  res.render('index', { title: 'All About Animals' });
};

exports.articles = function(req, res){
	res.render('articles',{title: 'Articles'})
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

exports.quiz = function(req, res){
	var name = req.params.name;
	console.log(name);
	Quiz.find({ title: name}, function (err, docs) {
		console.log(docs);
		var current = docs[0];
            console.log("Current object is " + current);
            console.log(current.question)
            // console.log("Current title is " + current.title)
          res.render( 'Quiz' , {questions: current} );


        });
}

exports.gradequiz = function(req, res){
	console.log(req.body);
	var correctAnswers = req.body.answers.split(",")
	var choices =[];
	var correctAnswersCount= 0;
	var message ="Try again";

	console.log(req.body);
	choices.push(req.body.answer0);
	choices.push(req.body.answer1);
	choices.push(req.body.answer2);
	choices.push(req.body.answer3);

	for(var x=0; x < correctAnswers.length; x++ ){
		if(choices[x] == correctAnswers[x]){
			correctAnswersCount++;
		}
	}

	console.log("Number of correctAnswers" + correctAnswersCount);

	res.render( 'quizresults', {count: correctAnswersCount});
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

exports.mission = function(req, res){
	res.render("mission");
}

exports.searchpage= function(req, res){
	res.render("search");
}

exports.search= function(req, res){

	var results = [];
	var query = req.body.Query

		Article.find({}, function(err,docs){
						console.log(docs);
		for(var x=0; x < docs.length; x++){
				console.log("current object is " + docs[x]) 
					if(docs[x].title== query || mentioned(docs[x].paragraph1,query)){
						results.push(docs[x].title);
					}
			}
		res.render("searchresults", {results:results});
	})
	console.log(req.body);
}


exports.list = function(req, res){
	Quiz.find({}, function(err,docs){
		res.json(docs);
	})
}

exports.update = function(req, res){
	Quiz.update({_id: "546e4ac1e571f2922e2eb9fc"}, {$set: {title: "Quiz1"}})
	console.log("collection updated");
}

exports.drop = function(req, res){
	Review.remove({}, function(err,docs){
		console.log("Quizzes Dropped")
	})
}

function mentioned(paragraph, str){
	var current = paragraph.split(" ");
	console.log(current);
	for(var x=0; x < current.length; x++){
		if(current[x] == str){
			return true;
		}
	}
	return false;
}

