var mongoose = require('mongoose');

// module.exports = mongoose.model("Quiz", {
//     question   : String ,
//     answer1   	 :   String,
//     answer2   	 :   String,
//     Image    	 :  String
// });


module.exports = mongoose.model("Quiz", {
    question   : [],
    answers		 : [],
    title			 : String
});
